/**
 * Word (.docx) to PDF — "Faithful" mode.
 *
 * A deliberately different pipeline from the "Fast" renderer in
 * `docx-to-pdf.ts`, which is left completely untouched. Where that one reads
 * the document's *semantics* through mammoth and redraws them with jsPDF text
 * primitives, this one reproduces the document's *appearance*:
 *
 *   docx-preview  →  real HTML/CSS layout, off-screen
 *   modern-screenshot →  one raster per paginated page
 *   jsPDF          →  one image per page, at the document's own page size
 *
 * The trade is stated plainly on the tool page: the output is an image of each
 * page, so its text is neither selectable nor searchable and the file is
 * larger. In exchange, fonts, colours, sizes, alignment, tables, images and
 * headers/footers come through as Word lays them out.
 *
 * Font caveat worth understanding, because it bounds what this can promise:
 * docx-preview *does* deobfuscate ODTTF fonts genuinely embedded in the .docx
 * and inject them as @font-face rules, so those render correctly anywhere. A
 * font that is merely *referenced* — the usual case, since Word does not embed
 * fonts by default — resolves to whatever the viewing device has, and is
 * substituted when it has nothing matching.
 */

/** Rasterisation scale. Higher is sharper and heavier; 3x on A4 lands around
 *  2380x3370 px, comfortably inside every browser's canvas limits. */
const DEFAULT_SCALE = 3;
/** Above this many pixels per page, step down a notch rather than risk the
 *  browser silently handing back a blank canvas. */
const MAX_PAGE_PIXELS = 30_000_000;
/** CSS pixels are 1/96 in; PDF points are 1/72 in. */
const PX_TO_PT = 72 / 96;

export type FaithfulResult = {
  blob: Blob;
  stats: {
    pages: number;
    /** Page size in points, as taken from the document's own section setup. */
    pageSize: { width: number; height: number };
    scale: number;
    /** Font families the rendered document actually asked for. */
    fonts: string[];
    /** Families backed by a font embedded in the .docx itself. */
    embeddedFonts: string[];
  };
};

export type FaithfulProgress = (percent: number, message: string) => void;

/** Waits for webfonts and images so nothing is captured mid-load. */
async function waitForAssets(root: HTMLElement) {
  // @font-face rules from embedded fonts resolve asynchronously; capturing
  // before they land would rasterise fallback glyphs instead.
  if (document.fonts?.ready) await document.fonts.ready;

  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
    ),
  );
  // One more frame so layout settles after fonts swap in.
  await new Promise<void>((r) => requestAnimationFrame(() => r()));
}

/* ------------------------------------------------------------------ */
/*  page-number fields                                                  */
/* ------------------------------------------------------------------ */

/**
 * One header/footer part, reduced to the literal text runs it contains and the
 * positions where a page-number field sits between them.
 *
 * docx-preview parses PAGE / NUMPAGES fields but renders nothing for them,
 * because Word stores no cached result — it computes the number when it opens
 * the file. Rendering therefore produces "Page " + " of " with a hole in the
 * middle, and the hole has no element to fill. So the source XML is read to
 * learn where the fields were, and the numbers are inserted before capture.
 */
type ChromePlan = {
  /** Literal run texts, in order. Used to identify the rendered element. */
  literals: string[];
  /** Field insertions, keyed by how many literal runs precede them. */
  fields: { afterLiteral: number; kind: "page" | "pages" }[];
};

/**
 * Word only hyphenates when a document opts in via `w:autoHyphenation`, and the
 * default is off. docx-preview sets `hyphens: auto` regardless, which breaks
 * justified paragraphs across a hyphen where Word would not, so the document's
 * own setting is read and honoured.
 */
async function documentHyphenates(data: ArrayBuffer): Promise<boolean> {
  try {
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(data);
    const settings = zip.files["word/settings.xml"];
    if (!settings) return false;
    const xml = await settings.async("string");
    const dom = new DOMParser().parseFromString(xml, "application/xml");
    const el = dom.getElementsByTagName("w:autoHyphenation")[0];
    if (!el) return false;
    const val = el.getAttribute("w:val");
    return val == null || val === "true" || val === "1" || val === "on";
  } catch {
    return false;
  }
}

