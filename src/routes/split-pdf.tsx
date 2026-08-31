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
      "PDF splitting breaks a multi-page PDF document into separate files. This tool offers two modes. **Every page** produces exactly as many output files as there are pages in the source document, one file for each page — a complete set of isolated pages. **Custom pages** lets you type the pages you actually want, such as 1-3, 5, 8-10, and extracts only those. Either way you get a single ZIP containing the results.",
      "**How custom selection groups pages:** In Custom pages mode, each comma-separated group becomes one output PDF, so a range stays a single document. Entering 1-3, 5, 8-10 produces three files — pages-1-3.pdf with three pages, page-5.pdf with one, and pages-8-10.pdf with three. If you would rather have each page separately, list them individually: 1,2,3 produces three one-page files. Ranges are inclusive and 1-indexed.",
      "**How the split works technically:** The tool loads your PDF using pdf-lib and reads the total page count. In Every page mode it loops from page 0 through to the last page, creating a brand-new empty PDFDocument for each index, copying that single page from the source using copyPages(src, [i]), and serialising it — producing page-1.pdf, page-2.pdf, and so on. Custom pages mode uses the same copyPages call but passes the whole run of indices at once, so a group arrives as one multi-page document. All resulting files are then packed into a single ZIP archive by JSZip, named after your original file (e.g. contract-pages.zip). The entire split happens before any download begins — you receive one ZIP containing everything at once.",
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
        title: "Choose a split mode",
        description:
          'Leave it on "Every page" to get one PDF per page, or switch to "Custom pages" and type the pages you want — for example 1-3, 5, 8-10. Then click to run. Either way, the original formatting, dimensions, and orientation of every page are preserved.',
      },
      {
        title: "Download the ZIP",
        description:
          "Every file the split produced is packaged into a single ZIP archive named after your original document. Download it, unzip it, and share or archive the files individually.",
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
          "Splitting is the wrong operation when the document should stay whole. If the goal is simply a smaller file, use the Compress PDF tool instead — breaking a report or an essay into pieces does not make it easier to read or to send. Splitting also cannot reorder pages on its own: to change their sequence, extract what you need here and then reassemble it with the Merge PDF tool. And if you want pages from several different documents combined, that is a merge, not a split.",
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
        "Either. Every page mode creates one output PDF for each page, from page 1 through to the last. Custom pages mode lets you type exactly what you want — 1-3, 5, 8-10 — and each comma-separated group becomes one PDF, so pages 1-3 arrive as a single three-page document rather than three separate files. To get them separately instead, list the pages individually as 1,2,3.",
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
        description="Extract every page, or just the pages you choose, packaged in a single ZIP download."
        icon={Scissors}
        accent="from-pink-500 to-rose-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <SplitPdfPanel />
      </ToolPageLayout>
    </>
  );
}
