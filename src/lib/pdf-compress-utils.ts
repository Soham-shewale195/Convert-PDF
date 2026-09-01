import { PDFRawStream, PDFName, PDFNumber, PDFRef, PDFDict, PDFContext } from "pdf-lib";
import { loadPdf } from "@/lib/pdf-load";

export type CompressionPreset = "low" | "medium" | "high";

export interface CompressionResult {
  bytes: Uint8Array;
  originalSize: number;
  compressedSize: number;
  recompressedImageCount: number;
  skippedImageCount: number;
}

/**
 * Safari detection helper to identify browsers where canvas.toBlob quality control
 * might behave differently.
 */
export function isSafariBrowser(): boolean {
  if (typeof window === "undefined" || !navigator?.userAgent) return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

/**
 * Converts a Canvas element into a JPEG Uint8Array blob with specified quality.
 */
function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) return resolve(null);
        try {
          const buf = await blob.arrayBuffer();
          resolve(new Uint8Array(buf));
        } catch {
          resolve(null);
        }
      },
      "image/jpeg",
      quality,
    );
  });
}

/** A decoded image ready to be painted onto a canvas at its native size. */
interface DecodedImage {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

/**
 * Helper to decode a JPEG or raster Blob into canvas dimensions and a draw function.
 */
async function decodeImageBlob(blob: Blob): Promise<DecodedImage | null> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob);
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw: (ctx: CanvasRenderingContext2D) => {
          ctx.drawImage(bitmap, 0, 0);
          bitmap.close();
        },
      };
    } catch {
      // Fall back to Image element loading below
    }
  }

  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        draw: (ctx: CanvasRenderingContext2D) => ctx.drawImage(img, 0, 0),
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

/**
 * Inflates a zlib (FlateDecode) stream using the browser's native
 * DecompressionStream. No third-party inflate library is required.
 */
