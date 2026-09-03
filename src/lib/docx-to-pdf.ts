/**
 * Word (.docx) to PDF conversion, entirely in the browser.
 *
 * The homepage converter historically used `mammoth.extractRawText`, which
 * returns nothing but a string: headings, emphasis, list markers, hyperlink
 * destinations and images are all discarded, and — most damagingly — a table
 * collapses into a flat vertical run of its cell values, so the row/column
 * relationship that gave the numbers meaning is destroyed.
 *
 * This module instead uses `mammoth.convertToHtml`, which preserves that
 * structure, and renders a defined subset of the resulting HTML with jsPDF
 * drawing primitives. No new dependency is involved: mammoth and jsPDF are
 * both already used elsewhere in the app.
 *
 * What is deliberately NOT reproduced — underline, original fonts and colours,
 * alignment, headers and footers, non-Latin scripts — is stated plainly in the
 * page copy at /word-to-pdf rather than silently approximated here.
 */

/** Page geometry, in points. Matches the other document tools on this site. */
const PAGE = { margin: 48, bodySize: 11, lineHeight: 16 } as const;

const HEADING_STYLE: Record<string, { size: number; before: number; after: number }> = {
  h1: { size: 20, before: 18, after: 9 },
  h2: { size: 16, before: 15, after: 7 },
  h3: { size: 13, before: 13, after: 6 },
  h4: { size: 12, before: 11, after: 5 },
  h5: { size: 11.5, before: 10, after: 4 },
  h6: { size: 11, before: 10, after: 4 },
};

type Run = { text: string; bold: boolean; italic: boolean; href?: string };
type Token = Run & { width: number };

/** A jsPDF instance, kept loose so the module does not import jsPDF's types eagerly. */
type Pdf = {
  internal: { pageSize: { getWidth(): number; getHeight(): number } };
  setFont(family: string, style: string): void;
  setFontSize(size: number): void;
  getTextWidth(text: string): number;
  splitTextToSize(text: string, width: number): string[];
  text(text: string, x: number, y: number): void;
  textWithLink(text: string, x: number, y: number, options: { url: string }): void;
  addPage(): void;
  rect(x: number, y: number, w: number, h: number): void;
  setDrawColor(v: number): void;
  setLineWidth(v: number): void;
  addImage(data: string, format: string, x: number, y: number, w: number, h: number): void;
  output(type: "blob"): Blob;
};

/** Running layout state threaded through the render walk. */
type Ctx = {
  pdf: Pdf;
  y: number;
  contentW: number;
  pageH: number;
  imagesEmbedded: number;
  imagesSkipped: number;
  tables: number;
};

function fontStyle(bold: boolean, italic: boolean): string {
  if (bold && italic) return "bolditalic";
  if (bold) return "bold";
  if (italic) return "italic";
  return "normal";
}

function ensureRoom(ctx: Ctx, needed: number) {
  if (ctx.y + needed > ctx.pageH - PAGE.margin) {
    ctx.pdf.addPage();
    ctx.y = PAGE.margin;
  }
}

/** Flattens an element's inline descendants into styled runs. */
function collectRuns(node: Node, inherited: Omit<Run, "text">, out: Run[]) {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = (child.textContent || "").replace(/\s+/g, " ");
      if (text) out.push({ ...inherited, text });
      continue;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) continue;
    const el = child as Element;
    const tag = el.tagName.toLowerCase();
    if (tag === "br") {
      out.push({ ...inherited, text: "\n" });
      continue;
    }
    const next = {
      bold: inherited.bold || tag === "strong" || tag === "b",
      italic: inherited.italic || tag === "em" || tag === "i",
      href: tag === "a" ? el.getAttribute("href") || inherited.href : inherited.href,
    };
    collectRuns(el, next, out);
  }
}

/**
 * Word-wraps a sequence of styled runs and draws them. Measuring per token
 * rather than per paragraph is what allows bold and italic to change mid-line
 * without the wrap points drifting.
 */
