import { createFileRoute } from "@tanstack/react-router";
import { Scissors, ShieldCheck, Zap, Smartphone, Cloud, Package, FileOutput } from "lucide-react";
import { FileStack, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import SplitPdfPanel from "@/components/tools/SplitPdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
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

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PDF Splitting?",
    paragraphs: [
      "PDF splitting divides a multi-page PDF document into separate, individual files — one PDF per page. This is useful when you only need specific pages from a large document, or when you need to distribute different sections to different people.",
      "Our splitter reads your source PDF using pdf-lib, then creates a new PDF document for each page by copying it from the original. All resulting single-page files are bundled into a ZIP archive using JSZip, so you download everything in one convenient package.",
    ],
  },
  howTo: {
    heading: "How to Split a PDF in 3 Steps",
    steps: [
      {
        title: "Upload your PDF",
        description:
          "Drag and drop your multi-page PDF onto the upload area, or click to browse. The file is loaded directly into your browser — it never leaves your device.",
      },
      {
        title: "Split into pages",
        description:
          'Click "Split into pages" to begin. The tool creates a separate PDF for every page in your document, preserving the original formatting of each one.',
      },
      {
        title: "Download the ZIP",
        description:
          "All individual page files are packaged into a single ZIP archive. Download it, extract the pages you need, and share or archive them individually.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our PDF Splitter",
    items: [
      {
        icon: ShieldCheck,
        title: "Fully private",
        description:
          "Your document stays in your browser. No pages are uploaded, stored, or transmitted anywhere.",
      },
      {
        icon: FileOutput,
        title: "One PDF per page",
        description:
          "Every page becomes its own standalone PDF file, ready to share or archive independently.",
      },
      {
        icon: Package,
        title: "ZIP download",
        description:
          "All split pages are packaged into a single ZIP for a clean, one-click download.",
      },
      {
        icon: Zap,
        title: "Fast processing",
        description:
          "Page extraction and ZIP generation happen in seconds, even for documents with many pages.",
      },
      {
        icon: Cloud,
        title: "Free, no account",
        description: "No signup, no login, no subscription. Just open the tool and split your PDF.",
      },
      {
        icon: Smartphone,
        title: "Works on mobile",
        description:
          "Split PDFs from your phone or tablet — the interface adapts to any screen size.",
      },
    ],
  },
  useCases: {
    heading: "When to Split a PDF",
    intro:
      "Splitting is valuable whenever you need to isolate or redistribute individual pages from a larger document:",
    items: [
      {
        label: "Extracting a single chapter",
        description:
          "Pull one chapter from a textbook or manual to share without sending the entire file.",
      },
      {
        label: "Separating invoices",
        description:
          "Split a monthly statement into individual invoices for separate filing or forwarding.",
      },
      {
        label: "Distributing forms",
        description:
          "Extract specific form pages from a multi-page PDF packet and send each to the appropriate recipient.",
      },
      {
        label: "Removing unwanted pages",
        description:
          "Split the document, discard the pages you don't need, and merge the rest back together.",
      },
      {
        label: "Creating presentation handouts",
        description:
          "Extract key slides or summary pages from a report to create a focused handout.",
      },
    ],
  },
  privacy: {
    heading: "Secure Page Extraction",
    paragraphs: [
      "When you split a PDF on ConvertPDF, your browser handles every step of the process locally. The File API reads your document into memory, pdf-lib parses the PDF structure and copies individual pages into new documents, and JSZip bundles the results into a downloadable archive.",
      "No document data leaves your device at any point. There are no server requests, no temporary cloud storage, and no logging of your file contents. Once you close the tab, all data held in browser memory is released.",
    ],
  },
  faqs: [
    {
      question: "Does splitting a PDF degrade the quality of individual pages?",
      answer:
        "No. Each page is copied directly from the original PDF using pdf-lib's page-copy method. All text, images, fonts, and vector graphics are preserved exactly as they appear in the source document.",
    },
    {
      question: "Can I select specific pages to extract instead of splitting all pages?",
      answer:
        "The current tool splits every page in the document into its own file. To get specific pages, split the entire document and then keep only the page files you need from the downloaded ZIP.",
    },
    {
      question: "What format is the download?",
      answer:
        "You receive a single ZIP file containing one PDF per page. The files are named sequentially (page-1.pdf, page-2.pdf, etc.) for easy identification.",
    },
    {
      question: "Is there a limit on the number of pages I can split?",
      answer:
        "There is no hard page limit. The tool can handle documents with many pages, though very large files may be limited by your device's available memory. Documents under 25 MB work well on most devices.",
    },
    {
      question: "Can I split a password-protected PDF?",
      answer:
        "If the PDF requires a password to open, the browser cannot access its contents and the split will fail. Remove the password protection first using your PDF software, then use the splitter.",
    },
    {
      question: "Will the split pages keep their original page size and orientation?",
      answer:
        "Yes. Each extracted page retains the exact dimensions, orientation, and margins of the original. A landscape page stays landscape, and an A3 page stays A3.",
    },
    {
      question: "Can I split and then re-merge selected pages?",
      answer:
        "Absolutely. Split your document to get individual pages, then use our Merge PDF tool to combine only the pages you want into a new document. This is a practical way to remove or reorder pages.",
    },
  ],
  relatedTools: [
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      description: "Combine multiple PDFs into one",
      icon: FileStack,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      name: "Rotate PDF",
      href: "/rotate-pdf",
      description: "Fix page orientation",
      icon: RotateCw,
      accent: "from-amber-500 to-orange-500",
    },
    {
      name: "Compress PDF",
      href: "/compress-pdf",
      description: "Reduce PDF file size",
      icon: Minimize2,
      accent: "from-emerald-500 to-teal-500",
    },
  ],
  relatedArticleSlugs: ["how-to-merge-pdf-files-online", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function SplitPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Split a PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Split PDF"
        description="Extract every page into its own PDF file, packaged in a single ZIP download."
        icon={Scissors}
        accent="from-pink-500 to-rose-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <SplitPdfPanel />
      </ToolPageLayout>
    </>
  );
}
