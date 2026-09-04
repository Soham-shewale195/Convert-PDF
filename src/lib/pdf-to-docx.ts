/**
 * PDF to Word (.docx) conversion, entirely in the browser.
 *
 * The previous implementation kept only `item.str` from pdf.js and emitted one
 * bare paragraph per visual line, so font, size, weight, slant, alignment and
 * pagination were all discarded; page boundaries were marked with a fake
 * "Page N" heading injected into the body.
 *
 * This module reads the per-run data pdf.js actually exposes — the text matrix
 * (position and scale) and the resolved font name — and rebuilds a styled
 * document with real fonts, sizes, bold/italic, inferred paragraph alignment,
 * genuine page breaks, and headers/footers promoted to Word's own section-level
 * Header/Footer where they demonstrably repeat.
 *
 * Deliberately NOT attempted:
 *   - Text colour. `getTextContent()` does not expose fill colour at all; it
 *     would require walking `getOperatorList()` and tracking graphics state
 *     against text-showing operators. Everything is emitted in the default
 *     colour rather than guessed at.
 *   - Tables and images. A PDF has no table concept, only positioned text and
 *     drawing operators, so any reconstruction would be a guess.
 */

/* ------------------------------------------------------------------ */
/*  tuning constants                                                    */
/* ------------------------------------------------------------------ */

/** Items within this many points of each other vertically are one line. */
const LINE_TOLERANCE = 2.5;
/** Horizontal slack when judging whether a line starts/ends at the block edge. */
const EDGE_TOLERANCE = 6;
/** Fraction of page height at the top/bottom treated as header/footer band. */
const BAND_FRACTION = 0.1;
/** A band line must recur on at least this share of pages to become a real
 *  Header/Footer. Below it, the text is left inline so a wrong guess costs
 *  nothing rather than repeating on every page. */
const RECURRENCE_THRESHOLD = 0.6;
/** Vertical gap beyond this multiple of the line height starts a new paragraph. */
const PARAGRAPH_GAP_RATIO = 1.6;

export const MAX_PAGES = 100;

/* ------------------------------------------------------------------ */
/*  font resolution                                                     */
/* ------------------------------------------------------------------ */

/** Base-14 and common embedded names mapped to families present on every
 *  Windows/macOS Word install. Anything unmatched falls back to the generic
 *  bucket pdf.js reports, rather than being dropped. */
const FONT_ALIASES: Record<string, string> = {
  helvetica: "Arial",
  arial: "Arial",
  arialmt: "Arial",
  liberationsans: "Arial",
  calibri: "Calibri",
  segoeui: "Segoe UI",
  verdana: "Verdana",
  tahoma: "Tahoma",
  timesnewroman: "Times New Roman",
  times: "Times New Roman",
  timesnewromanpsmt: "Times New Roman",
  liberationserif: "Times New Roman",
  georgia: "Georgia",
  garamond: "Garamond",
  cambria: "Cambria",
  courier: "Courier New",
  couriernew: "Courier New",
  consolas: "Consolas",
  symbol: "Symbol",
};

const GENERIC_FALLBACK: Record<string, string> = {
  serif: "Times New Roman",
  "sans-serif": "Arial",
  monospace: "Courier New",
};

export type ResolvedFont = { family: string; bold: boolean; italic: boolean };

/**
 * Turns a PDF font name into a usable Word family plus weight/slant.
 * Embedded fonts are usually subset-tagged, e.g. `ABCDEF+Calibri-BoldItalic`.
 */
export function resolveFont(rawName: string, genericBucket?: string): ResolvedFont {
  const name = (rawName || "").replace(/^[A-Z]{6}\+/, "");
  const lower = name.toLowerCase();

  const bold = /bold|black|heavy|semibold|demibold|[-,_]bd\b/.test(lower);
  const italic = /italic|oblique|[-,_]it\b/.test(lower);

  // Strip style words and punctuation to get at the family stem.
  const stem = lower
    .replace(/(bold|black|heavy|semibold|demibold|italic|oblique|regular|roman|light|medium)/g, "")
    .replace(/[^a-z]/g, "");

  const family =
    FONT_ALIASES[stem] ||
    FONT_ALIASES[lower.replace(/[^a-z]/g, "")] ||
    GENERIC_FALLBACK[genericBucket || ""] ||
    // Last resort: a serif/sans guess from the stem itself.
    (/times|serif|georgia|garamond|book|roman|minion/.test(stem)
      ? "Times New Roman"
      : /mono|courier|consol/.test(stem)
        ? "Courier New"
        : "Arial");

  return { family, bold, italic };
}

/* ------------------------------------------------------------------ */
/*  extraction model                                                    */
/* ------------------------------------------------------------------ */

