import { createFileRoute } from "@tanstack/react-router";
import { Minimize2, Zap, ShieldCheck, Smartphone, Cloud, FileText, Layers } from "lucide-react";
import { FileStack, Scissors, Image as ImageIcon } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CompressPdfPanel from "@/components/tools/CompressPdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/compress-pdf")({
  head: () => ({
    meta: [
      { title: "Compress PDF Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Reduce PDF file size online for free using lossless compression. No uploads, no signup — your PDF stays on your device.",
      },
      { property: "og:title", content: "Compress PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Reduce PDF file size online for free using lossless compression. No uploads, no signup — your PDF stays on your device.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/compress-pdf" }],
  }),
  component: CompressPdfPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PDF Compression?",
    paragraphs: [
      "PDF compression reduces the file size of a PDF document so it transfers faster, fits within email attachment limits, and occupies less storage. The key detail is that not all PDFs are bloated for the same reason: some are large because they contain high-resolution images; others are large because of unoptimised internal structure, redundant object dictionaries, and legacy cross-reference tables that accumulate during document generation.",
      "**How this tool works technically:** This compressor calls pdf-lib's save method with the useObjectStreams flag set to true. That instruction tells pdf-lib to re-serialise your PDF using cross-reference streams and object streams — a structural optimisation introduced in PDF 1.5 and defined in the ISO 32000 specification. The tool parses every internal object in the document, repacks multiple objects together into compressed streams, and replaces uncompressed flat xref tables with a compressed cross-reference stream. Crucially, this is a lossless structural operation: no text is reworded, no image is resampled, no font is modified. Every visible element of the document is preserved exactly.",
    ],
  },
  howTo: {
    heading: "How to Compress a PDF in 3 Steps",
    steps: [
      {
        title: "Select your PDF",
        description:
          "Drag and drop your PDF file onto the upload area above, or click to browse your device. The file is loaded directly into your browser's memory.",
      },
      {
        title: "Compress",
        description:
          'Click the "Compress PDF" button. The tool re-saves your document with optimised object streams using pdf-lib, entirely within your browser.',
      },
      {
        title: "Download the result",
        description:
          "Once compression is finished, download your smaller PDF. The original file is untouched — you always keep your source document.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our PDF Compressor",
    items: [
      {
        icon: ShieldCheck,
        title: "No file uploads",
        description:
          "Your PDF is processed entirely in your browser. Nothing is transmitted over the network.",
      },
      {
        icon: Zap,
        title: "Instant compression",
        description: "Object-stream re-encoding is fast — most files finish in under two seconds.",
      },
      {
        icon: FileText,
        title: "Lossless quality",
        description:
          "Text, fonts, and images remain identical to the original. Only the internal PDF encoding structure changes.",
      },
      {
        icon: Cloud,
        title: "No account required",
        description:
          "Open the page, drop your file, and download. No signup, no email, no paywall.",
      },
      {
        icon: Smartphone,
        title: "Mobile friendly",
        description:
          "Works on phones and tablets. The responsive interface adapts to any screen size.",
      },
      {
        icon: Layers,
        title: "Best for text-heavy PDFs",
        description:
          "Object-stream compression produces the largest size reductions on text-rich documents where the internal encoding has not been previously optimised — typical of exports from Word, Excel, or reporting systems.",
      },
    ],
  },
  useCases: {
    heading: "When to Compress a PDF",
    intro:
      "Structural PDF compression is the right choice when you need a smaller file without sacrificing any visible content. Here are the scenarios where it makes the most difference — and one where it will not:",
    items: [
      {
        label: "Reducing a contract exported from Word (Workflow Example)",
        description:
          "A legal team exports a 30-page contract from Microsoft Word as a PDF. Word-to-PDF exports frequently leave behind uncompressed xref tables and redundant object dictionaries. Running the file through the compressor re-encodes those internal structures using object streams — every word, every signature field, and every font stays intact, but the file is meaningfully smaller and fits comfortably within a standard email attachment limit.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not use this tool if your goal is to reduce the size of a scanned PDF or a heavily image-laden document. Scanned PDFs store their content as embedded JPEG or FLATE-compressed images, which are already tightly compressed at the image level. Object-stream re-encoding cannot shrink image data further. For meaningful size reduction on image-heavy PDFs you would need a tool that resamples embedded images at lower resolution — which this compressor does not do, by design.",
      },
      {
        label: "Meeting email attachment limits",
        description:
          "Many email providers cap attachments at 10–25 MB. A bloated report or proposal generated by office software often exceeds those limits not because of large images, but because of unoptimised internal encoding. Structural compression can bring those files within acceptable range without altering a character of content.",
      },
      {
        label: "Preparing PDFs for portal uploads",
        description:
          "Government forms, university submission portals, and corporate LMS platforms frequently enforce strict file size caps. Compressing a text-heavy PDF before upload avoids rejection without requiring you to reduce content or visual quality.",
      },
      {
        label: "Archiving generated reports",
        description:
          "Programmatically generated PDFs — from billing systems, CRMs, or reporting tools — often carry significant structural overhead. Compressing archived copies before long-term storage reduces cumulative storage costs without affecting document fidelity.",
      },
    ],
  },
  privacy: {
    heading: "Your Privacy Is Protected",
    paragraphs: [
      "When you compress a PDF here, the entire process runs inside your web browser. Your file is read into local memory using the browser's File API, then passed to pdf-lib — a JavaScript library that parses the full PDF object graph and re-serialises it with object streams enabled. Every step — parsing, rewriting internal structures, and exporting — happens within the browser's sandboxed JavaScript environment. No data crosses the network at any point.",
      "There are no server-side queues, no temporary cloud storage, and no logging of your document contents. This matters particularly for sensitive materials: a contract with personal details, a financial statement, or a confidential internal report is processed and discarded entirely within your own device. Close the browser tab and everything held in memory is released immediately.",
    ],
  },
  faqs: [
    {
      question: "What exactly does 'object-stream compression' mean?",
      answer:
        "PDF files are made up of individual objects — fonts, images, page dictionaries, content streams — connected by a cross-reference (xref) table. Older PDFs store these as plain text entries in an uncompressed xref table. Object-stream compression, introduced in PDF 1.5, repacks multiple objects together into compressed streams and replaces the flat xref table with a compressed cross-reference stream. The document's visual content is unchanged; only the internal encoding structure is rewritten.",
    },
    {
      question: "Does compressing a PDF reduce the quality of images or text?",
      answer:
        "No. The compressor calls pdf-lib's save method with useObjectStreams: true, which rewrites the internal object structure without touching any visible content. Text, fonts, vector graphics, and embedded images are passed through unchanged. This is a structural operation, not a content operation.",
    },
    {
      question: "What kind of size reduction can I expect?",
      answer:
        "Results vary depending on how the source PDF was created. Text-heavy PDFs generated by office software often have substantial unoptimised internal encoding and can see the largest reductions. PDFs already exported from PDF-native tools with optimisation turned on, or documents consisting primarily of compressed images, may see little or no change.",
    },
    {
      question: "Is there a file size limit for compression?",
      answer:
        "There is no hard limit imposed by the tool. The practical limit is your device's available RAM — pdf-lib loads the entire file into memory during parsing. Files under 25 MB work well on most devices without issue.",
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer:
        "If the PDF requires a password to open, the browser cannot read its contents and compression will not work. PDFs with permission-level restrictions (like print-only) may still be compressible depending on the encryption method, as the browser can still access the content.",
    },
    {
      question: "Does compression work on scanned PDFs?",
      answer:
        "Yes, but the size reduction will typically be very small. Scanned PDFs consist primarily of embedded images already compressed in JPEG or FLATE format. Object-stream optimisation benefits the non-image structural data, which makes up a small fraction of a scan-heavy file.",
    },
    {
      question: "Can I compress multiple PDFs at once?",
      answer:
        "Currently the tool processes one PDF at a time. For multiple files, compress each one individually. If you have recently merged several PDFs into one document, you can also compress the merged result in a single pass.",
    },
  ],
  relatedTools: [
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      description:
        "After combining several documents into one, compress the merged result to keep the final file as small as possible before sharing or archiving.",
      icon: FileStack,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      name: "Split PDF",
      href: "/split-pdf",
      description:
        "If only specific pages need to be shared, split the document first and then compress the individual page files you actually need to distribute.",
      icon: Scissors,
      accent: "from-pink-500 to-rose-500",
    },
    {
      name: "Watermark PDF",
      href: "/watermark-pdf",
      description:
        "Add a confidentiality stamp or copyright notice to your document before compressing — the watermark is embedded in the content before the structural re-encoding step.",
      icon: ImageIcon,
      accent: "from-violet-500 to-purple-500",
    },
  ],
  relatedArticleSlugs: ["compress-pdf-without-losing-quality", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function CompressPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Compress a PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Compress PDF"
        description="Reduce PDF file size while maintaining quality — entirely in your browser."
        icon={Minimize2}
        accent="from-emerald-500 to-teal-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <CompressPdfPanel />
      </ToolPageLayout>
    </>
  );
}
