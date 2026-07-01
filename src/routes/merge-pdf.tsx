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
      "PDF merging combines two or more separate PDF files into a single unified document. Instead of sending five attachments to a colleague, you merge them into one clean file. Instead of juggling multiple chapters, you assemble them into a complete manuscript.",
      "Our merger works by creating a brand-new PDF document and copying every page from each of your source files into it, in the order you specify. The process uses pdf-lib — a JavaScript library that handles PDF structures natively in the browser — so every page retains its original layout, fonts, images, and formatting.",
    ],
  },
  howTo: {
    heading: "How to Merge PDFs in 3 Steps",
    steps: [
      {
        title: "Add your PDF files",
        description:
          "Drag and drop multiple PDF files onto the upload area, or click to browse. You can add as many files as you need — the tool accepts two or more.",
      },
      {
        title: "Arrange the order",
        description:
          "Review the file list and reorder them if needed. The final merged document will follow the sequence shown in the list.",
      },
      {
        title: "Merge and download",
        description:
          'Click "Merge & prepare" to combine all files. The tool copies every page from each source PDF into a single new document, then prompts your download.',
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
          "All merging happens in your browser's memory. Your documents are never sent to any external server.",
      },
      {
        icon: InfinityIcon,
        title: "No file count limit",
        description:
          "Merge two PDFs or twenty. There is no artificial cap on the number of files you can combine.",
      },
      {
        icon: GripVertical,
        title: "Custom ordering",
        description:
          "Review and reorder your files before merging to ensure the final document flows correctly.",
      },
      {
        icon: Zap,
        title: "Fast assembly",
        description:
          "Page copying is handled by pdf-lib in JavaScript — most merges complete in a few seconds.",
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
          "Merge PDFs from your phone, tablet, or desktop — the interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Merge PDFs",
    intro: "Combining documents into a single PDF simplifies sharing, archiving, and organisation:",
    items: [
      {
        label: "Assembling proposals",
        description:
          "Combine a cover letter, scope of work, timeline, and pricing sheet into one polished proposal document.",
      },
      {
        label: "Collecting signed documents",
        description:
          "Merge individually signed pages back into a single contract or agreement file.",
      },
      {
        label: "Creating course packs",
        description:
          "Combine lecture slides, readings, and handouts into a single downloadable resource for students.",
      },
      {
        label: "Archiving project files",
        description:
          "Merge related invoices, receipts, and reports into one PDF for cleaner record-keeping.",
      },
      {
        label: "Preparing submissions",
        description:
          "Many application portals accept only a single PDF upload. Merge your documents to meet the requirement.",
      },
    ],
  },
  privacy: {
    heading: "Private Document Assembly",
    paragraphs: [
      "Merging PDFs on ConvertPDF is entirely local. When you add files, your browser reads each one into memory using the File API. The tool then uses pdf-lib to create a new PDFDocument, copies every page from your source files, and serialises the result — all within the browser's sandboxed JavaScript environment.",
      "At no point are your documents transmitted over the internet. Once you close the browser tab, all in-memory data is discarded. If you are merging contracts, medical records, or financial statements, your data stays exactly where it should — on your device.",
    ],
  },
  faqs: [
    {
      question: "How many PDFs can I merge at once?",
      answer:
        "There is no fixed limit on the number of files. You can merge two or more PDFs in a single operation. The practical limit depends on your device's available memory — the combined size of all files should fit comfortably in RAM.",
    },
    {
      question: "Will merging change the formatting of my PDFs?",
      answer:
        "No. Each page is copied exactly as it exists in the source file. Fonts, images, layouts, and annotations are preserved. The tool does not re-render or reformat any content.",
    },
    {
      question: "Can I reorder the files before merging?",
      answer:
        "Yes. After adding your files, you can rearrange them in the file list. The final merged document follows the order you set.",
    },
    {
      question: "What happens to bookmarks and hyperlinks?",
      answer:
        "Internal bookmarks and hyperlinks within individual PDFs are preserved during the copy. However, cross-document bookmarks (like a table of contents linking to a different source file) will not automatically reconnect.",
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer:
        "If a PDF requires a password to open, the browser cannot read its contents, and it cannot be merged. PDFs with view-only restrictions may work depending on the encryption type.",
    },
    {
      question: "Is the merged file larger than the sum of the originals?",
      answer:
        "The merged file is typically close to the combined size of the originals. In some cases it may be slightly smaller because pdf-lib consolidates shared resources. You can always compress the result afterwards using our Compress PDF tool.",
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
      description: "Extract pages into separate files",
      icon: Scissors,
      accent: "from-pink-500 to-rose-500",
    },
    {
      name: "Compress PDF",
      href: "/compress-pdf",
      description: "Reduce PDF file size",
      icon: Minimize2,
      accent: "from-emerald-500 to-teal-500",
    },
    {
      name: "Rotate PDF",
      href: "/rotate-pdf",
      description: "Fix page orientation",
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