function drawRuns(ctx: Ctx, runs: Run[], size: number, indent: number, firstPrefix?: string) {
  const { pdf } = ctx;
  const left = PAGE.margin + indent;
  const maxW = ctx.contentW - indent;
  pdf.setFontSize(size);

  const tokens: Token[] = [];
  for (const run of runs) {
    for (const piece of run.text.split(/(\s+)/)) {
      if (!piece) continue;
      if (piece === "\n") {
        tokens.push({ ...run, text: "\n", width: 0 });
        continue;
      }
      pdf.setFont("helvetica", fontStyle(run.bold, run.italic));
      tokens.push({ ...run, text: piece, width: pdf.getTextWidth(piece) });
    }
  }
  if (!tokens.length) return;

  let line: Token[] = [];
  let lineW = 0;
  let prefix = firstPrefix;

  const flush = () => {
    if (!line.length && !prefix) return;
    ensureRoom(ctx, PAGE.lineHeight);
    let x = left;
    if (prefix) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(size);
      pdf.text(prefix, PAGE.margin + Math.max(0, indent - 18), ctx.y);
      prefix = undefined;
    }
    // Adjacent tokens sharing a style and link are drawn as one span. Emitting
    // per token would stamp a separate link annotation on every word.
    let i = 0;
    while (i < line.length) {
      const head = line[i];
      let text = head.text;
      let width = head.width;
      let j = i + 1;
      while (
        j < line.length &&
        line[j].bold === head.bold &&
        line[j].italic === head.italic &&
        line[j].href === head.href
      ) {
        text += line[j].text;
        width += line[j].width;
        j++;
      }
      pdf.setFont("helvetica", fontStyle(head.bold, head.italic));
      pdf.setFontSize(size);
      if (head.href) pdf.textWithLink(text, x, ctx.y, { url: head.href });
      else pdf.text(text, x, ctx.y);
      x += width;
      i = j;
    }
    ctx.y += PAGE.lineHeight;
    line = [];
    lineW = 0;
  };

  for (const t of tokens) {
    if (t.text === "\n") {
      flush();
      continue;
    }
    const isSpace = /^\s+$/.test(t.text);
    if (isSpace && !line.length) continue; // never open a line with a space
    if (lineW + t.width > maxW && line.length) {
      // Drop a trailing space rather than carrying it to the next line.
      while (line.length && /^\s+$/.test(line[line.length - 1].text)) line.pop();
      flush();
      if (isSpace) continue;
    }
    line.push(t);
    lineW += t.width;
  }
  flush();
}

/** Sniffs a usable jsPDF image format; mammoth reports contentType as null for
 *  some documents, so the bytes are the only reliable signal. */
function imageFormat(dataUrl: string): "PNG" | "JPEG" | null {
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return null;
  let head: string;
  try {
    head = atob(dataUrl.slice(comma + 1, comma + 17));
  } catch {
    return null;
  }
  const b = (i: number) => head.charCodeAt(i);
  if (b(0) === 0x89 && b(1) === 0x50 && b(2) === 0x4e && b(3) === 0x47) return "PNG";
  if (b(0) === 0xff && b(1) === 0xd8 && b(2) === 0xff) return "JPEG";
  return null;
}

function drawImage(ctx: Ctx, el: Element) {
  const src = el.getAttribute("src") || "";
  const format = imageFormat(src);
  if (!format) {
    ctx.imagesSkipped++;
    return;
  }
  // The intrinsic size is not available without decoding, so scale by the
  // declared attributes when present and fall back to a readable default.
  const declaredW = Number(el.getAttribute("width")) || 0;
  const declaredH = Number(el.getAttribute("height")) || 0;
  let w = declaredW || ctx.contentW * 0.6;
  let h = declaredH || w * 0.75;
  if (w > ctx.contentW) {
    h = (h * ctx.contentW) / w;
    w = ctx.contentW;
  }
  const maxH = ctx.pageH - PAGE.margin * 2;
  if (h > maxH) {
    w = (w * maxH) / h;
    h = maxH;
  }
  ensureRoom(ctx, h + 6);
  try {
    ctx.pdf.addImage(src, format, PAGE.margin, ctx.y, w, h);
    ctx.y += h + 8;
    ctx.imagesEmbedded++;
  } catch {
    ctx.imagesSkipped++;
  }
}

function drawTable(ctx: Ctx, table: Element) {
  const { pdf } = ctx;
  const rows = Array.from(table.querySelectorAll("tr"));
  if (!rows.length) return;
  const spanOf = (c: Element) => Math.max(1, Number(c.getAttribute("colspan")) || 1);
  // A horizontally merged cell occupies several columns, so the grid width is
  // the widest row measured in columns rather than in cell count.
  const cols = Math.max(
    ...rows.map((r) => Array.from(r.querySelectorAll("td,th")).reduce((n, c) => n + spanOf(c), 0)),
  );
  if (!cols) return;

  const colW = ctx.contentW / cols;
  const pad = 4;
  const cellSize = 10;
  const cellLine = 13;
  ctx.tables++;

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("td,th"));
    const isHeader = cells.some((c) => c.tagName.toLowerCase() === "th");

    // Wrap every cell first so the row's height is known before anything is drawn.
    pdf.setFontSize(cellSize);
    pdf.setFont("helvetica", isHeader ? "bold" : "normal");
    let col = 0;
    const laid: { x: number; w: number; lines: string[] }[] = [];
    for (const cell of cells) {
      if (col >= cols) break;
      const span = Math.min(spanOf(cell), cols - col);
      const w = colW * span;
      const text = (cell.textContent || "").replace(/\s+/g, " ").trim();
      laid.push({
        x: PAGE.margin + col * colW,
        w,
        lines: text ? pdf.splitTextToSize(text, w - pad * 2) : [""],
      });
      col += span;
    }
    const rowH = Math.max(...laid.map((l) => l.lines.length)) * cellLine + pad * 2;

    ensureRoom(ctx, rowH);
    pdf.setDrawColor(190);
    pdf.setLineWidth(0.5);
    for (const cell of laid) {
      pdf.rect(cell.x, ctx.y, cell.w, rowH);
      pdf.setFont("helvetica", isHeader ? "bold" : "normal");
      pdf.setFontSize(cellSize);
      cell.lines.forEach((lineText, i) => {
        pdf.text(lineText, cell.x + pad, ctx.y + pad + cellLine * (i + 1) - 3);
      });
    }
    ctx.y += rowH;
  }
  ctx.y += 10;
}

