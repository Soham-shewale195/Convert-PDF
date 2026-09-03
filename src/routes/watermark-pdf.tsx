import { createFileRoute } from "@tanstack/react-router";
import { Droplets, FileStack, Scissors, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WatermarkPdfPanel from "@/components/tools/WatermarkPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/watermark-pdf")({
  head: () => ({
    meta: [
      { title: "Watermark PDF Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Stamp any text across every page of a PDF for free. Preset styling, embedded into the page content, private and instant in your browser.",
      },
      { property: "og:title", content: "Watermark PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Stamp any text across every page of a PDF for free. Preset styling, embedded into the page content, private and instant in your browser.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/watermark-pdf" }],
  }),
  component: WatermarkPdfPage,
});

const watermarkSteps = [
  {
    title: "Upload your PDF",
    description:
      "Select or drop a single document. It loads into your browser's memory, and pdf-lib parses its structure there.",
  },
  {
    title: "Type your wording",
    description:
      'Replace the default "CONFIDENTIAL" with whatever you need. Keep it short — the styling is fixed and sized to the page, so a long phrase will run past the page edges. The text is the only decision to make.',
  },
  {
    title: "Apply and download",
    description:
      "Click to apply. The tool walks every page, draws your text over the existing content, and saves the result as a new file with -watermarked appended to the original name.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is PDF Watermarking?",
    paragraphs: [
      "A watermark is a visible stamp laid over every page of a document — CONFIDENTIAL, DRAFT, SAMPLE, a recipient's name — that signals status, ownership, or intended use. It does not restrict what anyone can do with the file. It sets the context in which the file is read, and it makes a leaked copy obviously identifiable as one.",
      "This tool writes your text directly into each page's content stream with pdf-lib, drawing it over whatever is already on the page. Because it becomes part of the page's drawing instructions rather than a separate annotation or optional layer, it cannot be hidden by switching layers off in a viewer. It is genuinely part of the page.",
      "The styling is deliberately not configurable. One preset — semi-transparent red, angled, and scaled to the page — is applied identically to every page, and your wording is the only input. That keeps the tool to a single decision, at the cost of any brand-specific control. The full specification is below so you know exactly what you are getting before you convert.",
    ],
  },
  {
    kind: "specTable",
    heading: "The Preset, in Full",
    intro:
      "Every value here is fixed in the tool and cannot be adjusted. If any of them does not suit your document, a desktop PDF editor is the better route:",
    columns: ["Property", "Fixed value"],
    rows: [
      {
        label: "Watermark text",
        value: "Your input. Defaults to CONFIDENTIAL. The only editable setting.",
      },
      {
        label: "Font",
        value: "Helvetica Bold, one of the standard fonts built into the PDF format.",
      },
      {
        label: "Font size",
        value: "One eighth of the page's shorter side, calculated per page.",
        note: "On portrait A4 that works out to roughly 74 points.",
      },
      { label: "Colour", value: "Red, at roughly 85% red with a little green and blue mixed in." },
      { label: "Opacity", value: "25%, so page content stays readable underneath." },
      { label: "Angle", value: "Rotated −35°, running upward from lower-left to upper-right." },
      {
        label: "Vertical position",
        value: "The text baseline sits at the exact vertical centre of the page.",
      },
      {
        label: "Horizontal position",
        value:
          "Estimated from the centre using your text's character count rather than measured glyph widths.",
        note: "An approximation, which is why long wording drifts and eventually overruns the page.",
      },
      { label: "Pages affected", value: "Every page in the document. There is no page selection." },
      { label: "Images or logos", value: "Not supported. Text only." },
      {
        label: "Output filename",
        value: "Your original name with -watermarked added — nda.pdf becomes nda-watermarked.pdf.",
      },
    ],
  },
  {
    kind: "steps",
    heading: "Stamping a Document",
    steps: watermarkSteps,
  },
  {
    kind: "callout",
    heading: "Secure Browser-Based Watermarking",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "The documents people watermark are exactly the ones they would least want to upload — NDAs, offer letters, unreleased financials, legal drafts. Nothing is uploaded here. The browser's File API reads your document into memory, pdf-lib parses its structure, and the drawText method writes your wording into each page's content stream, all locally.",
      "No third-party service is involved at any point. The pdf-lib library loads as a script file from this site the first time you use the tool, in the same way the rest of the page loads; the watermarking itself generates no network activity and your document is never transmitted. Closing the tab discards both the original and the stamped copy from memory.",
    ],
  },
  {
    kind: "troubleshooting",
    heading: "When the Stamp Comes Out Wrong",
    intro:
      "Almost every issue here comes from the fixed preset meeting text it was not sized for. These are the ones worth knowing about in advance:",
    items: [
      {
        problem: "My watermark runs off the sides of the page",
        cause:
          "Font size is derived from the page dimensions, not from how much text you typed, so the wording gets no smaller as it gets longer. The horizontal start point is also estimated from character count rather than measured width. Past roughly the length of the default CONFIDENTIAL, a portrait A4 page can no longer fit the text and it extends beyond both edges.",
        fix: 'Keep the wording short — single words like DRAFT, SAMPLE, or VOID work best, and a short phrase such as "NOT FINAL" is usually still safe. If you need a long line of text, a desktop PDF editor with adjustable sizing is the right tool.',
      },
      {
        problem: "The conversion fails with a generic error on non-Latin text",
        cause:
          "Helvetica Bold is a standard PDF font limited to the Latin-1 character set. Cyrillic, Greek, Arabic, Hebrew, and CJK characters have no glyphs available, so pdf-lib raises an error rather than drawing anything.",
        fix: "Use Latin characters for the watermark. Western European accented letters such as é, ï, ç and ü are fine; scripts outside Latin-1 are not supported by this tool.",
      },
      {
        problem: "The watermark sits slightly off-centre",
        cause:
          "Horizontal placement assumes every character is half the font size wide. Real Helvetica Bold glyphs vary, so wide letters push the text right of centre and narrow ones pull it left.",
        fix: "This is inherent to the preset and cannot be adjusted. In practice it is a small drift on short wording and only becomes obvious as the text gets longer.",
      },
      {
        problem: "I only want certain pages stamped",
        cause: "The watermark is applied to every page in a single pass, with no page selection.",
        fix: "Split the document into pages, watermark only the ones you need, then merge the pages back together.",
      },
      {
        problem: "The file will not load at all",
        cause:
          "A PDF encrypted with an open password cannot be parsed by the browser, so there is nothing for the tool to draw on.",
        fix: "Remove the password in your PDF software first, then apply the watermark.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "What a Watermark Is Good For",
    intro:
      "A watermark communicates status; it does not enforce it. These are the jobs it genuinely does well:",
    items: [
      {
        label: "Making draft status impossible to miss",
        description:
          "Stamping DRAFT across every page stops an interim version being quoted, signed, or circulated as though it were final — the most common and most useful case.",
      },
      {
        label: "Marking commercially sensitive documents",
        description:
          "CONFIDENTIAL across a financial model or a legal opinion sets an expectation about handling, and makes it obvious if a page turns up somewhere it should not.",
      },
      {
        label: "Identifying the source of a leak",
        description:
          "Generating one copy per recipient, each stamped with that recipient's name, means any circulated copy points back to who received it. Convert the same source file once per name.",
      },
      {
        label: "Labelling samples and portfolio pieces",
        description:
          "SAMPLE or SPECIMEN across template work and portfolio pages prevents it being passed off as delivered client work.",
      },
      {
        label: "Retiring superseded documents",
        description:
          "Stamping VOID or SUPERSEDED on an old version keeps it identifiable in an archive without deleting it, so the record stays intact but nobody acts on it by mistake.",
      },
      {
        label: "What it will not do",
        description:
          "A watermark is not a security control. It does not encrypt the file, prevent copying, or stop printing, and because the text sits in the page content stream, someone with a full PDF editor can select and delete it. Treat it as a label, not a lock.",
      },
    ],
  },
  {
    kind: "faq",
    heading: "Watermark PDF: Questions and Answers",
    faqs: [
      {
        question: "Can someone remove the watermark?",
        answer:
          "Someone determined and equipped can, yes. The text is embedded in the page's content stream, so it survives normal viewing, printing, and copying, and it cannot be switched off as a layer. But a full PDF editor can select and delete text objects. A watermark deters and labels; it does not protect.",
      },
      {
        question: "Will it cover up important content?",
        answer:
          "It is drawn at 25% opacity, so the page underneath stays legible through it. That opacity is fixed and not adjustable here.",
      },
      {
        question: "Can I change the colour, angle, size, or opacity?",
        answer:
          "No. The tool ships exactly one preset — red at 25% opacity, rotated −35°, sized to each page's shorter dimension — and your wording is the only input. For brand-specific styling you will need a desktop PDF editor.",
      },
      {
        question: "How long can the watermark text be?",
        answer:
          "Shorter than you might expect. The font size comes from the page size rather than the text length, so the wording never shrinks to fit. Much beyond the twelve characters of the default CONFIDENTIAL, a portrait A4 page cannot contain it and the text begins to extend past the page edges. Single words are the safest choice.",
      },
      {
        question: "Can I use a logo or image watermark?",
        answer:
          "No. This tool draws text only — there is no image upload. Your wording is rendered in the built-in Helvetica Bold font.",
      },
      {
        question: "Can I choose which pages get the watermark?",
        answer:
          "No, it is applied to every page in one pass. To stamp only some pages, split the PDF, watermark the pages you want, and merge them back together.",
      },
      {
        question: "Does it work with non-Latin text like Cyrillic or Chinese?",
        answer:
          "No. Helvetica Bold covers the Latin-1 character set only. Accented Western European characters work, but Cyrillic, Greek, Arabic, and CJK text causes the operation to fail with a generic error rather than producing a watermark.",
      },
      {
        question: "Will the file get bigger?",
        answer:
          "Barely. The watermark adds a short set of drawing instructions per page, and Helvetica Bold is a standard PDF font that does not need embedding, so there is very little data to add.",
      },
      {
        question: "Can I watermark a password-protected PDF?",
        answer:
          "No. If the document is encrypted with an open password the browser cannot parse it. Remove the password in your PDF software first.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Working Around the Preset",
    tools: [
      {
        name: "Split PDF",
        href: "/split-pdf",
        description: "Separate pages first when only some of them should carry the stamp.",
        icon: Scissors,
        accent: "from-pink-500 to-rose-500",
      },
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description: "Reassemble the document after watermarking selected pages.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        name: "Compress PDF",
        href: "/compress-pdf",
        description: "Shrink the stamped document before sending it out.",
        icon: Minimize2,
        accent: "from-emerald-500 to-teal-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "More on Document Marking",
    slugs: ["how-to-watermark-pdf-documents", "risks-of-online-file-converters"],
  },
];

const howToSteps = watermarkSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function WatermarkPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Add a Watermark to a PDF" steps={howToSteps} />
      <ToolPageLayout
        title="Watermark PDF"
        description="Stamp short text across every page — one fixed style, no configuration."
        icon={Droplets}
        accent="from-cyan-500 to-blue-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <WatermarkPdfPanel />
      </ToolPageLayout>
    </>
  );
}
