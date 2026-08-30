import { createFileRoute } from "@tanstack/react-router";
import { FileStack, Scissors, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import MergePdfPanel from "@/components/tools/MergePdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/merge-pdf")({
  head: () => ({
    meta: [
      { title: "Merge PDF Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Combine multiple PDF files into one document online for free. Browser-based, private, and instant — no uploads required.",
      },
      { property: "og:title", content: "Merge PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Combine multiple PDF files into one document online for free. Browser-based, private, and instant — no uploads required.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/merge-pdf" }],
  }),
  component: MergePdfPage,
});

const mergeSteps = [
  {
    title: "Select every file in one go",
    description:
      "Drop your PDFs onto the upload area, or click to browse and multi-select them. Choosing files a second time replaces the current list rather than adding to it, so pick everything you want to combine in a single selection. The tool needs at least two files before the merge button becomes active.",
  },
  {
    title: "Check the numbered list",
    description:
      "Each file appears with a position number, its filename, and its size in megabytes. That numbering is the merge order. Read it top to bottom and confirm it matches the document you are trying to build before continuing.",
  },
  {
    title: "Merge and download",
    description:
      'Click "Merge & prepare". The tool creates one new empty PDF, copies every page of file 1 into it, then every page of file 2, and so on, then hands the finished document to your browser as a download named merged.pdf.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Merging Actually Does to Your Pages",
    paragraphs: [
      "PDF merging combines two or more separate PDF files into a single unified document. Instead of sending a colleague five separate attachments, you assemble them into one clean file. Instead of distributing five chapters individually, you consolidate them into a complete manuscript that opens from the first page to the last in continuous sequence.",
      "The mechanism is a straight sequential copy. The tool creates a brand-new, empty PDF document, then walks your file list from top to bottom. For each source file it copies every page — the full page index range, in the source document's own internal order — and appends those pages to the new document one after another. Nothing is re-rendered, re-encoded, or reflowed along the way; each page arrives in the output exactly as it existed in its source file.",
      "That design has one consequence worth understanding before you start: the merger is all-or-nothing per file. There is no page picker. If a source file has twenty pages and you only want three of them, the merger will still copy all twenty. Splitting that file first is the way around it, and the walkthrough below covers the sequence.",
    ],
  },
  {
    kind: "steps",
    heading: "Combining Files, Step by Step",
    variant: "timeline",
    steps: mergeSteps,
  },
  {
    kind: "specTable",
    heading: "What Carries Over, and What Doesn't",
    intro:
      "Because merging copies pages rather than rebuilding them, most of your document survives untouched. A few things behave differently once pages from several files share one document:",
    columns: ["Element", "Behaviour in the merged file"],
    rows: [
      {
        label: "Text and fonts",
        value:
          "Preserved exactly. Pages are copied as-is, so no text is re-flowed and no font is substituted or re-embedded.",
      },
      {
        label: "Images and vector graphics",
        value:
          "Preserved exactly. The merger performs no image re-encoding, so there is no quality loss at any stage.",
      },
      {
        label: "Page size and orientation",
        value:
          "Preserved per page. Mixing A4 portrait and A3 landscape sources produces a document where each page keeps its own dimensions.",
        note: "The merger never normalises pages to a common size.",
      },
      {
        label: "Page order",
        value:
          "All pages of file 1, then all pages of file 2, and so on — following the numbered file list top to bottom.",
      },
      {
        label: "Links within a single source file",
        value: "Preserved. A link that pointed to another page of its own document still resolves.",
      },
      {
        label: "Cross-document bookmarks",
        value:
          "Not reconnected. A table of contents in one source file cannot link into pages that came from a different source file, because page positions change during the copy.",
      },
      {
        label: "Password-protected files",
        value:
          "Not supported. If a PDF needs a password to open, the browser cannot read it and the merge fails. Remove the protection first.",
      },
    ],
  },
  {
    kind: "troubleshooting",
    heading: "Common Merge Problems",
    intro:
      "Most merge issues come down to two things: the order files arrive in, and the fact that every page of every file gets copied. Here is how to handle both.",
    items: [
      {
        problem: "The pages came out in the wrong order",
        cause:
          "The merge order is simply the order your browser handed the files to the page when you selected or dropped them. The file list is a read-only summary — it shows position numbers and a remove button, but it has no drag-to-reorder control, so the sequence cannot be rearranged after the fact.",
        fix: "Remove the files and select them again in the order you want. The most reliable approach for a sequence that matters is to prefix the filenames so they sort predictably — 01-cover.pdf, 02-scope.pdf, 03-pricing.pdf — and then select them all at once.",
      },
      {
        problem: "Files I added earlier disappeared from the list",
        cause:
          "Each new selection or drop replaces the whole list rather than appending to it, so a second batch overwrites the first.",
        fix: "Select every file you want to merge in one single multi-select or one single drop.",
      },
      {
        problem: "I only wanted a few pages from one of the files",
        cause:
          "The merger copies the complete page range of each source document. It has no facility for choosing pages from within a file.",
        fix: "Run that file through the Split PDF tool first to get one PDF per page, then merge only the page files you actually want alongside your other documents.",
      },
      {
        problem: "The merge button stays greyed out",
        cause:
          "Merging requires a minimum of two files; with one file there is nothing to combine.",
        fix: "Add at least one more PDF. If you only need to shrink or reorient a single document, use the Compress PDF or Rotate PDF tool instead.",
      },
      {
        problem: "The merged file is about as large as all the originals put together",
        cause:
          "That is expected. Merging copies page content verbatim, so the output is roughly the sum of its inputs — sometimes marginally smaller where shared resources get consolidated.",
        fix: "Run the merged document through the Compress PDF tool afterwards if you need it to fit an attachment limit.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "When Merging Is the Right Call",
    intro:
      "Merging makes sense whenever a document's value comes from being read as a whole rather than as a collection of separate files:",
    items: [
      {
        label: "Assembling a client proposal",
        description:
          "A consultant has four PDFs: a one-page cover letter, an eight-page scope of work, a two-page timeline, and a three-page pricing breakdown. Named 01- through 04- and selected together, they merge into a single 14-page document delivered as one coherent file — no zipped folder, no numbered attachments, no note explaining what to open first.",
      },
      {
        label: "Preparing single-file application submissions",
        description:
          "Scholarship portals, visa applications, and job boards frequently accept only one PDF upload. Merging a cover letter, CV, and supporting documents meets that requirement without printing and re-scanning anything.",
      },
      {
        label: "Collecting signed documents",
        description:
          "When a contract is signed page by page and each signatory returns a separate scan, merging the signature pages back together rebuilds a complete, ordered record.",
      },
      {
        label: "Creating course packs and reading bundles",
        description:
          "Lecture slides, supplementary readings, and reference handouts combine into a single downloadable resource, so students open one file instead of juggling several downloads.",
      },
      {
        label: "Consolidating monthly paperwork for archiving",
        description:
          "Receipts, statements, and remittance advices that arrive as separate PDFs through the month merge into one file per period, which is far easier to store and search later than a folder of loose documents.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Document Assembly",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Merging PDFs here is entirely local to your device. Your browser reads each file into memory using the File API, and pdf-lib — a JavaScript library running inside the page — creates the new document and copies the pages across. All of it happens inside the browser's sandboxed environment. Your documents are never uploaded, and no page content is transmitted anywhere.",
      "This matters when the documents being combined are sensitive: a merge of a signed contract, a financial exhibit, and a confidential appendix never leaves your machine. Once you close the browser tab, the in-memory document data is discarded. There is no cloud queue, no temporary storage, and no record of which files you combined.",
    ],
  },
  {
    kind: "faq",
    heading: "Merge PDF: Questions and Answers",
    faqs: [
      {
        question: "How is the page order decided?",
        answer:
          "The merged document follows the numbered file list from top to bottom. For each file, all of its pages are copied in their original internal sequence before the next file's pages begin. If file A has pages 1–5 and file B has pages 1–3, the result runs A1, A2, A3, A4, A5, B1, B2, B3. That list order is whatever your browser reported when you selected or dropped the files.",
      },
      {
        question: "Can I drag the files into a different order?",
        answer:
          "No — the file list shows the position, name, and size of each file with a button to remove it, but it has no reordering control. To change the sequence, remove the files and select them again in the order you want. Naming them with a numeric prefix (01-, 02-, 03-) before selecting them all at once is the most dependable method.",
      },
      {
        question: "Can I select specific pages from each source file?",
        answer:
          "No. The tool copies all pages from every source file. To include only certain pages, run that document through the Split PDF tool first to get one file per page, then merge the specific page files you want.",
      },
      {
        question: "How many PDFs can I merge at once?",
        answer:
          "At least two, with no fixed upper limit. The practical ceiling is your device's memory, since every source document is loaded into browser RAM before the pages are copied.",
      },
      {
        question: "Will merging change the formatting of my PDFs?",
        answer:
          "No. Each page is copied exactly as it exists in its source file. Fonts, images, layouts, and annotations are preserved, and nothing is re-rendered or reformatted.",
      },
      {
        question: "What happens to bookmarks and hyperlinks?",
        answer:
          "Links inside an individual source PDF survive the copy. Cross-document bookmarks do not reconnect — a table of contents in one source file will not link to pages that came from a different source file, because the page positions shift during the merge.",
      },
      {
        question: "Is the merged file larger than the combined size of the originals?",
        answer:
          "It is usually close to the sum of the originals, and occasionally a little smaller where shared resources are consolidated. If the result is too large for your purposes, run it through the Compress PDF tool afterwards.",
      },
      {
        question: "Do my files get uploaded to a server?",
        answer:
          "No. The merge runs inside your web browser using pdf-lib. Your files are read from disk into browser memory, combined locally, and downloaded straight back to your device. No document content is sent anywhere.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Tools That Pair With Merging",
    tools: [
      {
        name: "Split PDF",
        href: "/split-pdf",
        description:
          "Run this before merging when you need only some pages from a source document — split it into single pages first, then merge just the ones you want.",
        icon: Scissors,
        accent: "from-pink-500 to-rose-500",
      },
      {
        name: "Compress PDF",
        href: "/compress-pdf",
        description:
          "Run this after merging if the combined document is too large to email or upload.",
        icon: Minimize2,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        name: "Rotate PDF",
        href: "/rotate-pdf",
        description:
          "Fix sideways or upside-down pages in a source file before merging, so the finished document reads consistently.",
        icon: RotateCw,
        accent: "from-amber-500 to-orange-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Further Reading on Merging",
    slugs: ["how-to-merge-pdf-files-online", "best-free-pdf-tools"],
  },
];

const howToSteps = mergeSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function MergePdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Merge PDF Files Online" steps={howToSteps} />
      <ToolPageLayout
        title="Merge PDFs"
        description="Combine multiple PDF files into one document — privately and instantly."
        icon={FileStack}
        accent="from-blue-500 to-cyan-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <MergePdfPanel />
      </ToolPageLayout>
    </>
  );
}
