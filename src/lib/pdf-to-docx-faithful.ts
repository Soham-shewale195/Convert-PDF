/**
 * PDF to Word (.docx) — "Faithful" mode.
 *
 * A deliberately different pipeline from the "Fast" reconstruction in
 * `pdf-to-docx.ts`, which is left untouched. Where that one reads the PDF's
 * text runs and rebuilds a styled, editable document — recovering fonts,
 * sizes, alignment and pagination, but not colour or tables — this one makes
 * no attempt to interpret the page at all:
 *
 *   pdf.js  →  render each page to a canvas
 *   docx    →  one full-bleed image per section, sized to that page
 *
 * Because each page becomes its own section at its own page size, pagination
 * matches the source exactly and page breaks need no special handling. The
 * trade, stated plainly on the panel, is that the text is an image: not
 * selectable, not searchable, not editable, and a larger file.
 *
 * Nothing here needs the font resolver, the colour question or the table
 * question — capturing sidesteps all three, which is the point of the mode.
 */

/** Render scale. 3x on A4 lands near 2380x3370 px, well inside canvas limits. */
const DEFAULT_SCALE = 3;
/** Step the scale down rather than risk a blank canvas on very large pages. */
const MAX_PAGE_PIXELS = 30_000_000;
/** JPEG keeps a rendered text page far smaller than PNG at the same clarity. */
const JPEG_QUALITY = 0.9;

/** PDF points are 1/72 in; Word page sizes are in twips (1/20 pt). */
const PT_TO_TWIP = 20;
/** docx sizes images in pixels at 96 DPI. */
const PT_TO_PX = 96 / 72;

export const MAX_PAGES = 100;

export type FaithfulPdfResult = {
  blob: Blob;
  stats: {
    pages: number;
    scale: number;
    /** Per-page size in points, as found in the source PDF. */
    pageSizes: { width: number; height: number }[];
  };
};

export type FaithfulPdfProgress = (percent: number, message: string) => void;

export async function convertPdfToDocxFaithful(
  data: ArrayBuffer,
  onProgress?: FaithfulPdfProgress,
): Promise<FaithfulPdfResult> {
  const { loadPdfJs } = await import("@/components/PdfToolsUI");
  const pdfjs = await loadPdfJs();
  const { Document, Packer, Paragraph, ImageRun } = await import("docx");

  const doc = await pdfjs.getDocument({ data }).promise;
  if (doc.numPages > MAX_PAGES) {
    throw new Error(`PDF exceeds the ${MAX_PAGES}-page limit for Word conversion.`);
  }

  onProgress?.(5, `Rendering ${doc.numPages} page${doc.numPages === 1 ? "" : "s"}...`);

  const rendered: { bytes: Uint8Array; widthPt: number; heightPt: number }[] = [];
  const pageSizes: { width: number; height: number }[] = [];
  let usedScale = DEFAULT_SCALE;

  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    // scale 1 gives the page's true size in points, including any /Rotate.
    const base = page.getViewport({ scale: 1 });
    const widthPt = base.width;
    const heightPt = base.height;

    let scale = DEFAULT_SCALE;
    while (scale > 1 && widthPt * scale * heightPt * scale > MAX_PAGE_PIXELS) scale -= 0.5;
    usedScale = Math.min(usedScale, scale);

    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not create a canvas to render the page.");

    // A PDF page has no inherent background; without this, transparent areas
    // would come through black once flattened into a JPEG.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
    const bytes = Uint8Array.from(atob(dataUrl.split(",")[1]), (c) => c.charCodeAt(0));

    pageSizes.push({ width: Math.round(widthPt), height: Math.round(heightPt) });
    rendered.push({ bytes, widthPt, heightPt });

    onProgress?.(
      5 + Math.round((n / doc.numPages) * 85),
      `Rendering page ${n} of ${doc.numPages}...`,
    );
  }

  onProgress?.(95, "Building the Word document...");

  // One section per page, each sized to that page. Word starts a new page at
  // every section boundary, so pagination follows the source with no explicit
  // page breaks. Margins are zeroed and the image is placed at the page's full
  // size, so the capture sits edge to edge rather than being scaled or cropped.
  const raw = await Packer.toBlob(
    new Document({
      sections: rendered.map(({ bytes, widthPt, heightPt }) => ({
        properties: {
          page: {
            size: {
              width: Math.round(widthPt * PT_TO_TWIP),
              height: Math.round(heightPt * PT_TO_TWIP),
            },
            margin: { top: 0, bottom: 0, left: 0, right: 0, header: 0, footer: 0, gutter: 0 },
          },
        },
        children: [
          new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              new ImageRun({
                type: "jpg",
                data: bytes,
                // Floor rather than round: rounding up by a fraction of a point
                // makes the image marginally larger than its page, which Word
                // absorbs but a stricter renderer could spill onto a blank page.
                transformation: {
                  width: Math.floor(widthPt * PT_TO_PX),
                  height: Math.floor(heightPt * PT_TO_PX),
                },
              }),
            ],
          }),
        ],
      })),
    }),
  );
  onProgress?.(100, "Done");

  return {
    blob: new Blob([raw], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }),
    stats: { pages: doc.numPages, scale: usedScale, pageSizes },
  };
}
