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
  // Common Office/Windows families that previously fell through to a generic
  // serif or sans. Each ships with Windows and with Office on macOS, so naming
  // them is safe; the closest stock substitute is used where a family is not
  // universally present.
  comicsansms: "Comic Sans MS",
  trebuchetms: "Trebuchet MS",
  papyrus: "Papyrus",
  bookantiqua: "Book Antiqua",
  palatino: "Palatino Linotype",
  palatinolinotype: "Palatino Linotype",
  centurygothic: "Century Gothic",
  franklingothic: "Franklin Gothic Book",
  franklingothicbook: "Franklin Gothic Book",
  impact: "Impact",
  rockwell: "Rockwell",
};

/**
 * Dingbat and symbol families, which cannot be substituted with a text font.
 *
 * A PDF stores these glyphs at Private Use Area codepoints — 0xF000 plus the
 * original byte — so a Wingdings tick extracts as U+F0FC rather than as any
 * meaningful character. Mapping such a run to Arial does not produce a wrong
 * letter so much as no glyph at all, because Arial has nothing in that range.
 *
 * Naming the original family instead makes those codepoints round-trip: Word
 * renders U+F0FC in Wingdings as the tick it started as. These are all stock
 * Office fonts, so this is safe wherever Word itself is. Where a family is not
 * installed the glyphs will not resolve, which is why the conversion warns.
 */
const SYMBOL_FONT_PATTERNS: { test: RegExp; family: string }[] = [
  { test: /^wingdings\s*-?\s*2/, family: "Wingdings 2" },
  { test: /^wingdings\s*-?\s*3/, family: "Wingdings 3" },
  { test: /wingdings/, family: "Wingdings" },
  { test: /webdings/, family: "Webdings" },
  { test: /zapf\s*dingbats|monotype\s*sorts/, family: "Wingdings" },
  { test: /^symbol(mt|ps)?\b|^symbol$/, family: "Symbol" },
];

function symbolFamilyFor(lowerName: string): string | null {
  for (const { test, family } of SYMBOL_FONT_PATTERNS) if (test.test(lowerName)) return family;
  return null;
}

/** Private Use Area, where symbol fonts park their glyphs as 0xF000 + byte. */
const isPrivateUse = (cp: number) => cp >= 0xe000 && cp <= 0xf8ff;

/**
 * Splits a fragment so a symbol font is applied only where it actually helps.
 *
 * Extraction is not all-or-nothing on these fonts: a Wingdings run can come
 * back as a mix of Private Use codepoints and genuine Unicode, because pdf.js
 * resolves some glyphs properly — a tick may arrive as U+2713 rather than
 * U+F0FC. Private Use characters need the original family to mean anything;
 * a real Unicode character does not, and forcing Wingdings onto it would
 * replace a glyph that renders with one that does not. Each kind therefore
 * keeps the font that can actually draw it.
 */
function symbolSegments(text: string, font: ResolvedFont): { text: string; font: ResolvedFont }[] {
  if (!font.symbolFont || !text) return [{ text, font }];

  const textFallback: ResolvedFont = { ...font, family: "Arial", symbolFont: false };
  const segments: { text: string; font: ResolvedFont }[] = [];

  for (const ch of text) {
    const wanted = isPrivateUse(ch.codePointAt(0) ?? 0) ? font : textFallback;
    const last = segments[segments.length - 1];
    if (last && last.font.family === wanted.family) last.text += ch;
    else segments.push({ text: ch, font: wanted });
  }
  return segments;
}

const GENERIC_FALLBACK: Record<string, string> = {
  serif: "Times New Roman",
  "sans-serif": "Arial",
  monospace: "Courier New",
};

export type ResolvedFont = {
  family: string;
  bold: boolean;
  italic: boolean;
  /** True for dingbat/symbol families, whose glyphs only survive if the reader
   *  has that exact font. Surfaced so the conversion can say so rather than
   *  substituting a text font and quietly producing nothing legible. */
  symbolFont: boolean;
};

/**
 * Turns a PDF font name into a usable Word family plus weight/slant.
 * Embedded fonts are usually subset-tagged, e.g. `ABCDEF+Calibri-BoldItalic`.
 */
