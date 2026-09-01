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
          "Reduce PDF file size online for free with three quality levels. No uploads, no signup — your PDF stays on your device.",
      },
      { property: "og:title", content: "Compress PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Reduce PDF file size online for free with three quality levels. No uploads, no signup — your PDF stays on your device.",
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
      "**How this tool works technically:** Every preset calls pdf-lib's save method with the useObjectStreams flag set to true. That instruction tells pdf-lib to re-serialise your PDF using cross-reference streams and object streams — a structural optimisation introduced in PDF 1.5 and defined in the ISO 32000 specification. The tool parses every internal object in the document, repacks multiple objects together into compressed streams, and replaces uncompressed flat xref tables with a compressed cross-reference stream. This structural step is lossless: no text is reworded, no font is modified.",
      "**Three presets, and what each one really does:** All three run the same pipeline and differ only in how hard they push image quality. **Low** re-encodes embedded images as JPEG at 82% quality, **Medium** — the default — at 75%, and **High** at 50%. Every preset is therefore a lossy operation on images: each discards some image data permanently in exchange for a smaller file, with Low discarding the least. Text, fonts and vector content are never altered by any preset, so the document stays searchable and selectable whichever level you choose. No preset preserves images byte-for-byte, so keep your original if you need one.",
      "**Which images actually get recompressed:** JPEG, PNG-style Flate-compressed images, and JPEG 2000 are all decoded and re-encoded, including those whose colour space is written as an ICCBased profile — the usual output of Word, InDesign and scanner software. JPEG 2000 matters more than it sounds: it is common in exported lecture notes and slide decks, where it can account for the overwhelming majority of the file. A few kinds are deliberately left alone: CCITT and JBIG2 fax-style scans, transparency masks, and CMYK or indexed-palette images, none of which can be re-encoded without risking a corrupted or colour-shifted result. Every recompressed image is only substituted when the new version is genuinely smaller, so no image is ever made bigger.",
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
        title: "Pick a preset and compress",
        description:
          'Choose Low for the gentlest recompression, Medium (the default) for a balance of size and quality, or High for the smallest file. Click "Compress PDF" and the work happens entirely within your browser.',
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
          "Your PDF is processed entirely in your browser and is never uploaded. No third-party service is contacted at any point.",
      },
      {
        icon: Zap,
        title: "Runs on your device",
        description:
          "Small documents finish in moments. Image-heavy ones take longer, because every image is decoded and recompressed individually rather than handed to a server.",
      },
      {
        icon: FileText,
        title: "You choose the trade-off",
        description:
          "Text and fonts are never altered by any preset. Low re-encodes images at 82% quality, Medium at 75%, and High at 50% — you decide how much detail to trade for size.",
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
        title: "Biggest gains on image-heavy files",
        description:
          "The largest reductions come from documents full of photographs, diagrams or scanned pages, where recompressing the images dominates. Text-rich exports from Word or reporting systems still benefit from the structural pass, but the saving is smaller.",
      },
    ],
  },
  useCases: {
    heading: "When to Compress a PDF",
    intro:
      "Compression is the right choice when a file needs to be smaller and a small, controlled loss of image detail is acceptable. Here are the scenarios where it makes the most difference — and one where it will not:",
    items: [
      {
        label: "Reducing a contract exported from Word (Workflow Example)",
        description:
          "A legal team exports a 30-page contract from Microsoft Word as a PDF. Word-to-PDF exports frequently leave behind uncompressed xref tables and redundant object dictionaries. Running the file through the compressor re-encodes those internal structures using object streams — every word, every signature field, and every font stays intact, but the file is meaningfully smaller and fits comfortably within a standard email attachment limit.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Every preset reduces encoding quality rather than pixel dimensions, so a very high-resolution scan can still come out large — a 6000-pixel-wide page stays 6000 pixels wide. If you need true downsampling to a lower resolution, this compressor does not do that. Some image types are also left untouched by design: CCITT and JBIG2 fax-style scans, transparency masks, and CMYK or indexed-palette images, none of which can be re-encoded safely without risking a corrupted or colour-shifted result. If a document is built entirely from those, expect little movement at any preset.",
      },
      {
        label: "Meeting email attachment limits",
        description:
          "Many email providers cap attachments at 10–25 MB. Reports and proposals full of screenshots or scanned pages routinely overshoot that. Compressing brings them back within range, and Low is usually enough when the images need to stay close to the original.",
      },
      {
        label: "Preparing PDFs for portal uploads",
        description:
          "Government forms, university submission portals, and corporate LMS platforms frequently enforce strict file size caps. Compressing before upload avoids rejection without removing pages or retyping anything.",
      },
      {
        label: "Archiving generated reports",
        description:
          "Programmatically generated PDFs — from billing systems, CRMs, or reporting tools — often carry significant structural overhead. Compressing archived copies before long-term storage reduces cumulative storage costs; choose Low to keep any embedded images close to the original.",
      },
    ],
  },
  privacy: {
    heading: "Your Privacy Is Protected",
    paragraphs: [
      "When you compress a PDF here, the entire process runs inside your web browser. Your file is read into local memory using the browser's File API, then passed to pdf-lib — a JavaScript library that parses the full PDF object graph and re-serialises it with object streams enabled. Every step — parsing, decoding each image, re-encoding it, and exporting the result — happens within the browser's sandboxed JavaScript environment. Your document is never uploaded, and no third-party service is contacted at any point. On files containing JPEG 2000 images, the decoder for that format is loaded from this site the first time it is needed, in the same way the rest of the page loads; it carries no part of your document.",
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
        "Text, fonts, and vector graphics are never altered by any preset — those are only ever restructured, not re-rendered. Images are re-encoded by all three: Low at 82% quality, Medium (the default) at 75%, and High at 50%. Each discards some image data permanently, Low the least. No preset preserves images exactly, so if you need a byte-faithful copy, keep your original file alongside the compressed one.",
    },
    {
      question: "What kind of size reduction can I expect?",
      answer:
        "It depends entirely on what is making the file large. Documents full of photographs, diagrams or scanned pages see the biggest reductions, because recompressing images is where most of the saving comes from. Text-only documents change far less, since only the internal structure can be tightened. The panel reports your actual before and after sizes once it finishes, so you can judge the real result rather than rely on an estimate.",
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
        "Yes, and scans are where the tool does its best work, since the images dominate the file. All three presets re-encode them: Low keeps the most detail, High produces the smallest file. The exception is fax-style bitonal scans stored as CCITT or JBIG2, which are left untouched because re-encoding them as JPEG would look worse and often produce a larger file.",
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
        description="Reduce PDF file size with three quality levels — entirely in your browser."
        icon={Minimize2}
        accent="from-emerald-500 to-teal-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <CompressPdfPanel />
      </ToolPageLayout>
    </>
  );
}