async function inflateStream(bytes: Uint8Array): Promise<Uint8Array | null> {
  if (typeof DecompressionStream === "undefined") return null;
  try {
    const stream = new Blob([bytes as BlobPart])
      .stream()
      .pipeThrough(new DecompressionStream("deflate"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    return null;
  }
}

const numberOf = (dict: PDFDict, key: string): number =>
  Number(dict.get(PDFName.of(key))?.toString() ?? NaN);

/**
 * Decodes a FlateDecode image stream into paintable pixels.
 *
 * PDF stores these as raw samples compressed with zlib, not as a PNG file, so
 * the browser cannot decode them from a Blob. Inflating and reinterpreting the
 * samples is what lets PNG-sourced artwork be recompressed at all — before
 * this existed, every Flate image in every document was passed through
 * untouched no matter which preset was chosen.
 *
 * Returns null for anything that cannot be reinterpreted safely, so an
 * unsupported layout results in the image being left alone rather than
 * corrupted.
 */
async function decodeFlateImage(
  context: PDFContext,
  dict: PDFDict,
  bytes: Uint8Array,
): Promise<DecodedImage | null> {
  // A predictor rewrites the byte layout; without un-filtering it first the
  // inflated bytes are not pixels. Bail rather than produce a garbled image.
  const parms = dict.get(PDFName.of("DecodeParms"));
  if (parms) {
    const resolved = context.lookup(parms);
    if (resolved instanceof PDFDict) {
      const predictor = Number(resolved.get(PDFName.of("Predictor"))?.toString() ?? "1");
      if (predictor > 1) return null;
    } else if (resolved) {
      // An array of parameter dictionaries means a filter chain we do not model.
      return null;
    }
  }

  if (numberOf(dict, "BitsPerComponent") !== 8) return null;

  const width = numberOf(dict, "Width");
  const height = numberOf(dict, "Height");
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) return null;

  const colorSpace = context.lookup(dict.get(PDFName.of("ColorSpace")))?.toString() ?? "";
  const components = colorSpace.includes("DeviceRGB")
    ? 3
    : colorSpace.includes("DeviceGray")
      ? 1
      : 0;
  if (!components) return null;

  const raw = await inflateStream(bytes);
  if (!raw || raw.length < width * height * components) return null;

  const rgba = new Uint8ClampedArray(width * height * 4);
  if (components === 3) {
    for (let px = 0, s = 0, d = 0; px < width * height; px++, s += 3, d += 4) {
      rgba[d] = raw[s];
      rgba[d + 1] = raw[s + 1];
      rgba[d + 2] = raw[s + 2];
      rgba[d + 3] = 255;
    }
  } else {
    for (let px = 0, d = 0; px < width * height; px++, d += 4) {
      const v = raw[px];
      rgba[d] = v;
      rgba[d + 1] = v;
      rgba[d + 2] = v;
      rgba[d + 3] = 255;
    }
  }

  const imageData = new ImageData(rgba, width, height);
  return { width, height, draw: (ctx) => ctx.putImageData(imageData, 0, 0) };
}

/**
 * Compress PDF with selectable quality preset:
 * - "low": Structural lossless optimization (pdf-lib default save with object streams)
 * - "medium": 75% JPEG recompression for embedded raster images + structural optimization
 * - "high": 50% JPEG recompression for embedded raster images + structural optimization
 */
export async function compressPdf(
  arrayBuffer: ArrayBuffer,
  preset: CompressionPreset = "medium",
  onProgress?: (msg: string) => void,
  fileName?: string,
): Promise<CompressionResult> {
  const originalSize = arrayBuffer.byteLength;

  // 1. Load the PDF document in pdf-lib (rejects password-protected files)
  const pdfDoc = await loadPdf(arrayBuffer, fileName);

  // Low preset: Lossless structural re-save only (identical baseline behavior)
  if (preset === "low") {
    onProgress?.("Applying structural optimization...");
    const bytes = await pdfDoc.save({ useObjectStreams: true });
    return {
      bytes,
      originalSize,
      compressedSize: bytes.byteLength,
      recompressedImageCount: 0,
      skippedImageCount: 0,
    };
  }

  const quality = preset === "high" ? 0.5 : 0.75;
  let recompressedImageCount = 0;
  let skippedImageCount = 0;

  // 2. Enumerate indirect objects using pdf-lib internal APIs
  /*
   * MANDATORY WARNING / INTERNAL API DEPENDENCY NOTICE:
   * -------------------------------------------------------------------------
   * The logic below accesses pdf-lib's undocumented internal APIs:
   *   - pdfDoc.context.enumerateIndirectObjects()
   *   - Direct inspection of PDFRawStream instance & mutation of stream.contents
   *   - Direct mutation of PDFDict keys via dict.set() and dict.delete()
   *
   * This implementation relies strictly on the internal object model of pdf-lib v1.17.1.
   * To protect against silent breaking changes, the pdf-lib version in package.json
   * IS PINNED EXACTLY to "1.17.1" (without ^ or ~ caret operators).
   *
   * DO NOT auto-upgrade or modify the pdf-lib dependency version without manually
   * testing and verifying that these internal object structures remain intact.
   * -------------------------------------------------------------------------
   */
  const indirectObjects = pdfDoc.context.enumerateIndirectObjects();
  const totalObjects = indirectObjects.length;

  onProgress?.(`Analyzing document structure (${totalObjects} objects)...`);

  /*
   * Streams that are themselves used as a soft mask hold alpha data, not colour.
   * Re-encoding one as an RGB JPEG would turn a single-channel mask into three
   * channels and destroy the transparency of the image referencing it, so they
   * are collected up front and left untouched. Images that *have* an SMask are
   * still fair game: the base image is recompressed and its mask is preserved
   * intact alongside it.
   */
  const maskTargets = new Set<string>();
  for (const [, obj] of indirectObjects) {
    if (!(obj instanceof PDFRawStream)) continue;
    for (const key of ["SMask", "Mask"]) {
      const value = obj.dict.get(PDFName.of(key));
      if (value instanceof PDFRef) maskTargets.add(value.toString());
    }
  }

  for (let idx = 0; idx < indirectObjects.length; idx++) {
    const [ref, obj] = indirectObjects[idx];

    // Report progress periodically
    if (idx % 10 === 0 || idx === indirectObjects.length - 1) {
      onProgress?.(`Processing object ${idx + 1} of ${totalObjects}...`);
    }

    /*
     * MANDATORY INTERNAL API MUTATION & EXCLUSION LOGIC:
     * Check if the object is an indirect PDFRawStream containing an Image XObject.
     */
    if (!(obj instanceof PDFRawStream)) continue;

    const dict = obj.dict;
    const subtype = dict.get(PDFName.of("Subtype"))?.toString();
    if (subtype !== "/Image") continue;

    // EXCLUSION 1: The stream is the alpha channel for another image.
    if (maskTargets.has(ref.toString())) {
      skippedImageCount++;
      continue;
    }

    // EXCLUSION 2: Stencil masks are 1-bit-per-pixel by definition and must stay that way.
    if (dict.get(PDFName.of("ImageMask"))?.toString() === "true") {
      skippedImageCount++;
      continue;
    }

    // EXCLUSION 3: Encodings we cannot hand to a canvas.
    const filter = dict.get(PDFName.of("Filter"))?.toString() || "";
    if (
      filter.includes("CCITTFaxDecode") ||
      filter.includes("JBIG2Decode") ||
      filter.includes("JPXDecode")
    ) {
      skippedImageCount++;
      continue;
    }

    // EXCLUSION 4: Per-image try/catch safeguard — failure on one image MUST NOT abort batch or corrupt document
    try {
      const origBytes = obj.contents;
      if (!origBytes || origBytes.length === 0) {
        skippedImageCount++;
        continue;
      }

      /*
       * Decode by encoding rather than by declared colour space. A JPEG is handed
       * straight to the browser, which knows its own colour model — this is why
       * the colour space is no longer inspected for DCTDecode images. Reading it
       * as a string used to reject every image whose /ColorSpace was written as an
       * indirect reference (the normal output of Word, InDesign and most scanner
       * software), which silently disabled recompression on a large share of real
       * documents.
       */
      let decoded: DecodedImage | null = null;
      if (filter.includes("DCTDecode")) {
        decoded = await decodeImageBlob(new Blob([origBytes as BlobPart], { type: "image/jpeg" }));
      } else if (filter.includes("FlateDecode")) {
        decoded = await decodeFlateImage(pdfDoc.context, dict, origBytes);
      }

      if (!decoded || decoded.width === 0 || decoded.height === 0) {
        skippedImageCount++;
        continue;
      }

      const canvas = document.createElement("canvas");
      canvas.width = decoded.width;
      canvas.height = decoded.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        skippedImageCount++;
        continue;
      }

      decoded.draw(ctx);

      const newBytes = await canvasToBlob(canvas, quality);
      if (!newBytes) {
        skippedImageCount++;
        continue;
      }

      // SIZE SAFEGUARD: Only replace if recompressed bytes are strictly smaller than original
      if (newBytes.length >= origBytes.length) {
        skippedImageCount++;
        continue;
      }

      /*
       * MANDATORY INTERNAL API MUTATION:
       * Replace stream contents in place and update dictionary metadata to match JPEG.
       */
      obj.contents = newBytes;

      dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      dict.delete(PDFName.of("DecodeParms"));
      // A /Decode array remaps samples for the previous encoding; leaving one in
      // place over fresh RGB JPEG data would invert or shift the colours.
      dict.delete(PDFName.of("Decode"));
      dict.set(PDFName.of("Width"), PDFNumber.of(decoded.width));
      dict.set(PDFName.of("Height"), PDFNumber.of(decoded.height));
      dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
      dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));

      recompressedImageCount++;
    } catch (err) {
      console.warn(`Skipping image object ${ref.toString()} due to re-encoding error:`, err);
      skippedImageCount++;
    }
  }

  onProgress?.("Finalizing compressed document...");
  const bytes = await pdfDoc.save({ useObjectStreams: true });

  return {
    bytes,
    originalSize,
    compressedSize: bytes.byteLength,
    recompressedImageCount,
    skippedImageCount,
  };
}
