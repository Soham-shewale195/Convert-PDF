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
/*  ruled-table detection                                               */
/* ------------------------------------------------------------------ */

/**
 * Table recovery, deliberately limited to tables that draw their own borders.
 *
 * A PDF has no table concept — only positioned text and drawing operators — so
 * anything inferred from whitespace alignment would be a guess, and a wrongly
 * reconstructed table reads worse than no table at all. Detection therefore
 * keys on actual ruling: a grid of thin filled rectangles. Text merely arranged
 * in columns draws no rules and is left to the paragraph path untouched.
 *
 * Every check below is a reason to give up rather than guess. When a region
 * fails any of them the whole region falls back to plain paragraphs, which is
 * the behaviour that shipped before tables existed.
 */

/** A ruled segment. `pos` is x for a vertical rule, y for a horizontal one. */
type Rule = { pos: number; a: number; b: number };

type Lattice = {
  /** Grid lines: columns ascending, rows descending (PDF y grows upward). */
  colX: number[];
  rowY: number[];
  vRules: Rule[];
  hRules: Rule[];
  x0: number;
  x1: number;
  y0: number;
  y1: number;
};

/** Grid-line positions closer than this are the same line. */
const RULE_TOLERANCE = 2;
/** A filled rectangle thinner than this in one axis is a rule, not a box. */
const RULE_THICKNESS = 2.5;
/** Shorter marks are underlines or punctuation, not table ruling. */
const MIN_RULE_LENGTH = 8;
/** Segments at least this close belong to the same table. */
const JOIN_TOLERANCE = 4;
/** Text may sit this far outside its cell band before the region is abandoned. */
const CELL_SLACK = 3;

/** Collapses near-identical positions into single grid lines. */
function clusterPositions(values: number[]): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const out: number[] = [];
  for (const v of sorted) {
    if (!out.length || Math.abs(v - out[out.length - 1]) > RULE_TOLERANCE) out.push(v);
  }
  return out;
}

type SegBox = { x0: number; x1: number; y0: number; y1: number };

const segBox = (r: Rule, vertical: boolean): SegBox =>
  vertical
    ? { x0: r.pos - 1, x1: r.pos + 1, y0: r.a, y1: r.b }
    : { x0: r.a, x1: r.b, y0: r.pos - 1, y1: r.pos + 1 };

const boxesTouch = (p: SegBox, q: SegBox) =>
  !(
    p.x1 < q.x0 - JOIN_TOLERANCE ||
    q.x1 < p.x0 - JOIN_TOLERANCE ||
    p.y1 < q.y0 - JOIN_TOLERANCE ||
    q.y1 < p.y0 - JOIN_TOLERANCE
  );

/**
 * Finds ruled grids on a page.
 *
 * Segments are grouped into connected components first, so two tables on one
 * page stay separate. Clustering every rule on the page into one grid would
 * fuse them into a single bogus table spanning both.
 */
function detectLattices(
  fnArray: ArrayLike<number>,
  argsArray: ArrayLike<unknown>,
  constructPathOp: number,
  pageWidth: number,
  pageHeight: number,
): Lattice[] {
  const vRules: Rule[] = [];
  const hRules: Rule[] = [];

  for (let i = 0; i < fnArray.length; i++) {
    if (fnArray[i] !== constructPathOp) continue;
    const args = argsArray[i] as unknown[] | undefined;
    const bb = args?.[2] as ArrayLike<number> | undefined;
    if (!bb || bb.length < 4) continue;
    const x0 = Math.min(bb[0], bb[2]);
    const x1 = Math.max(bb[0], bb[2]);
    const y0 = Math.min(bb[1], bb[3]);
    const y1 = Math.max(bb[1], bb[3]);
    const w = x1 - x0;
    const h = y1 - y0;
    // A page-sized rectangle is a background wash, not table ruling.
    if (w > pageWidth * 0.95 && h > pageHeight * 0.95) continue;
    if (h <= RULE_THICKNESS && w > MIN_RULE_LENGTH) {
      hRules.push({ pos: (y0 + y1) / 2, a: x0, b: x1 });
    } else if (w <= RULE_THICKNESS && h > MIN_RULE_LENGTH) {
      vRules.push({ pos: (x0 + x1) / 2, a: y0, b: y1 });
    }
  }

  const all = [
    ...vRules.map((r) => ({ r, vertical: true })),
    ...hRules.map((r) => ({ r, vertical: false })),
  ];
  if (!all.length) return [];

  // Union-find over touching segments, so each component is one table.
  const parent = all.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const boxes = all.map((s) => segBox(s.r, s.vertical));
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      if (boxesTouch(boxes[i], boxes[j])) parent[find(i)] = find(j);
    }
  }

  const groups = new Map<number, typeof all>();
  all.forEach((s, i) => {
    const k = find(i);
    const g = groups.get(k);
    if (g) g.push(s);
    else groups.set(k, [s]);
  });

  const lattices: Lattice[] = [];
  for (const group of groups.values()) {
    const v = group.filter((s) => s.vertical).map((s) => s.r);
    const h = group.filter((s) => !s.vertical).map((s) => s.r);
    const colX = clusterPositions(v.map((r) => r.pos));
    const rowY = clusterPositions(h.map((r) => r.pos)).reverse(); // top → bottom
    // Two columns and two rows need three lines each. Fewer means a rule or a
    // box outline, not a grid.
    if (colX.length < 3 || rowY.length < 3) continue;
    lattices.push({
      colX,
      rowY,
      vRules: v,
      hRules: h,
      x0: colX[0],
      x1: colX[colX.length - 1],
      y0: rowY[rowY.length - 1],
      y1: rowY[0],
    });
  }
  // Top-most table first, matching reading order.
  return lattices.sort((a, b) => b.y1 - a.y1);
}