function renderBlock(ctx: Ctx, el: Element, indent = 0) {
  const tag = el.tagName.toLowerCase();

  if (HEADING_STYLE[tag]) {
    const s = HEADING_STYLE[tag];
    ctx.y += s.before;
    const runs: Run[] = [];
    collectRuns(el, { bold: true, italic: false }, runs);
    drawRuns(ctx, runs, s.size, indent);
    ctx.y += s.after;
    return;
  }

  switch (tag) {
    case "p": {
      const runs: Run[] = [];
      collectRuns(el, { bold: false, italic: false }, runs);
      // A paragraph that exists only to hold an image carries no text.
      const img = el.querySelector("img");
      if (img && !runs.some((r) => r.text.trim())) {
        drawImage(ctx, img);
        return;
      }
      if (!runs.some((r) => r.text.trim())) {
        ctx.y += PAGE.lineHeight / 2;
        return;
      }
      drawRuns(ctx, runs, PAGE.bodySize, indent);
      ctx.y += 6;
      return;
    }
    case "ul":
    case "ol": {
      let n = 1;
      for (const li of Array.from(el.children)) {
        if (li.tagName.toLowerCase() !== "li") continue;
        const runs: Run[] = [];
        // Nested lists are rendered after the item's own text, one level deeper.
        const nested: Element[] = [];
        for (const child of Array.from(li.childNodes)) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const t = (child as Element).tagName.toLowerCase();
            if (t === "ul" || t === "ol") {
              nested.push(child as Element);
              continue;
            }
          }
          collectRuns(
            { childNodes: [child] } as unknown as Node,
            { bold: false, italic: false },
            runs,
          );
        }
        const marker = tag === "ol" ? `${n}.` : "•";
        drawRuns(ctx, runs, PAGE.bodySize, indent + 18, marker);
        ctx.y += 2;
        for (const sub of nested) renderBlock(ctx, sub, indent + 18);
        n++;
      }
      ctx.y += 6;
      return;
    }
    case "table":
      drawTable(ctx, el);
      return;
    case "img":
      drawImage(ctx, el);
      return;
    case "hr": {
      ensureRoom(ctx, 12);
      ctx.pdf.setDrawColor(200);
      ctx.pdf.setLineWidth(0.5);
      ctx.pdf.rect(PAGE.margin, ctx.y, ctx.contentW, 0);
      ctx.y += 12;
      return;
    }
    default: {
      // Unknown wrapper (div, section, blockquote…): descend into it.
      const kids = Array.from(el.children);
      if (kids.length) {
        for (const kid of kids) renderBlock(ctx, kid, indent);
        return;
      }
      const runs: Run[] = [];
      collectRuns(el, { bold: false, italic: false }, runs);
      if (runs.some((r) => r.text.trim())) {
        drawRuns(ctx, runs, PAGE.bodySize, indent);
        ctx.y += 6;
      }
    }
  }
}

export type DocxConversionResult = {
  blob: Blob;
  /** Counts surfaced so the panel can tell the user what actually happened. */
  stats: { tables: number; imagesEmbedded: number; imagesSkipped: number };
  /** mammoth's own warnings, e.g. an unrecognised style. */
  messages: string[];
};

/**
 * Converts a .docx ArrayBuffer into a PDF Blob.
 *
 * @throws if the file is not a readable .docx — mammoth rejects non-OOXML input.
 */
export async function convertDocxToPdf(data: ArrayBuffer): Promise<DocxConversionResult> {
  const mammoth = await import("mammoth");
  const { jsPDF } = await import("jspdf");

  const { value: html, messages } = await mammoth.convertToHtml(
    { arrayBuffer: data },
    {
      // Inline every image as a data URI so nothing is fetched over the network.
      convertImage: mammoth.images.imgElement(async (image) => {
        const base64 = await image.read("base64");
        const type = image.contentType || "image/png";
        return { src: `data:${type};base64,${base64}` };
      }),
    },
  );

  const pdf = new jsPDF({ unit: "pt", format: "a4" }) as unknown as Pdf;
  const ctx: Ctx = {
    pdf,
    y: PAGE.margin,
    contentW: pdf.internal.pageSize.getWidth() - PAGE.margin * 2,
    pageH: pdf.internal.pageSize.getHeight(),
    imagesEmbedded: 0,
    imagesSkipped: 0,
    tables: 0,
  };

  const body = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html").body;
  for (const el of Array.from(body.children)) renderBlock(ctx, el);

  const blob = pdf.output("blob");
  return {
    blob: new Blob([blob], { type: "application/pdf" }),
    stats: {
      tables: ctx.tables,
      imagesEmbedded: ctx.imagesEmbedded,
      imagesSkipped: ctx.imagesSkipped,
    },
    messages: (messages || []).map((m: { message: string }) => m.message),
  };
}
