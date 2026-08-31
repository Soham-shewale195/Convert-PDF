import { PDFRawStream, PDFName, PDFNumber } from "pdf-lib";
import { loadPdfJs } from "@/components/PdfToolsUI";
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

/**
 * Helper to decode a JPEG or raster Blob into canvas dimensions and a draw function.
 */
async function decodeImageBlob(blob: Blob): Promise<{
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
} | null> {
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

  // Optionally load pdfjs-dist for page operator context if needed
  let pdfjsDoc: unknown = null;
  try {
    const pdfjs = await loadPdfJs();
    pdfjsDoc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer.slice(0)) }).promise;
  } catch (e) {
    console.warn("pdfjs-dist background load failed; falling back to direct stream decoding", e);
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

    // EXCLUSION 1: Alpha-masked / Soft-masked images
    if (dict.get(PDFName.of("SMask")) || dict.get(PDFName.of("Mask"))) {
      skippedImageCount++;
      continue;
    }

    // EXCLUSION 2: Unsupported color spaces (e.g. CMYK, Grayscale)
    // Only process explicitly DeviceRGB or absent (implicitly treated as RGB)
    const colorSpace = dict.get(PDFName.of("ColorSpace"))?.toString() || "";
    if (colorSpace !== "" && !colorSpace.includes("DeviceRGB")) {
      skippedImageCount++;
      continue;
    }

    // EXCLUSION 3: CCITT / JBIG2 encoded images
    const filter = dict.get(PDFName.of("Filter"))?.toString() || "";
    if (filter.includes("CCITTFaxDecode") || filter.includes("JBIG2Decode")) {
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

      // Check if JPEG encoded
      const isJpeg = filter.includes("DCTDecode");
      let imageBlob: Blob | null = null;

      if (isJpeg) {
        imageBlob = new Blob([origBytes as BlobPart], { type: "image/jpeg" });
      }

      if (!imageBlob) {
        // Non-JPEG image stream, skip or fallback if blob cannot be constructed directly
        skippedImageCount++;
        continue;
      }

      const decoded = await decodeImageBlob(imageBlob);
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