async function readChromePlans(data: ArrayBuffer): Promise<ChromePlan[]> {
  try {
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(data);
    const parts = Object.keys(zip.files).filter((n) => /^word\/(header|footer)\d*\.xml$/i.test(n));

    const plans: ChromePlan[] = [];
    for (const part of parts) {
      const xml = await zip.files[part].async("string");
      const dom = new DOMParser().parseFromString(xml, "application/xml");
      const runs = Array.from(dom.getElementsByTagName("w:r"));

      const literals: string[] = [];
      const fields: ChromePlan["fields"] = [];

      for (const run of runs) {
        const instr = run.getElementsByTagName("w:instrText")[0]?.textContent ?? "";
        if (/\bNUMPAGES\b/i.test(instr)) {
          fields.push({ afterLiteral: literals.length, kind: "pages" });
          continue;
        }
        if (/\bPAGE\b/i.test(instr)) {
          fields.push({ afterLiteral: literals.length, kind: "page" });
          continue;
        }
        // A run holding only field marks contributes no visible text.
        const t = run.getElementsByTagName("w:t")[0]?.textContent;
        if (t != null) literals.push(t);
      }

      if (fields.length && literals.length) plans.push({ literals, fields });
    }
    return plans;
  } catch {
    // A malformed package should degrade to "no numbers", never break the run.
    return [];
  }
}

/**
 * Fills page-number fields inside one rendered page's header/footer elements.
 * A plan is only applied when its literal runs match the rendered spans exactly,
 * so a mismatch leaves the output untouched rather than corrupting it.
 */
function applyChromePlans(
  section: HTMLElement,
  plans: ChromePlan[],
  pageNumber: number,
  pageCount: number,
): number {
  let filled = 0;

  for (const chrome of Array.from(section.querySelectorAll<HTMLElement>("header, footer"))) {
    for (const para of Array.from(chrome.querySelectorAll<HTMLElement>("p"))) {
      const spans = Array.from(para.children).filter(
        (c): c is HTMLElement => c instanceof HTMLElement,
      );
      const texts = spans.map((s) => s.textContent ?? "");

      const plan = plans.find(
        (p) => p.literals.length === texts.length && p.literals.every((lit, i) => lit === texts[i]),
      );
      if (!plan) continue;

      // Insert from the back so earlier indices stay valid.
      for (const field of [...plan.fields].sort((a, b) => b.afterLiteral - a.afterLiteral)) {
        const value = String(field.kind === "pages" ? pageCount : pageNumber);
        const span = document.createElement("span");
        span.textContent = value;
        // Inherit the neighbouring run's styling so the number matches its
        // surroundings in weight, size and colour.
        const model = spans[Math.max(0, field.afterLiteral - 1)];
        if (model) span.setAttribute("style", model.getAttribute("style") ?? "");
        para.insertBefore(span, spans[field.afterLiteral] ?? null);
        filled++;
      }
    }
  }
  return filled;
}

