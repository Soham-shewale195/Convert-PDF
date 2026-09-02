import { createFileRoute } from "@tanstack/react-router";
import { Scissors, FileStack, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import SplitPdfPanel from "@/components/tools/SplitPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/split-pdf")({
  head: () => ({
    meta: [
      { title: "Split PDF Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Split a PDF into individual pages online for free. Each page is saved as a separate file and packaged in a ZIP — all processed in your browser.",
      },
      { property: "og:title", content: "Split PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Split a PDF into individual pages online for free. Each page is saved as a separate file and packaged in a ZIP.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/split-pdf" }],
  }),
  component: SplitPdfPage,
});

const splitSteps = [
  {
    title: "Upload one PDF",
    description:
      "Drop your multi-page PDF onto the upload area or click to browse. The splitter works on a single document at a time — if you select several files, only the first is kept.",
  },
  {
    title: "Split into pages",
    description:
      "Click \"Split into pages\". The tool reads the document's page count and loops through every page, building a separate one-page PDF for each and preserving that page's original formatting, dimensions, and orientation.",
  },
  {
    title: "Download and unzip",
    description:
      "Every page file is bundled into one ZIP archive named after your source document. The whole split finishes before the download starts, so you receive the complete set in a single file — extract it and take the pages you need.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is PDF Splitting?",
    paragraphs: [
      "PDF splitting breaks a multi-page document into separate files — one PDF per page. This tool always produces exactly as many output files as the source has pages. A 35-page document yields 35 files, never a subset and never a consolidated range. The result is a complete set of isolated pages, which you can then use, share, or reassemble however you like.",
      "Mechanically, the tool loads your PDF with pdf-lib, reads the total page count, and loops from the first page to the last. For each page it creates a brand-new empty document, copies that single page into it, and serialises the result. Those files are then packed into one ZIP archive by JSZip and handed to your browser as a single download.",
      "Every page is copied rather than redrawn, so text stays selectable, images keep their original encoding, and no page is rescaled or reformatted. A landscape A4 page comes out as a landscape A4 page; a custom-sized slide keeps its exact dimensions.",
    ],
  },
  {
    kind: "decision",
    heading: "Is the Splitter the Tool You Need?",
    intro:
      "Splitting is frequently confused with page extraction. Since this tool has exactly one behaviour — every page becomes its own file — it is worth checking that the behaviour matches your goal before you start:",
    branches: [
      {
        condition: "You want every page as a separate, individually shareable file.",
        recommendation: "This is exactly what the splitter does. Upload and go.",
      },
      {
        condition: "You want a consecutive range — say pages 5 to 12 — as one combined PDF.",
        recommendation:
          "The splitter cannot produce that directly. Split the document first, then combine page-5.pdf through page-12.pdf into a single file with",
        href: "/merge-pdf",
        linkLabel: "Merge PDF",
      },
      {
        condition: "You want to delete a few pages and keep the document otherwise intact.",
        recommendation:
          "Split it, discard the page files you do not want, and reassemble the remainder with",
        href: "/merge-pdf",
        linkLabel: "Merge PDF",
      },
      {
        condition: "You only want the document to be smaller, and the page structure is fine.",
        recommendation: "Splitting will not help. Reduce the file size instead with",
        href: "/compress-pdf",
        linkLabel: "Compress PDF",
      },
      {
        condition: "Some pages are sideways or upside down.",
        recommendation:
          "Fix the orientation before splitting, so each page file comes out correct.",
        href: "/rotate-pdf",
        linkLabel: "Rotate PDF",
      },
    ],
  },
  {
    kind: "steps",
    heading: "How to Split a PDF",
    steps: splitSteps,
  },
  {
    kind: "definitions",
    heading: "What You Get in the Download",
    intro:
      "The output is a single ZIP rather than a series of separate downloads. Here is what is inside it and how it is labelled:",
    terms: [
      {
        term: "One ZIP archive, named after your file",
        definition:
          "The archive takes your original filename with -pages appended, so contract.pdf produces contract-pages.zip. Only the archive is downloaded; your source PDF is never modified.",
      },
      {
        term: "page-1.pdf, page-2.pdf, page-3.pdf …",
        definition:
          "Each page file is numbered sequentially and 1-indexed, so page-1.pdf is the first page of the document. The numbering always matches the source document's own page order.",
      },
      {
        term: "One page per file, always",
        definition:
          "Each output PDF contains exactly one page. There is no option to group pages, and the count of files always equals the source page count.",
      },
      {
        term: "Original formatting, carried across",
        definition:
          "Text, fonts, vector graphics, embedded images, and annotations are copied straight from the source. Nothing is re-rendered or re-encoded, so there is no quality loss.",
      },
      {
        term: "Built entirely before the download begins",
        definition:
          "The tool completes every page and finishes zipping before your browser is offered the file, which is why a long document takes a moment before the download appears.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Secure Page Extraction",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Your browser handles every step locally. The File API reads the document into memory, pdf-lib parses its structure and copies each page into a new document, and JSZip bundles the results into a downloadable archive — all inside the browser's sandboxed JavaScript environment. Your document is never uploaded, including during the ZIP generation step.",
      "There are no server-side queues, no temporary cloud storage, and no logging of your file contents or page count. When the document holds confidential material — personnel records, financial statements, legal filings — every page stays on your machine for the whole operation, and closing the tab releases the in-memory data immediately.",
    ],
  },
  {
    kind: "faq",
    heading: "Split PDF: Questions and Answers",
    faqs: [
      {
        question: "Can I choose a page range instead of splitting everything?",
        answer:
          "No. The tool always splits every page, producing one output PDF per page from the first through the last. To end up with a specific range as a single document, split the whole file and then use the Merge PDF tool to recombine just the page files you need.",
      },
      {
        question: "Does splitting reduce the quality of individual pages?",
        answer:
          "No. Each page is copied directly out of the original document rather than re-rendered. Text, images, fonts, vector graphics, and annotations are preserved exactly as they appear in the source, and no re-encoding takes place.",
      },
      {
        question: "What format is the download?",
        answer:
          "A single ZIP file containing one PDF per page. The page files are named sequentially from page-1.pdf, and the archive itself is named after your original document — report.pdf becomes report-pages.zip. Extract it to reach the individual pages.",
      },
      {
        question: "Is there a limit on the number of pages I can split?",
        answer:
          "There is no page limit built into the tool. Memory sets the real boundary: the source document is read into RAM before splitting starts, and each page produced stays there until the ZIP is assembled. Very large documents on low-memory devices are where you would notice this.",
      },
      {
        question: "Will the split pages keep their original size and orientation?",
        answer:
          "Yes. Every extracted page keeps the exact dimensions, orientation, and content box of the original. A landscape A4 page stays landscape A4, and a custom-sized slide keeps its dimensions. Nothing is rescaled or reformatted.",
      },
      {
        question: "Can I split a password-protected PDF?",
        answer:
          "No. If the PDF requires a password to open, the browser cannot read its contents and the split will fail. Remove the password protection in your PDF software first, then split.",
      },
      {
        question: "Can I split more than one document at a time?",
        answer:
          "No — the splitter takes a single file. If you select multiple files, only the first one is used. Split each document in a separate pass.",
      },
      {
        question: "Does anything get uploaded while the ZIP is being built?",
        answer:
          "No. Both the page extraction and the ZIP packaging run in JavaScript inside your browser. No part of the document is transmitted at any stage, and the archive is assembled in local memory before the download is offered.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Where to Go After Splitting",
    tools: [
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description:
          "Reassemble the page files you kept into a new document — the standard way to reorder or remove pages.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        name: "Compress PDF",
        href: "/compress-pdf",
        description:
          "Shrink the source document before splitting to keep each resulting page file smaller.",
        icon: Minimize2,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        name: "Rotate PDF",
        href: "/rotate-pdf",
        description:
          "Correct page orientation before splitting so every extracted page is right way up.",
        icon: RotateCw,
        accent: "from-amber-500 to-orange-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Guides on Working With Pages",
    slugs: ["how-to-split-pdf-pages", "digital-document-workflow-students"],
  },
];

const howToSteps = splitSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function SplitPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Split a PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Split PDF"
        description="Extract every page into its own PDF file, packaged in a single ZIP download."
        icon={Scissors}
        accent="from-pink-500 to-rose-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <SplitPdfPanel />
      </ToolPageLayout>
    </>
  );
}
