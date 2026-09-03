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
          "Split a PDF into one file per page, or extract only the pages you name — 1-3, 5, 8-10. Everything arrives as a single ZIP, built in your browser.",
      },
      { property: "og:title", content: "Split PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Split a PDF into one file per page, or extract only the pages you name — 1-3, 5, 8-10. Everything arrives as a single ZIP, built in your browser.",
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
    title: "Choose a split mode",
    description:
      'Leave it on "Every page" to get one PDF per page across the whole document, or switch to "Custom pages" and type the pages you want — for example 1-3, 5, 8-10. Either way, each page keeps its original formatting, dimensions, and orientation.',
  },
  {
    title: "Download and unzip",
    description:
      "Every file the run produced is bundled into one ZIP archive named after your source document. The whole operation finishes before the download starts, so you receive the complete set in a single file — extract it and take what you need.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is PDF Splitting?",
    paragraphs: [
      "PDF splitting breaks a multi-page document into separate files, and this tool offers two ways to do it. Every page produces exactly as many output files as the source has pages — a 35-page document yields 35 files. Custom pages lets you type only the pages you actually want, such as 1-3, 5, 8-10, and extracts just those. Either mode hands you a single ZIP containing the results.",
      "The grouping rule in Custom pages mode is worth understanding before you type anything, because it decides how many files come back. Each comma-separated group becomes one output PDF, so a range stays a single document: entering 1-3, 5, 8-10 produces three files — pages-1-3.pdf holding three pages, page-5.pdf holding one, and pages-8-10.pdf holding three. If you would rather have each page on its own, list them individually instead, since 1,2,3 produces three separate one-page files. Ranges are inclusive and numbered from 1.",
      "Mechanically, the tool loads your PDF with pdf-lib and reads the total page count. Every page mode loops from the first page to the last, creating a new empty document each time and copying one page into it. Custom pages mode calls the same copy operation but passes a whole run of page indices at once, which is why a range arrives as one multi-page document. The resulting files are packed into a ZIP by JSZip and handed to your browser as a single download.",
      "Pages are copied rather than redrawn in both modes, so text stays selectable, images keep their original encoding, and nothing is rescaled or reformatted. A landscape A4 page comes out as a landscape A4 page; a custom-sized slide keeps its exact dimensions.",
    ],
  },
  {
    kind: "decision",
    heading: "Which Mode Do You Need?",
    intro:
      "The two modes cover different jobs, and the grouping rule means the same pages can arrive as one file or several depending on how you type them. Find the row that matches your goal:",
    branches: [
      {
        condition: "You want every page as a separate, individually shareable file.",
        recommendation:
          'Leave the mode on "Every page". You get one PDF per page, named page-1.pdf upward.',
      },
      {
        condition: "You want a consecutive range — say pages 5 to 12 — as one combined PDF.",
        recommendation:
          'Switch to "Custom pages" and enter 5-12. The range stays together as a single eight-page document, so there is no reassembly step.',
      },
      {
        condition: "You want particular pages, each as its own file.",
        recommendation:
          "Use Custom pages but list them separately rather than as a range: 1,2,3 gives three one-page files, where 1-3 would give one file of three pages.",
      },
      {
        condition: "You want to reorder pages, or pull pages from several different documents.",
        recommendation:
          "Splitting cannot reorder anything on its own. Extract what you need here, then assemble it in the order you want with",
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
          "Fix the orientation before splitting, so each extracted page comes out correct.",
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
          "In Every page mode each file is numbered sequentially and 1-indexed, so page-1.pdf is the first page of the document. The numbering always matches the source document's own page order.",
      },
      {
        term: "page-5.pdf and pages-8-10.pdf",
        definition:
          "In Custom pages mode the filename reflects what the group holds. A single page becomes page-5.pdf; a range becomes pages-8-10.pdf and contains all three pages. The numbers always refer to positions in the original document.",
      },
      {
        term: "One file per group, not per page",
        definition:
          "In Custom pages mode the number of files equals the number of comma-separated groups you typed, not the number of pages you selected. Typing the same group twice still produces one file rather than a duplicate.",
      },
      {
        term: "Original formatting, carried across",
        definition:
          "Text, fonts, vector graphics, embedded images, and annotations are copied straight from the source. Nothing is re-rendered or re-encoded, so there is no quality loss.",
      },
      {
        term: "Built entirely before the download begins",
        definition:
          "The tool completes every file and finishes zipping before your browser is offered the archive, which is why a long document takes a moment before the download appears.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Secure Page Extraction",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Your browser handles every step locally. The File API reads the document into memory, pdf-lib parses its structure and copies the pages you asked for into new documents, and JSZip bundles the results into a downloadable archive — all inside the browser's sandboxed JavaScript environment. Your document is never uploaded, including during the ZIP generation step.",
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
          "Yes. Every page mode creates one output PDF for each page, from the first through to the last. Custom pages mode lets you type exactly what you want — 1-3, 5, 8-10 — and each comma-separated group becomes one PDF, so pages 1-3 arrive as a single three-page document rather than three separate files. To get them separately instead, list the pages individually as 1,2,3.",
      },
      {
        question: "What happens if I type a page that does not exist?",
        answer:
          "The tool checks your selection against the document's real page count before it starts, and tells you which page was out of range rather than producing a partial ZIP. Backwards ranges, numbers below 1, and text it cannot read are all caught at the same point, so nothing runs until the selection makes sense.",
      },
      {
        question: "Does splitting reduce the quality of individual pages?",
        answer:
          "No. Each page is copied directly out of the original document rather than re-rendered. Text, images, fonts, vector graphics, and annotations are preserved exactly as they appear in the source, and no re-encoding takes place.",
      },
      {
        question: "What format is the download?",
        answer:
          "A single ZIP file, named after your original document — report.pdf becomes report-pages.zip. Inside, Every page mode gives you page-1.pdf upward, one per page. Custom pages mode names each file after the group it holds, so a single page is page-5.pdf and a range is pages-8-10.pdf. Extract the archive to reach them.",
      },
      {
        question: "Is there a limit on the number of pages I can split?",
        answer:
          "There is no page limit built into the tool. Memory sets the real boundary: the source document is read into RAM before splitting starts, and each file produced stays there until the ZIP is assembled. Very large documents on low-memory devices are where you would notice this.",
      },
      {
        question: "Will the split pages keep their original size and orientation?",
        answer:
          "Yes. Every extracted page keeps the exact dimensions, orientation, and content box of the original. A landscape A4 page stays landscape A4, and a custom-sized slide keeps its dimensions. Nothing is rescaled or reformatted.",
      },
      {
        question: "Can I split a password-protected PDF?",
        answer:
          "No. Encrypted PDFs are detected as the file loads and the tool stops with a message naming the file, rather than failing partway through. This applies to any encryption, including documents that open without a password but carry permission restrictions such as print-only. Remove the password or the restrictions in your PDF software, then upload the unprotected copy.",
      },
      {
        question: "Can I split more than one document at a time?",
        answer:
          "No — the splitter takes a single file. If you select multiple files, only the first one is used. Split each document in a separate pass; you can start another straight afterwards without reloading the page.",
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
          "Reassemble the files you extracted into a new document — the standard way to reorder pages or combine sources.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        name: "Compress PDF",
        href: "/compress-pdf",
        description:
          "Shrink the source document before splitting to keep each resulting file smaller.",
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
        description="Extract every page, or just the pages you choose, packaged in a single ZIP download."
        icon={Scissors}
        accent="from-pink-500 to-rose-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <SplitPdfPanel />
      </ToolPageLayout>
    </>
  );
}