/** Reads the families docx-preview asked for, and which came from the file. */
function collectFonts(root: HTMLElement): { fonts: string[]; embedded: string[] } {
  const fonts = new Set<string>();
  const embedded = new Set<string>();

  for (const el of Array.from(root.querySelectorAll<HTMLElement>("*"))) {
    const ff = getComputedStyle(el).fontFamily;
    if (ff) {
      for (const part of ff.split(",")) {
        const name = part.trim().replace(/^["']|["']$/g, "");
        if (name && !/^(serif|sans-serif|monospace|cursive|fantasy)$/i.test(name)) fonts.add(name);
      }
    }
  }

  // docx-preview emits one @font-face per embedded font reference.
  for (const styleEl of Array.from(root.querySelectorAll("style"))) {
    const css = styleEl.textContent || "";
    for (const m of css.matchAll(/@font-face\s*{[^}]*font-family:\s*([^;]+);/g)) {
      embedded.add(m[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  return { fonts: [...fonts].sort(), embedded: [...embedded].sort() };
}

export async function convertDocxToPdfFaithful(
  data: ArrayBuffer,
  onProgress?: FaithfulProgress,
): Promise<FaithfulResult> {
  const docxPreview = await import("docx-preview");
  // modern-screenshot rather than html2canvas-pro: the latter reflows the DOM
  // during its clone step and lost `text-align: justify`, breaking justified
  // paragraphs mid-word even though the source DOM was measurably correct.
  const { domToCanvas } = await import("modern-screenshot");
  const { jsPDF } = await import("jspdf");

  onProgress?.(10, "Laying the document out...");

  // Rendered off-screen rather than hidden: the rasteriser needs real layout, so
  // display:none or visibility:hidden would produce an empty capture.
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  Object.assign(host.style, {
    position: "fixed",
    left: "-100000px",
    top: "0",
    width: "fit-content",
    background: "#ffffff",
    pointerEvents: "none",
    zIndex: "-1",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(host);

  try {
    await docxPreview.renderAsync(new Blob([data]), host, undefined, {
      inWrapper: true,
      breakPages: true,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
      // Honour the pagination hints Word recorded, so page breaks land where
      // Word put them. The library ignores these by default, which would
      // re-flow the document and defeat the point of this mode.
      ignoreLastRenderedPageBreak: false,
      // Inline assets as data URLs. Blob URLs do not reliably survive
      // the rasteriser's document clone, and data URLs cannot taint a canvas.
      useBase64URL: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreFonts: false,
    });

    onProgress?.(30, "Waiting for fonts and images...");
    await waitForAssets(host);

    const { fonts, embedded } = collectFonts(host);

    // docx-preview emits one <section> per paginated page.
    const pages = Array.from(host.querySelectorAll<HTMLElement>("section"));
    if (!pages.length) throw new Error("The document produced no pages to render.");

    // Match Word's own hyphenation behaviour rather than the library's default.
    if (!(await documentHyphenates(data))) {
      for (const page of pages) page.style.hyphens = "none";
    }

    // Page-number fields carry no rendered text, so fill them in before capture.
    const chromePlans = await readChromePlans(data);
    let fieldsFilled = 0;
    if (chromePlans.length) {
      pages.forEach((page, i) => {
        fieldsFilled += applyChromePlans(page, chromePlans, i + 1, pages.length);
      });
    }

    const firstRect = pages[0].getBoundingClientRect();
    const pageWpt = firstRect.width * PX_TO_PT;
    const pageHpt = firstRect.height * PX_TO_PT;

    let pdf: InstanceType<typeof jsPDF> | null = null;
    let usedScale = DEFAULT_SCALE;

    for (let i = 0; i < pages.length; i++) {
      const el = pages[i];
      const rect = el.getBoundingClientRect();

      // Step the scale down rather than let a huge page blow the canvas limit.
      let scale = DEFAULT_SCALE;
      while (scale > 1 && rect.width * scale * rect.height * scale > MAX_PAGE_PIXELS) scale -= 0.5;
      usedScale = Math.min(usedScale, scale);

      const canvas = await domToCanvas(el, {
        scale,
        backgroundColor: "#ffffff",
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        // Fonts are already resolved in the live document; re-fetching and
        // re-embedding them would only risk a different substitution.
        font: false,
      });

      const image = canvas.toDataURL("image/jpeg", 0.92);
      const wPt = rect.width * PX_TO_PT;
      const hPt = rect.height * PX_TO_PT;
      const orientation = wPt > hPt ? "landscape" : "portrait";

      if (!pdf) {
        pdf = new jsPDF({ unit: "pt", format: [wPt, hPt], orientation });
      } else {
        // Page sizes can legitimately vary between sections.
        pdf.addPage([wPt, hPt], orientation);
      }
      pdf.addImage(image, "JPEG", 0, 0, wPt, hPt);

      onProgress?.(
        30 + Math.round(((i + 1) / pages.length) * 65),
        `Rendering page ${i + 1} of ${pages.length}...`,
      );
    }

    onProgress?.(100, "Done");
    const raw = pdf!.output("blob");

    return {
      blob: new Blob([raw], { type: "application/pdf" }),
      stats: {
        pages: pages.length,
        pageSize: { width: Math.round(pageWpt), height: Math.round(pageHpt) },
        scale: usedScale,
        fonts,
        embeddedFonts: embedded,
      },
    };
  } finally {
    host.remove();
  }
}