type Frag = {
  text: string;
  x: number;
  y: number;
  width: number;
  size: number;
  font: ResolvedFont;
  /** True when a word gap separates this fragment from the previous one. A PDF
   *  that positions each word individually — justified text, kerned headings,
   *  tabular columns — carries no space characters of its own, so the gap is
   *  the only evidence a space belongs there. */
  spaceBefore?: boolean;
};

/** Below this fraction of the font size, a gap is kerning rather than a space. */
const WORD_GAP_RATIO = 0.18;

type Line = {
  y: number;
  x0: number;
  x1: number;
  size: number;
  frags: Frag[];
  text: string;
};

type Align = "left" | "center" | "right" | "justify";

/** Groups fragments sharing a baseline into lines, ordered top-to-bottom. */
function buildLines(frags: Frag[]): Line[] {
  const sorted = [...frags].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines: Line[] = [];
  for (const f of sorted) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - f.y) <= LINE_TOLERANCE) {
      last.frags.push(f);
      last.x0 = Math.min(last.x0, f.x);
      last.x1 = Math.max(last.x1, f.x + f.width);
      last.size = Math.max(last.size, f.size);
    } else {
      lines.push({ y: f.y, x0: f.x, x1: f.x + f.width, size: f.size, frags: [f], text: "" });
    }
  }
  for (const l of lines) {
    l.frags.sort((a, b) => a.x - b.x);
    for (let i = 1; i < l.frags.length; i++) {
      const prev = l.frags[i - 1];
      const cur = l.frags[i];
      const gap = cur.x - (prev.x + prev.width);
      cur.spaceBefore =
        gap > Math.max(prev.size, cur.size) * WORD_GAP_RATIO &&
        !/\s$/.test(prev.text) &&
        !/^\s/.test(cur.text);
    }
    l.text = l.frags
      .map((f, i) => (i && f.spaceBefore ? " " + f.text : f.text))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  }
  return lines.filter((l) => l.text.length > 0);
}

/** Infers alignment for a block of lines against the page's text-column bounds. */
function inferAlignment(lines: Line[], blockX0: number, blockX1: number): Align {
  if (!lines.length) return "left";

  // Justified text has every line but the last flush to both edges.
  if (lines.length >= 2) {
    const body = lines.slice(0, -1);
    const flushBoth = body.every(
      (l) =>
        Math.abs(l.x0 - blockX0) <= EDGE_TOLERANCE && Math.abs(l.x1 - blockX1) <= EDGE_TOLERANCE,
    );
    if (flushBoth && Math.abs(lines[lines.length - 1].x0 - blockX0) <= EDGE_TOLERANCE) {
      return "justify";
    }
  }

  // Otherwise judge by how the block's own leading/trailing gaps compare.
  const leftGap = Math.min(...lines.map((l) => l.x0)) - blockX0;
  const rightGap = blockX1 - Math.max(...lines.map((l) => l.x1));

  if (leftGap > EDGE_TOLERANCE && Math.abs(leftGap - rightGap) <= EDGE_TOLERANCE) return "center";
  if (leftGap > EDGE_TOLERANCE && rightGap <= EDGE_TOLERANCE) return "right";
  return "left";
}

/** Splits a page's lines into paragraphs on vertical gaps. */
function groupParagraphs(lines: Line[]): Line[][] {
  const out: Line[][] = [];
  let current: Line[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!current.length) {
      current.push(line);
      continue;
    }
    const prev = current[current.length - 1];
    const gap = prev.y - line.y;
    const expected = Math.max(prev.size, line.size);
    // A gap much larger than one line, or a size change, starts a new block.
    if (gap > expected * PARAGRAPH_GAP_RATIO || Math.abs(prev.size - line.size) > 1.5) {
      out.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) out.push(current);
  return out;
}

/* ------------------------------------------------------------------ */
/*  header / footer detection                                           */
/* ------------------------------------------------------------------ */

/** Page numbers differ per page, so compare shapes rather than exact text. */
function signature(text: string): string {
  return text.replace(/\d+/g, "#").trim();
}

type BandHit = { page: number; y: number; text: string; line: Line };

/**
 * Finds band text that genuinely repeats. Returns the signatures that qualify,
 * so the caller can both emit them once as a Header/Footer and drop them from
 * every page's body.
 */
