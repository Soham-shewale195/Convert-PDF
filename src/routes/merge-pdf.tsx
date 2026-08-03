import { createFileRoute } from "@tanstack/react-router";
import {
  FileStack,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  GripVertical,
  Infinity as InfinityIcon,
} from "lucide-react";
import { Scissors, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import MergePdfPanel from "@/components/tools/MergePdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
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

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PDF Merging?",
    paragraphs: [
      "PDF merging combines two or more separate PDF files into a single unified document. Instead of sending a colleague five separate attachments, you assemble them into one clean file. Instead of distributing five chapters individually, you consolidate them into a complete manuscript that opens from the first page to the last in continuous sequence.",
      "**How the page ordering works technically:** The merger uses pdf-lib to create a brand-new, empty PDFDocument. It then iterates through your files in the exact order they appear in the file list — first file first, last file last. For each source PDF, it calls copyPages with the full list of page indices from that document, which copies every page in its original internal order into the new document. Pages are then appended with addPage, one after another. The result is a single PDF where all pages flow sequentially: all pages of file one, then all pages of file two, and so on. Reordering the files in the list before merging is the only way to control the sequence, because the tool copies every page of each file in the order you set.",
    ],
  },
  howTo: {
    heading: "How to Merge PDFs in 3 Steps",
    steps: [
      {
        title: "Add your PDF files",
        description:
          "Drag and drop multiple PDF files onto the upload area, or click to browse. You can add as many files as you need — the tool requires at least two.",
      },
      {
        title: "Arrange the order",
        description:
          "Review the file list and reorder by dragging files up or down. The merged document will follow exactly this sequence: all pages of the first file, then all pages of the second, and so on.",
      },
      {
        title: "Merge and download",
        description:
          'Click "Merge & prepare" to combine all files. The tool copies every page from each source PDF into a single new document in sequence, then prompts your browser to download the result.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our PDF Merger",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "All merging happens in your browser's memory. Your documents are never sent to any external server — not even temporarily.",
      },
      {
        icon: InfinityIcon,
        title: "No file count limit",
        description:
          "Merge two PDFs or twenty. There is no artificial cap on the number of files you can combine in a single operation.",
      },
      {
        icon: GripVertical,
        title: "Full control over page order",
        description:
          "Reorder files in the list before merging. The tool copies all pages from each file in the sequence you set — your arrangement becomes the final document's structure.",
      },
      {
        icon: Zap,
        title: "Fast assembly",
        description:
          "Page copying is handled by pdf-lib in JavaScript — the library reads each source file and appends its pages to a new document, with most merges completing in a few seconds.",
      },
      {
        icon: Cloud,
        title: "No signup needed",
        description: "The tool is free and open. No account, no email, no hidden charges.",
      },
      {
        icon: Smartphone,
        title: "Works on any device",
        description:
          "Merge PDFs from your phone, tablet, or desktop — the interface adapts to your screen size and accepts touch input for reordering.",
      },
    ],
  },
  useCases: {
    heading: "When to Merge PDFs",
    intro:
      "Merging makes sense whenever a document's value comes from being read as a whole — not as a collection of separate files. Here is when it is the right choice, and when it is not:",
    items: [
      {
        label: "Assembling a client proposal (Workflow Example)",
        description:
          "A consultant prepares a proposal consisting of four separate PDFs: a one-page cover letter, an eight-page scope of work, a two-page timeline, and a three-page pricing breakdown. They add all four to the merger, drag them into the correct order, and click Merge. The result is a single 14-page PDF delivered to the client as one coherent document — no zipped folder, no numbered attachments, no instructions on what to open first.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not use this tool when you need to pick specific pages from each source rather than include every page of every file. The merger always copies all pages of each source document in full — it does not support selecting page ranges from within a source file. If you need to cherry-pick pages (for example, pages 1, 5, and 9 from a 20-page PDF), split that file first to get individual pages, select the ones you want, and then merge those selected files. Also do not use this tool when any of your source PDFs requires a password to open, as the browser cannot read encrypted files.",
      },
      {
        label: "Collecting signed documents",
        description:
          "When a contract is signed page-by-page — each signatory returning a separate scanned PDF — merge the individual signature pages back into the original document structure for a complete, ordered record.",
      },
      {
        label: "Creating course packs and reading bundles",
        description:
          "Combine lecture slides, supplementary readings, and reference handouts into a single downloadable resource. Students open one file rather than navigating multiple downloads.",
      },
      {
        label: "Preparing single-file application submissions",
        description:
          "Many scholarship portals, visa applications, and job boards accept only a single PDF upload. Merge your cover letter, CV, and supporting documents into one file to meet the requirement without printing and re-scanning.",
      },
    ],
  },
  privacy: {
    heading: "Private Document Assembly",
    paragraphs: [
      "Merging PDFs here is entirely local to your device. When you add files, your browser reads each one into memory using the File API. The tool then uses pdf-lib to create a new empty PDFDocument in JavaScript, iterates through your files in order, and calls copyPages to copy all pages from each source into the new document — all within the browser's sandboxed environment. No document data is transmitted to any server at any point in this process.",
      "This matters when the documents being combined are sensitive: a merger of a signed contract, a financial exhibit, and a confidential appendix never leaves your machine. Once you close the browser tab, all in-memory document data is discarded. There is no cloud queue, no temporary storage, and no record of which files you combined.",
    ],
  },
  faqs: [
    {
      question: "How does page order work when I merge multiple files?",
      answer:
        "The order of pages in the merged document exactly mirrors the order of files in the list, top to bottom. For each file, all its pages are copied in their original internal sequence before the next file's pages begin. If file A has pages 1–5 and file B has pages 1–3, the merged result runs A1, A2, A3, A4, A5, B1, B2, B3. Reorder the files in the list before clicking Merge to change the sequence.",
    },
    {
      question: "Can I select specific pages from each source file?",
      answer:
        "No — the tool copies all pages from every source file. To include only specific pages from a source, use the Split PDF tool first to extract individual pages from that document, then add the specific page files you want to the merger.",
    },
    {
      question: "How many PDFs can I merge at once?",
      answer:
        "There is no fixed limit on the number of files. You can merge two or more PDFs in a single operation. The practical limit depends on your device's available memory — the combined size of all files should fit comfortably in your browser's RAM.",
    },
    {
      question: "Will merging change the formatting of my PDFs?",
      answer:
        "No. Each page is copied exactly as it exists in the source file using pdf-lib's copyPages method. Fonts, images, layouts, and annotations are preserved. The tool does not re-render or reformat any content.",
    },
    {
      question: "What happens to bookmarks and hyperlinks?",
      answer:
        "Internal links and hyperlinks within each individual PDF are preserved during the copy. However, cross-document bookmarks — such as a table of contents in one source file that links to a page in another source file — will not automatically reconnect in the merged output, because the page indices change.",
    },
    {
      question: "Is the merged file larger than the combined size of the originals?",
      answer:
        "The merged file is typically close to the combined size of the originals. In some cases it may be slightly smaller because pdf-lib can consolidate shared resources across pages. If the merged file is still too large for your purposes, run it through the Compress PDF tool afterwards.",
    },
    {
      question: "Do my files get uploaded to a server?",
      answer:
        "No. ConvertPDF processes everything inside your web browser using pdf-lib. Your files are read from disk into browser memory, merged locally, and then downloaded. No network requests are made with your document data.",
    },
  ],
  relatedTools: [
    {
      name: "Split PDF",
      href: "/split-pdf",
      description:
        "Use Split PDF before merging when you need to extract specific pages from a source document — split it into individual pages first, then add only the pages you want to the merger.",
      icon: Scissors,
      accent: "from-pink-500 to-rose-500",
    },
    {
      name: "Compress PDF",
      href: "/compress-pdf",
      description:
        "After merging, if the combined PDF is too large to email or upload, compress it to reduce the file size without altering any of the merged content.",
      icon: Minimize2,
      accent: "from-emerald-500 to-teal-500",
    },
    {
      name: "Rotate PDF",
      href: "/rotate-pdf",
      description:
        "If any source file has incorrectly oriented pages, fix their rotation before merging so the final document is consistently readable from start to finish.",
      icon: RotateCw,
      accent: "from-amber-500 to-orange-500",
    },
  ],
  relatedArticleSlugs: ["how-to-merge-pdf-files-online", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function MergePdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Merge PDF Files Online" steps={howToSteps} />
      <ToolPageLayout
        title="Merge PDFs"
        description="Combine multiple PDF files into one document — privately and instantly."
        icon={FileStack}
        accent="from-blue-500 to-cyan-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <MergePdfPanel />
      </ToolPageLayout>
    </>
  );
}
