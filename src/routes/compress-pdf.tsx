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
      "PDF compression reduces the file size of a PDF document so that it takes up less storage space, downloads faster, and fits within email attachment limits. PDFs often contain redundant internal structures, duplicated resource dictionaries, and unoptimised object encoding that inflate the file far beyond what the actual content requires.",
      "Our compressor uses a technique called object-stream compression. It re-encodes the internal structure of your PDF using cross-reference streams and object streams — a built-in PDF feature defined in the ISO 32000 specification. This is a lossless process, meaning no text, images, or formatting are altered during compression.",
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
        description: "Text, fonts, and images remain identical. Only internal encoding changes.",
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
          "Object-stream compression produces the largest size reductions on text-rich documents.",
      },
    ],
  },
  useCases: {
    heading: "When to Compress a PDF",
    intro:
      "PDF compression is useful whenever file size is a constraint. Here are common scenarios:",
    items: [
      {
        label: "Email attachments",
        description:
          "Shrink a report or contract so it stays under your email provider's attachment limit.",
      },
      {
        label: "Web uploads",
        description:
          "Reduce file size before uploading to a portal, LMS, or government form system with strict size caps.",
      },
      {
        label: "Cloud storage",
        description:
          "Free up space in Google Drive, Dropbox, or OneDrive by compressing archived documents.",
      },
      {
        label: "Sharing via messaging apps",
        description:
          "WhatsApp, Slack, and Teams often cap file sizes. A smaller PDF sends and downloads faster.",
      },
    ],
  },
  privacy: {
    heading: "Your Privacy Is Protected",
    paragraphs: [
      "When you compress a PDF on ConvertPDF, the entire process runs inside your web browser. Your file is read into local memory using the browser's File API, then re-encoded with pdf-lib — a JavaScript library that parses and serialises PDF structures without any server involvement.",
      "No data is transmitted to any external server. When you close the tab, all temporary data is released from memory. There is nothing stored, nothing cached, and nothing logged.",
    ],
  },
  faqs: [
    {
      question: "Does compressing a PDF reduce the quality of images or text?",
      answer:
        "No. Our compressor uses lossless object-stream re-encoding, which optimises the internal structure of the PDF without altering any visible content. Text, fonts, and images remain identical to the original.",
    },
    {
      question: "What kind of size reduction can I expect?",
      answer:
        "Results vary depending on the PDF's internal structure. Text-heavy PDFs with unoptimised encoding can see significant reductions. PDFs that are already well-optimised or consist mostly of compressed images will see smaller improvements.",
    },
    {
      question: "Is there a file size limit for compression?",
      answer:
        "The tool is designed to handle files comfortably within browser memory. Performance depends on your device's available RAM. Files under 25 MB generally process without any issues on most devices.",
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer:
        "If the PDF requires a password to open, the browser cannot read its contents, so compression will not work. PDFs with permission-level restrictions (like print-only) may still be compressible depending on the encryption method.",
    },
    {
      question: "Does compression work on scanned PDFs?",
      answer:
        "Yes, but the size reduction may be minimal. Scanned PDFs consist primarily of embedded images, which are already compressed in formats like JPEG. Object-stream optimisation primarily benefits the non-image structural data.",
    },
    {
      question: "Can I compress multiple PDFs at once?",
      answer:
        "Currently, the tool processes one PDF at a time. For multiple files, compress each one individually. You can also merge your PDFs first and then compress the combined document.",
    },
    {
      question: "What technology powers the compression?",
      answer:
        "We use pdf-lib, a JavaScript library that runs in your browser. It loads the PDF, re-serialises it with object streams and cross-reference streams enabled, and produces a smaller output file — all without any server round-trip.",
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
      name: "Split PDF",
      href: "/split-pdf",
      description: "Extract pages into separate files",
      icon: Scissors,
      accent: "from-pink-500 to-rose-500",
    },
    {
      name: "PDF to JPG",
      href: "/pdf-to-jpg",
      description: "Convert PDF pages to images",
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