/**
 * True when ruling is actually drawn across the whole span between two lines.
 *
 * Coverage is tested against the union of collinear segments, not any single
 * one. Word draws a table's borders per cell rather than as one long rule, so
 * the line under a merged header arrives as one segment per underlying column
 * with hairline gaps between them. Asking whether one segment spans the range
 * would read every such border as missing, and merge detection keys on exactly
 * that absence.
 */
const ruleCovers = (rules: Rule[], pos: number, from: number, to: number) => {
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  const collinear = rules
    .filter((r) => Math.abs(r.pos - pos) <= RULE_TOLERANCE)
    .sort((a, b) => a.a - b.a);
  let reach = lo;
  for (const seg of collinear) {
    // Sorted by start, so a segment beginning past the reach leaves a real gap.
    if (seg.a > reach + RULE_TOLERANCE) break;
    reach = Math.max(reach, seg.b);
    if (reach >= hi - RULE_TOLERANCE) return true;
  }
  return reach >= hi - RULE_TOLERANCE;
};

type CellPlan = { row: number; col: number; colSpan: number; rowSpan: number; frags: Frag[] };

/**
 * Resolves a lattice into cells, spans and their text.
 *
 * A merged cell is read from absent ruling: where the interior vertical line
 * between two columns is not drawn across a row band, those two cells are one.
 * The same test transposed gives vertical merges. Returns null whenever the
 * region cannot be resolved confidently, so the caller falls back to prose.
 */
function planTable(lat: Lattice, frags: Frag[]): CellPlan[] | null {
  const rows = lat.rowY.length - 1;
  const cols = lat.colX.length - 1;
  if (rows < 2 || cols < 2) return null;

  // A real grid line is drawn down most of the table; a merge removes it from
  // a few bands at most. A line present in only a band or two is evidence the
  // region is not one grid — a nested table, for instance, contributes lines
  // that exist inside a single row. Reading that as a merge would flatten the
  // nesting into a plausible-looking but wrong shape, so the region is given
  // up instead. The cost is that a two-row table with a merged header also
  // falls back to prose, which is the safer way to be wrong.
  for (let c = 1; c < cols; c++) {
    let drawn = 0;
    for (let r = 0; r < rows; r++) {
      if (ruleCovers(lat.vRules, lat.colX[c], lat.rowY[r], lat.rowY[r + 1])) drawn++;
    }
    if (drawn <= rows * 0.5) return null;
  }
  for (let r = 1; r < rows; r++) {
    let drawn = 0;
    for (let c = 0; c < cols; c++) {
      if (ruleCovers(lat.hRules, lat.rowY[r], lat.colX[c], lat.colX[c + 1])) drawn++;
    }
    if (drawn <= cols * 0.5) return null;
  }

  const covered: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const plans: CellPlan[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (covered[r][c]) continue;
      const top = lat.rowY[r];
      const bottom = lat.rowY[r + 1];

      let colSpan = 1;
      while (c + colSpan < cols && !ruleCovers(lat.vRules, lat.colX[c + colSpan], top, bottom)) {
        colSpan++;
      }

      let rowSpan = 1;
      while (
        r + rowSpan < rows &&
        !ruleCovers(lat.hRules, lat.rowY[r + rowSpan], lat.colX[c], lat.colX[c + colSpan])
      ) {
        rowSpan++;
      }

      for (let rr = r; rr < r + rowSpan; rr++) {
        for (let cc = c; cc < c + colSpan; cc++) {
          // Overlapping spans mean the ruling contradicts itself; give up.
          if (covered[rr][cc]) return null;
          covered[rr][cc] = true;
        }
      }
      plans.push({ row: r, col: c, colSpan, rowSpan, frags: [] });
    }
  }

  // Every fragment must land in exactly one planned cell.
  for (const f of frags) {
    let r = -1;
    for (let i = 0; i < rows; i++) {
      if (f.y <= lat.rowY[i] + CELL_SLACK && f.y > lat.rowY[i + 1] - CELL_SLACK) {
        r = i;
        break;
      }
    }
    let c = -1;
    for (let i = 0; i < cols; i++) {
      if (f.x >= lat.colX[i] - CELL_SLACK && f.x < lat.colX[i + 1] + CELL_SLACK) {
        c = i;
        break;
      }
    }
    if (r < 0 || c < 0) return null;
    const owner = plans.find(
      (p) => r >= p.row && r < p.row + p.rowSpan && c >= p.col && c < p.col + p.colSpan,
    );
    if (!owner) return null;
    // Text wider than the cell holding it means the grid does not describe
    // this layout, whatever the ruling suggested.
    const cellRight = lat.colX[owner.col + owner.colSpan];
    if (f.x + f.width > cellRight + CELL_SLACK * 2) return null;
    owner.frags.push(f);
  }

  return plans;
}