function findRepeating(hits: BandHit[], pageCount: number): Set<string> {
  const bySig = new Map<string, BandHit[]>();
  for (const h of hits) {
    const sig = signature(h.text);
    if (!sig) continue;
    if (!bySig.has(sig)) bySig.set(sig, []);
    bySig.get(sig)!.push(h);
  }
  const keep = new Set<string>();
  for (const [sig, group] of bySig) {
    const pages = new Set(group.map((g) => g.page));
    if (pages.size / pageCount < RECURRENCE_THRESHOLD) continue;
    // Require a consistent vertical position too, so body text that merely
    // happens to fall in the band on many pages is not promoted.
    const ys = group.map((g) => g.y);
    if (Math.max(...ys) - Math.min(...ys) > LINE_TOLERANCE * 4) continue;
    keep.add(sig);
  }
  return keep;
}

/* ------------------------------------------------------------------ */
/*  conversion                                                          */
/* ------------------------------------------------------------------ */

export type PdfToDocxResult = {
  blob: Blob;
  stats: {
    pages: number;
    paragraphs: number;
    fonts: string[];
    header: string | null;
    footer: string | null;
  };
};

export type PdfToDocxProgress = (percent: number, message: string) => void;

export async function convertPdfToDocx(
  data: ArrayBuffer,
  onProgress?: PdfToDocxProgress,
): Promise<PdfToDocxResult> {
  const { loadPdfJs } = await import("@/components/PdfToolsUI");
  const pdfjs = await loadPdfJs();
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    PageBreak,
    Header,
    Footer,
    AlignmentType,
    PageNumber,
    convertInchesToTwip,
  } = await import("docx");

  const doc = await pdfjs.getDocument({ data }).promise;
  if (doc.numPages > MAX_PAGES) {
    throw new Error(`PDF exceeds the ${MAX_PAGES}-page limit for Word conversion.`);
  }

  onProgress?.(20, `Reading ${doc.numPages} page${doc.numPages === 1 ? "" : "s"}...`);

  /* --- pass 1: extract every page's lines --- */
  const perPage: { lines: Line[]; width: number; height: number }[] = [];
  const fontsSeen = new Set<string>();

  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: 1 });
    // Forces pdf.js to resolve embedded font objects so commonObjs can name them.
    await page.getOperatorList();
    const content = await page.getTextContent();

    const frags: Frag[] = [];
    for (const item of content.items as Array<Record<string, unknown>>) {
      const str = item.str as string;
      if (!str || !str.trim()) continue;
      const t = item.transform as number[];
      const size = Math.abs(t[0]) || Math.abs(t[3]) || 11;
      const fontId = item.fontName as string;

      let rawName = fontId;
      try {
        if (page.commonObjs.has(fontId)) {
          const obj = page.commonObjs.get(fontId) as { name?: string };
          if (obj?.name) rawName = obj.name;
        }
      } catch {
        /* font not resolvable; the generic bucket below still applies */
      }
      const bucket = (content.styles?.[fontId] as { fontFamily?: string } | undefined)?.fontFamily;
      const font = resolveFont(rawName, bucket);
      fontsSeen.add(font.family);

      frags.push({
        text: str,
        x: t[4],
        y: t[5],
        width: (item.width as number) || 0,
        size,
        font,
      });
    }

    perPage.push({
      lines: buildLines(frags),
      width: viewport.width,
      height: viewport.height,
    });
    onProgress?.(20 + Math.round((n / doc.numPages) * 45), `Analysing page ${n}...`);
  }

  /* --- pass 2: which band text actually repeats? --- */
  const headerHits: BandHit[] = [];
  const footerHits: BandHit[] = [];
  perPage.forEach((p, i) => {
    const topEdge = p.height * (1 - BAND_FRACTION);
    const bottomEdge = p.height * BAND_FRACTION;
    for (const line of p.lines) {
      if (line.y >= topEdge) headerHits.push({ page: i, y: line.y, text: line.text, line });
      else if (line.y <= bottomEdge) footerHits.push({ page: i, y: line.y, text: line.text, line });
    }
  });
  const headerSigs = findRepeating(headerHits, perPage.length);
  const footerSigs = findRepeating(footerHits, perPage.length);

  const headerText = headerHits.find((h) => headerSigs.has(signature(h.text)))?.text ?? null;
  const footerText = footerHits.find((h) => footerSigs.has(signature(h.text)))?.text ?? null;

  /* --- pass 3: build the document body --- */
  const children: InstanceType<typeof Paragraph>[] = [];
  let paragraphCount = 0;

  const alignMap = {
    left: AlignmentType.START,
    center: AlignmentType.CENTER,
    right: AlignmentType.END,
    justify: AlignmentType.BOTH,
  } as const;

  perPage.forEach((p, pageIndex) => {
    const body = p.lines.filter((l) => {
      const sig = signature(l.text);
      const topEdge = p.height * (1 - BAND_FRACTION);
      const bottomEdge = p.height * BAND_FRACTION;
      if (l.y >= topEdge && headerSigs.has(sig)) return false;
      if (l.y <= bottomEdge && footerSigs.has(sig)) return false;
      return true;
    });

    if (body.length) {
      const blockX0 = Math.min(...body.map((l) => l.x0));
      const blockX1 = Math.max(...body.map((l) => l.x1));

      for (const para of groupParagraphs(body)) {
        const align = inferAlignment(para, blockX0, blockX1);
        const runs: InstanceType<typeof TextRun>[] = [];

        // Runs accumulate across the whole paragraph rather than per line. The
        // lines in a group are the wrapped lines of one paragraph — groupParagraphs
        // has already split anything genuinely separate on its vertical gap — so
        // pinning them with hard breaks would fight Word's own rewrapping and
        // strand fragments mid-sentence at Word's (different) text width.
        let pending: { font: ResolvedFont; size: number; text: string } | null = null;
        const flush = () => {
          if (!pending || !pending.text) return;
          runs.push(
            new TextRun({
              text: pending.text,
              font: pending.font.family,
              size: Math.round(pending.size * 2), // docx sizes are half-points
              bold: pending.font.bold,
              italics: pending.font.italic,
            }),
          );
          pending = null;
        };

        para.forEach((line, li) => {
          line.frags.forEach((f, fi) => {
            let gap = "";
            if (fi === 0) {
              // Joining a wrapped line back on needs the space the line break
              // was standing in for.
              const prevText = pending?.text ?? "";
              if (li > 0 && prevText && !/[\s-]$/.test(prevText)) gap = " ";
            } else if (f.spaceBefore) {
              gap = " ";
            }
            const same =
              pending &&
              pending.font.family === f.font.family &&
              pending.font.bold === f.font.bold &&
              pending.font.italic === f.font.italic &&
              Math.abs(pending.size - f.size) < 0.6;
            if (same) pending!.text += gap + f.text;
            else {
              // The gap belongs to the boundary, so it opens the new run rather
              // than trailing the old one.
              flush();
              pending = { font: f.font, size: f.size, text: gap + f.text };
            }
          });
        });
        flush();

        if (runs.length) {
          children.push(new Paragraph({ alignment: alignMap[align], children: runs }));
          paragraphCount++;
        }
      }
    }

    // A real page break, rather than the old "Page N" heading in the body.
    if (pageIndex < perPage.length - 1) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
  });

  onProgress?.(85, "Building the Word document...");

  const first = perPage[0];
  const chromeFont = [...fontsSeen][0] || "Arial";

  /**
   * Builds a header/footer paragraph. Numbers in running chrome are almost
   * always page numbers, and the text captured from page one would otherwise be
   * frozen as a literal "Page 1 of 3" on every page. Digits are therefore
   * emitted as Word's own PAGE / NUMPAGES fields so they stay live.
   */
  const styledLine = (text: string) => {
    const parts = text.split(/(\d+)/).filter((p) => p !== "");
    const numeric = parts.filter((p) => /^\d+$/.test(p));
    const children: InstanceType<typeof TextRun>[] = [];
    let numberIndex = 0;

    for (const part of parts) {
      if (/^\d+$/.test(part)) {
        // Two numbers reads as "x of y"; the second is the total.
        const isTotal = numeric.length >= 2 && numberIndex === 1;
        children.push(
          new TextRun({
            children: [isTotal ? PageNumber.TOTAL_PAGES : PageNumber.CURRENT],
            font: chromeFont,
            size: 20,
          }),
        );
        numberIndex++;
      } else {
        children.push(new TextRun({ text: part, font: chromeFont, size: 20 }));
      }
    }
    return new Paragraph({ children });
  };

  const docx = new Document({
    sections: [
      {
        properties: first
          ? {
              page: {
                // pdf.js viewport units are points; docx wants twips (1/20 pt).
                size: {
                  width: Math.round(first.width * 20),
                  height: Math.round(first.height * 20),
                },
                margin: {
                  top: convertInchesToTwip(1),
                  bottom: convertInchesToTwip(1),
                  left: convertInchesToTwip(1),
                  right: convertInchesToTwip(1),
                },
              },
            }
          : undefined,
        headers: headerText
          ? { default: new Header({ children: [styledLine(headerText)] }) }
          : undefined,
        footers: footerText
          ? { default: new Footer({ children: [styledLine(footerText)] }) }
          : undefined,
        children,
      },
    ],
  });

  const raw = await Packer.toBlob(docx);
  onProgress?.(100, "Done");

  return {
    blob: new Blob([raw], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }),
    stats: {
      pages: perPage.length,
      paragraphs: paragraphCount,
      fonts: [...fontsSeen].sort(),
      header: headerText,
      footer: footerText,
    },
  };
}