export function resolveFont(rawName: string, genericBucket?: string): ResolvedFont {
  const name = (rawName || "").replace(/^[A-Z]{6}\+/, "");
  const lower = name.toLowerCase();

  const bold = /bold|black|heavy|semibold|demibold|[-,_]bd\b/.test(lower);
  const italic = /italic|oblique|[-,_]it\b/.test(lower);

  // Symbol families are decided before the stem is cleaned, because stripping
  // non-letters would collapse "Wingdings 2" into plain "Wingdings".
  const symbol = symbolFamilyFor(lower);
  if (symbol) return { family: symbol, bold, italic, symbolFont: true };

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

  return { family, bold, italic, symbolFont: false };
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

/**
 * Enumerated-list openers: bullet glyphs, dashes, "1." / "1)" / "(1)",
 * "a." / "b)", and the common roman numerals.
 *
 * A list set at ordinary line spacing is indistinguishable from a wrapped
 * paragraph by vertical gap alone, which is exactly how four numbered lines
 * came back merged into one run-on paragraph. Marker detection separates the
 * two, and it is safe in that direction: text that has merely wrapped
 * essentially never resumes with a fresh list marker.
 *
 * Multi-character romans are listed explicitly rather than matched as
 * [ivxlcdm]+, which would also swallow ordinary words such as "mix." at the
 * start of a wrapped line. Single letters are already covered by the [A-Za-z]
 * branch, so i., v. and x. still work.
 */
const LIST_MARKER = new RegExp(
  "^(?:" +
    "[•▪‣◦·∙*]\\s+" + // • ▪ ‣ ◦ · ∙ *
    "|[-–—]\\s+" + // - – —
    "|\\(?\\d{1,3}[.)]\\s+" + // 1.  1)  (1)
    "|\\(?[A-Za-z][.)]\\s+" + // a.  b)  (c)
    "|\\(?(?:ii|iii|iv|vi|vii|viii|ix|xi|xii)[.)]\\s+" + // ii. iv) …
    ")",
  "i",
);

/** True when a line opens a new list item rather than continuing a paragraph. */
function startsListItem(line: Line): boolean {
  return LIST_MARKER.test(line.text);
}

/**
 * Splits a page's lines into paragraphs on vertical gaps and list markers.
 *
 * `blockX1` is the right edge of the page's text column, which is what makes
 * the marker rule safe. A marker prefix on its own is ambiguous: prose that
 * wraps can legitimately resume with something like "2. appears mid-sentence".
 * The tell is the previous line. A line that stops well short of the column
 * edge ended deliberately, so a marker after it opens a new item; a line that
 * ran to the edge merely wrapped, so what follows is continuation text.
 * Runs of markers are also treated as a list, which covers the case of a long
 * first item that happens to fill its line.
 */
function groupParagraphs(lines: Line[], blockX1: number): Line[][] {
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

    const prevEndedShort = blockX1 - prev.x1 > Math.max(prev.size * 2, EDGE_TOLERANCE * 2);
    const inMarkerRun =
      startsListItem(prev) || (i + 1 < lines.length && startsListItem(lines[i + 1]));
    const opensListItem = startsListItem(line) && (prevEndedShort || inMarkerRun);

    // A gap much larger than one line, a size change, or a genuine list marker
    // all start a new block.
    if (
      gap > expected * PARAGRAPH_GAP_RATIO ||
      Math.abs(prev.size - line.size) > 1.5 ||
      opensListItem
    ) {
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
  // Repetition cannot be established from a single page: on a one-page document
  // every band line trivially appears on "100% of pages", which promoted the
  // first line of ordinary body text into a Word header and cut it out of the
  // document. Two pages are the minimum evidence for a running header.
  if (pageCount < 2) return new Set();

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
  const symbolFontsSeen = new Set<string>();

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
      if (font.symbolFont) symbolFontsSeen.add(font.family);

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

      for (const para of groupParagraphs(body, blockX1)) {
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

            for (const seg of symbolSegments(f.text, f.font)) {
              const segFont = seg.font;
              const segGap = gap;
              gap = "";
              const same =
                pending &&
                pending.font.family === segFont.family &&
                pending.font.bold === segFont.bold &&
                pending.font.italic === segFont.italic &&
                Math.abs(pending.size - f.size) < 0.6;
              if (same) pending!.text += segGap + seg.text;
              else {
                // The gap belongs to the boundary, so it opens the new run
                // rather than trailing the old one.
                flush();
                pending = { font: segFont, size: f.size, text: segGap + seg.text };
              }
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

  if (symbolFontsSeen.size && import.meta.env?.DEV) {
    // Developer-facing only. These runs keep their original family so their
    // Private Use Area codepoints still resolve, but that depends on the
    // reader having the font — there is no text-font substitute that would
    // render them, so the limitation is stated rather than papered over.
    console.warn(
      `[pdf-to-docx] Symbol/dingbat fonts kept as-is: ${[...symbolFontsSeen].join(", ")}. ` +
        `Their glyphs render only where those fonts are installed; no text font can stand in for them.`,
    );
  }

  const first = perPage[0];
  // Header/footer chrome should never inherit a dingbat family.
  const chromeFont = [...fontsSeen].find((f) => !symbolFontsSeen.has(f)) || "Arial";

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
