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
      "PDF splitting breaks a multi-page PDF document into separate, individual files — one PDF per page. This is different from extracting a custom page range into a single output: this tool always produces exactly as many output files as there are pages in the source document, one file for each page. The result is a complete set of isolated page files, giving you maximum flexibility to use, share, or reassemble only what you need.",
      "**How the split works technically:** The tool loads your PDF using pdf-lib, reads the total page count, and then loops from page 0 through to the last page. For each page index, it creates a brand-new empty PDFDocument, copies that single page from the source using copyPages(src, [i]), adds it to the new document, and serialises it. Each resulting file is named page-1.pdf, page-2.pdf, and so on (1-indexed). All individual page files are then packed into a single ZIP archive by JSZip, and the ZIP is named after your original file (e.g. contract-pages.zip). This means the entire split happens before any download begins — you receive one ZIP containing all pages at once.",
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
          'Click "Split into pages" to begin. The tool creates a separate PDF for every page in your document, preserving the original formatting, dimensions, and orientation of each one.',
      },
      {
        title: "Download the ZIP",
        description:
          "All individual page files are packaged into a single ZIP archive named after your original file. Download it, extract the pages you need, and share or archive them individually.",
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
          "Your document stays in your browser. No pages are uploaded, stored, or transmitted anywhere — not during the split and not during the ZIP generation.",
      },
      {
        icon: FileOutput,
        title: "One PDF per page",
        description:
          "Every page becomes its own standalone PDF file. Each output file contains exactly one page, named sequentially (page-1.pdf, page-2.pdf, …) for easy identification.",
      },
      {
        icon: Package,
        title: "ZIP download",
        description:
          "All split pages are bundled into a single ZIP archive by JSZip before download — one click to receive everything, then extract only what you need.",
      },
      {
        icon: Zap,
        title: "Fast processing",
        description:
          "Page extraction and ZIP generation happen in your browser in seconds. Each page is processed independently, so even documents with many pages complete quickly.",
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
          "Split PDFs from your phone or tablet — the interface adapts to any screen size without requiring an app installation.",
      },
    ],
  },
  useCases: {
    heading: "When to Split a PDF",
    intro:
      "Splitting is the right operation whenever you need to break apart a document's pages into individually usable units. Here is when it helps most — and when a different approach is better:",
    items: [
      {
        label: "Extracting a specific page from a legal filing (Workflow Example)",
        description:
          "A legal assistant receives a 35-page court filing as a single PDF — one pleading per page. They upload it to the splitter and receive a ZIP containing page-1.pdf through page-35.pdf. They extract page-3.pdf (the specific motion needed by counsel) and forward only that file, without sending the full dossier. The original document is untouched on their device.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not use this tool if you need a specific consecutive range of pages as a single output file (for example, pages 5–12 combined into one PDF). This tool always produces one file per page — it does not support range extraction into a consolidated output. To get pages 5–12 as one PDF, split the document, then use the Merge PDF tool to combine only page-5.pdf through page-12.pdf into a single file. Also avoid splitting documents intended to be read as a whole (reports, essays, books) when the goal is just to reduce file size — use the Compress PDF tool instead.",
      },
      {
        label: "Separating invoices from a batch statement",
        description:
          "Many accounting systems export monthly billing as a single PDF with one invoice per page. Split the document to get individual invoice files ready for separate filing, forwarding to different departments, or matching against purchase orders.",
      },
      {
        label: "Distributing form pages to different recipients",
        description:
          "A multi-page application packet has different sections for different people: page 1 for the applicant, page 2 for a supervisor, page 3 for HR. Split once, then send each page to the appropriate recipient without sharing the whole packet.",
      },
      {
        label: "Selectively re-assembling a document",
        description:
          "Split a large PDF to get every page as an individual file, discard the pages you no longer need, and use the Merge PDF tool to combine only the pages you want to keep into a new, cleaner document.",
      },
    ],
  },
  privacy: {
    heading: "Secure Page Extraction",
    paragraphs: [
      "When you split a PDF here, your browser handles every step locally. The File API reads your document into memory, pdf-lib parses the full PDF structure and extracts each page into its own new PDFDocument, and JSZip bundles all the resulting files into a downloadable ZIP archive — all within the browser's sandboxed JavaScript environment. No document data leaves your device at any point, including during the ZIP generation step.",
      "There are no server requests, no cloud queues, and no logging of your file contents or page count. If the document contains confidential information — personnel records, financial statements, legal filings — each page stays on your machine throughout the entire operation. Closing the tab immediately releases all in-memory data.",
    ],
  },
  faqs: [
    {
      question: "Does the tool split every page, or can I choose a range?",
      answer:
        "The tool always splits every page in the document — it creates one output PDF for each page, from page 1 through to the last. It does not support selective range extraction in a single output file. To get a specific range as one PDF, split the entire document first, then use the Merge PDF tool to combine the specific page files you need.",
    },
    {
      question: "Does splitting a PDF degrade the quality of individual pages?",
      answer:
        "No. Each page is copied directly from the original PDF using pdf-lib's copyPages method with a single-element index array. All text, images, fonts, vector graphics, and annotations are preserved exactly as they appear in the source document. No re-rendering or re-encoding occurs.",
    },
    {
      question: "What format is the download?",
      answer:
        "You receive a single ZIP file containing one PDF per page. Files are named sequentially starting from page-1.pdf. The ZIP itself is named after your original file (for example, report-pages.zip). Extract the ZIP to access the individual page files.",
    },
    {
      question: "Is there a limit on the number of pages I can split?",
      answer:
        "There is no hard page limit. The tool can handle documents with many pages, though very large files may be constrained by your device's available memory — pdf-lib loads the entire source document into RAM before processing begins. Documents under 25 MB work reliably on most devices.",
    },
    {
      question: "Will the split pages keep their original page size and orientation?",
      answer:
        "Yes. Each extracted page retains the exact dimensions, orientation, and content box of the original. A landscape A4 page stays landscape A4. A custom-sized slide stays at its original dimensions. The tool does not rescale or reformat any page.",
    },
    {
      question: "Can I split a password-protected PDF?",
      answer:
        "If the PDF requires a password to open, the browser cannot access its contents and the split will fail. Remove the password protection first using your PDF software, then use the splitter.",
    },
    {
      question: "Can I split and then re-merge selected pages?",
      answer:
        "Yes — this is a practical way to reorder or remove pages from a document. Split your PDF to get every page as an individual file, select only the pages you want to keep, and use the Merge PDF tool to combine them into a new document in any order you choose.",
    },
  ],
  relatedTools: [
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      description:
        "After splitting, use Merge PDF to reassemble only the pages you want into a new document — useful for reordering, removing, or combining pages from multiple sources.",
      icon: FileStack,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      name: "Compress PDF",
      href: "/compress-pdf",
      description:
        "If the source document is large before splitting, compress it first to reduce the size of each resulting page file and the overall ZIP download.",
      icon: Minimize2,
      accent: "from-emerald-500 to-teal-500",
    },
    {
      name: "Rotate PDF",
      href: "/rotate-pdf",
      description:
        "Fix the orientation of specific pages before splitting — so each extracted page file is already correctly oriented and ready to use.",
      icon: RotateCw,
      accent: "from-amber-500 to-orange-500",
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