/* ------------------------------------------------------------------ */
/*  conversion                                                          */
/* ------------------------------------------------------------------ */

export type PdfToDocxResult = {
  blob: Blob;
  stats: {
    pages: number;
    paragraphs: number;
    /** Ruled tables recovered. Borderless column layouts are not counted. */
    tables: number;
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
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
  } = await import("docx");

  const doc = await pdfjs.getDocument({ data }).promise;
  if (doc.numPages > MAX_PAGES) {
    throw new Error(`PDF exceeds the ${MAX_PAGES}-page limit for Word conversion.`);
  }

  onProgress?.(20, `Reading ${doc.numPages} page${doc.numPages === 1 ? "" : "s"}...`);

  /* --- pass 1: extract every page's lines --- */
  const perPage: {
    lines: Line[];
    tables: { lat: Lattice; cells: CellPlan[] }[];
    width: number;
    height: number;
  }[] = [];
  const fontsSeen = new Set<string>();
  const symbolFontsSeen = new Set<string>();

  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: 1 });
    // Also forces pdf.js to resolve embedded font objects so commonObjs can
    // name them, which the font resolver below depends on.
    const ops = await page.getOperatorList();
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

    // Tables are resolved before lines are built, not after. A row's cells
    // share a baseline, so buildLines would fuse them into one line and the
    // column boundaries would be gone. Partitioning fragments keeps the
    // paragraph path receiving exactly the shape it always has: when nothing
    // is detected `bodyFrags` is `frags`, so the pipeline below is unchanged.
    const tables: { lat: Lattice; cells: CellPlan[] }[] = [];
    let bodyFrags = frags;

    for (const lat of detectLattices(
      ops.fnArray,
      ops.argsArray,
      pdfjs.OPS.constructPath,
      viewport.width,
      viewport.height,
    )) {
      const inside = bodyFrags.filter(
        (f) =>
          f.x >= lat.x0 - CELL_SLACK &&
          f.x <= lat.x1 + CELL_SLACK &&
          f.y <= lat.y1 + CELL_SLACK &&
          f.y >= lat.y0 - CELL_SLACK,
      );
      const cells = planTable(lat, inside);
      // A region that will not resolve cleanly is abandoned whole: its text
      // stays in bodyFrags and reads as ordinary paragraphs. Emitting the
      // resolvable cells and stranding the rest would be worse than both.
      if (!cells) continue;
      tables.push({ lat, cells });
      const claimed = new Set(inside);
      bodyFrags = bodyFrags.filter((f) => !claimed.has(f));
    }

    perPage.push({
      lines: buildLines(bodyFrags),
      tables,
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
  const children: (InstanceType<typeof Paragraph> | InstanceType<typeof Table>)[] = [];
  let paragraphCount = 0;
  let tableCount = 0;

  const alignMap = {
    left: AlignmentType.START,
    center: AlignmentType.CENTER,
    right: AlignmentType.END,
    justify: AlignmentType.BOTH,
  } as const;

  /**
   * Turns one paragraph's lines into runs.
   *
   * Runs accumulate across the whole paragraph rather than per line. The lines
   * in a group are the wrapped lines of one paragraph — groupParagraphs has
   * already split anything genuinely separate on its vertical gap — so pinning
   * them with hard breaks would fight Word's own rewrapping and strand
   * fragments mid-sentence at Word's (different) text width.
   */
  const buildRuns = (para: Line[]): InstanceType<typeof TextRun>[] => {
    const runs: InstanceType<typeof TextRun>[] = [];
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
    return runs;
  };

  /** PDF points are 1/72 in; Word table widths are in twips (1/20 pt). */
  const PT_TO_TWIP = 20;
  const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "auto" };

  /** A cell's own text, reusing the same line and paragraph logic as the body. */
  const cellParagraphs = (frags: Frag[]) => {
    const out: InstanceType<typeof Paragraph>[] = [];
    const lines = buildLines(frags);
    if (lines.length) {
      const x1 = Math.max(...lines.map((l) => l.x1));
      for (const para of groupParagraphs(lines, x1)) {
        const runs = buildRuns(para);
        // Cell text keeps Word's default alignment. Inferring it from one or
        // two short lines in a narrow cell guesses far more often than it reads.
        if (runs.length) out.push(new Paragraph({ children: runs }));
      }
    }
    // Word treats a cell holding no paragraph at all as malformed.
    return out.length ? out : [new Paragraph({})];
  };

  const buildTable = ({ lat, cells }: { lat: Lattice; cells: CellPlan[] }) => {
    const colCount = lat.colX.length - 1;
    const rowCount = lat.rowY.length - 1;
    // Explicit widths from the detected grid. Without these Word lays every
    // column out equally, which throws away the source's proportions.
    const widths = Array.from({ length: colCount }, (_, i) =>
      Math.round((lat.colX[i + 1] - lat.colX[i]) * PT_TO_TWIP),
    );

    const byRow: CellPlan[][] = Array.from({ length: rowCount }, () => []);
    // A row-spanning cell belongs only to the row it starts in: docx generates
    // the vMerge continuation cells underneath it, and adding our own would
    // double them up.
    for (const c of cells) byRow[c.row].push(c);
    for (const r of byRow) r.sort((a, b) => a.col - b.col);

    return new Table({
      columnWidths: widths,
      width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
      // Detection only fires on ruled tables, so plain single borders are a
      // fair rendering. Matching exact weight, colour and shading is Faithful
      // mode's job, not this one's.
      borders: {
        top: cellBorder,
        bottom: cellBorder,
        left: cellBorder,
        right: cellBorder,
        insideHorizontal: cellBorder,
        insideVertical: cellBorder,
      },
      rows: byRow.map(
        (rowCells) =>
          new TableRow({
            children: rowCells.map(
              (c) =>
                new TableCell({
                  columnSpan: c.colSpan > 1 ? c.colSpan : undefined,
                  rowSpan: c.rowSpan > 1 ? c.rowSpan : undefined,
                  width: {
                    size: widths.slice(c.col, c.col + c.colSpan).reduce((a, b) => a + b, 0),
                    type: WidthType.DXA,
                  },
                  children: cellParagraphs(c.frags),
                }),
            ),
          }),
      ),
    });
  };

  perPage.forEach((p, pageIndex) => {
    const body = p.lines.filter((l) => {
      const sig = signature(l.text);
      const topEdge = p.height * (1 - BAND_FRACTION);
      const bottomEdge = p.height * BAND_FRACTION;
      if (l.y >= topEdge && headerSigs.has(sig)) return false;
      if (l.y <= bottomEdge && footerSigs.has(sig)) return false;
      return true;
    });

    // Paragraphs and tables are collected with their vertical position and
    // emitted in page order. With no tables detected this is the paragraph
    // list in the order groupParagraphs already produced it, so the output is
    // the same as before tables existed.
    const blocks: {
      y: number;
      item: InstanceType<typeof Paragraph> | InstanceType<typeof Table>;
    }[] = [];

    if (body.length) {
      const blockX0 = Math.min(...body.map((l) => l.x0));
      const blockX1 = Math.max(...body.map((l) => l.x1));

      for (const para of groupParagraphs(body, blockX1)) {
        const align = inferAlignment(para, blockX0, blockX1);
        const runs = buildRuns(para);
        if (runs.length) {
          blocks.push({
            y: para[0].y,
            item: new Paragraph({ alignment: alignMap[align], children: runs }),
          });
          paragraphCount++;
        }
      }
    }

    for (const t of p.tables) {
      blocks.push({ y: t.lat.y1, item: buildTable(t) });
      tableCount++;
    }

    blocks.sort((a, b) => b.y - a.y);
    for (const b of blocks) children.push(b.item);

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
      tables: tableCount,
      fonts: [...fontsSeen].sort(),
      header: headerText,
      footer: footerText,
    },
  };
}
