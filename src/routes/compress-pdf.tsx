import { createFileRoute } from "@tanstack/react-router";
import {
  Minimize2,
  ShieldCheck,
  FileText,
  Layers,
  SlidersHorizontal,
  ImageOff,
  BarChart3,
  FileStack,
  Scissors,
  Image as ImageIcon,
} from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CompressPdfPanel from "@/components/tools/CompressPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/compress-pdf")({
  head: () => ({
    meta: [
      { title: "Compress PDF Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Reduce PDF file size online for free. Choose lossless structural optimisation or image recompression. No uploads, no signup — your PDF stays on your device.",
      },
      { property: "og:title", content: "Compress PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Reduce PDF file size online for free. Choose lossless structural optimisation or image recompression. No uploads, no signup — your PDF stays on your device.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/compress-pdf" }],
  }),
  component: CompressPdfPage,
});

const compressSteps = [
  {
    title: "Select your PDF",
    description:
      "Drop a PDF onto the upload area or click to browse. The compressor handles one document at a time, and the file is loaded straight into your browser's memory.",
  },
  {
    title: "Choose Low, Medium, or High",
    description:
      "The three presets appear once a file is loaded. Low is lossless and leaves every image alone. Medium is selected by default and re-encodes eligible JPEG images at 75% quality. High does the same at 50%. Text, fonts, and vector artwork are never altered by any of them.",
  },
  {
    title: "Compress and compare",
    description:
      'Click "Compress PDF" and watch the progress messages as the document structure is analysed object by object. When it finishes, the panel shows your original size, the compressed size, and the percentage reduction actually achieved — so you can judge the result before downloading.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is PDF Compression?",
    paragraphs: [
      "PDF compression reduces a document's file size so it transfers faster, fits within email attachment limits, and occupies less storage. The important detail is that PDFs are not all large for the same reason. Some are heavy because they contain high-resolution photographs. Others are heavy because of unoptimised internal structure — redundant object dictionaries and legacy cross-reference tables that pile up during document generation.",
      "This tool addresses both, in two distinct layers. Every preset performs a structural re-save: the document is re-serialised using object streams and a compressed cross-reference stream, a technique introduced in PDF 1.5 and defined in the ISO 32000 specification. Multiple internal objects are repacked together and the flat xref table is replaced. This layer is completely lossless — no text is reworded, no font is modified, no image is degraded.",
      "The second layer is optional and applies only to images. Medium and High additionally decode eligible embedded images and re-encode them as JPEG, at 75% and 50% quality respectively. That step is lossy and permanent. It is also selective rather than universal: a substantial share of the images found in real PDFs are deliberately skipped, and the table below sets out exactly which ones.",
    ],
  },
  {
    kind: "matrix",
    heading: "What Each Preset Changes",
    intro:
      "Image recompression is applied conservatively, because re-encoding the wrong kind of image can wreck transparency or shift colours. Anything the tool cannot re-encode safely is passed through byte-for-byte. This is what happens to each part of your document:",
    columnHeadings: ["Low", "Medium", "High"],
    rows: [
      {
        label: "Document structure (xref table, object dictionaries)",
        cells: ["Repacked", "Repacked", "Repacked"],
      },
      {
        label: "Text, fonts, and vector graphics",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "RGB JPEG images without transparency",
        cells: ["Untouched", "Re-encoded at 75%", "Re-encoded at 50%"],
      },
      {
        label: "Images carrying a transparency mask",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "CMYK, greyscale, or indexed-colour images",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "PNG-style images stored with Flate compression",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "Bitonal CCITT or JBIG2 scans (typical fax and black-and-white scans)",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
    ],
  },
  {
    kind: "steps",
    heading: "Compressing a Document",
    steps: compressSteps,
  },
  {
    kind: "cards",
    heading: "How the Compressor Behaves",
    columns: 3,
    items: [
      {
        icon: ShieldCheck,
        title: "Your PDF is never uploaded",
        description:
          "Parsing, rewriting, and exporting all happen inside your browser. The document itself is never transmitted to any server.",
      },
      {
        icon: SlidersHorizontal,
        title: "You pick the trade-off",
        description:
          "Low is fully lossless. Medium and High trade image fidelity for size. The choice is explicit and made before anything is processed.",
      },
      {
        icon: FileText,
        title: "Text is never re-rendered",
        description:
          "No preset touches text, fonts, or vector artwork. Documents stay searchable and selectable, and signatures keep their appearance.",
      },
      {
        icon: ImageOff,
        title: "Risky images are skipped",
        description:
          "Transparency masks, non-RGB colour spaces, and bitonal scans are left untouched rather than re-encoded badly.",
      },
      {
        icon: Layers,
        title: "A larger result is never substituted",
        description:
          "If re-encoding an image would make it bigger than the original, the tool keeps the original bytes instead.",
      },
      {
        icon: BarChart3,
        title: "The real numbers are shown",
        description:
          "After compressing, the panel reports your actual before and after sizes and the true percentage reduction — no estimates.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "Choosing a Preset in Practice",
    intro:
      "Which preset helps depends entirely on why your file is large. These are the situations that come up most:",
    items: [
      {
        label: "A contract or report exported from Word",
        description:
          "Office exports frequently leave uncompressed xref tables and redundant object dictionaries behind. Low alone often makes a worthwhile dent here, and because it is lossless, every word, signature field, and font stays exactly intact. Start with Low for text-heavy documents.",
      },
      {
        label: "A photo-heavy brochure or portfolio",
        description:
          "If the images are ordinary RGB JPEGs, Medium is where the real savings appear, and High goes further at visible cost. Compare the reported reduction against how the images look before you commit to the result.",
      },
      {
        label: "A black-and-white scanned document",
        description:
          "Scans stored as bitonal CCITT or JBIG2 images are skipped by every preset, so the reduction may be very small no matter what you pick. That is a deliberate safeguard — re-encoding a bitonal scan as JPEG would make it look worse and could make it larger.",
      },
      {
        label: "A file that must stay byte-faithful",
        description:
          "For anything going into an archive, a legal submission, or a print workflow, use Low. It rewrites only the internal structure and cannot alter a single pixel.",
      },
      {
        label: "When this tool is the wrong choice",
        description:
          "The compressor re-encodes images at lower quality but never reduces their pixel dimensions. A 6000-pixel-wide scan stays 6000 pixels wide, so a very high-resolution document can remain large even on High. If you need genuine downsampling to smaller dimensions, this tool does not do that.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Your Document Stays on Your Device",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Compression runs inside your web browser. Your file is read into local memory through the File API and handed to pdf-lib, a JavaScript library that parses the full PDF object graph, walks its indirect objects, and re-serialises the document with object streams enabled. When you choose Medium or High, image re-encoding is performed by drawing each eligible image onto an in-page canvas and exporting it again — also entirely local. Your document is never uploaded to any server.",
      "There are no server-side queues, no temporary cloud storage, and no logging of your document's contents. That matters for sensitive material: a contract with personal details, a financial statement, or a confidential internal report is processed and discarded within your own device. Close the tab and everything held in memory is released.",
    ],
  },
  {
    kind: "faq",
    heading: "Compress PDF: Questions and Answers",
    faqs: [
      {
        question: "What does 'object-stream compression' actually mean?",
        answer:
          "A PDF is a collection of individual objects — fonts, images, page dictionaries, content streams — indexed by a cross-reference table. Older PDFs store that index as plain uncompressed text. Object-stream compression, added in PDF 1.5, repacks many objects together into compressed streams and replaces the flat index with a compressed cross-reference stream. The visible content is identical; only the internal encoding changes.",
      },
      {
        question: "Which images actually get recompressed?",
        answer:
          "Only images that are already JPEG-encoded, in RGB, and carry no transparency mask. Anything else is passed through untouched: PNG-style images stored with Flate compression, CMYK or greyscale images, indexed-colour images, and bitonal CCITT or JBIG2 scans. This is intentional — re-encoding those would risk colour shifts, lost transparency, or a larger file.",
      },
      {
        question: "Does compression reduce text or image quality?",
        answer:
          "Text, fonts, and vector graphics are never altered by any preset; they are restructured, not re-rendered. Images depend on your choice. Low leaves every image exactly as it is and is fully lossless. Medium re-encodes eligible images at 75% quality and High at 50%, both of which discard image data permanently. Pick Low when the images must be preserved exactly.",
      },
      {
        question: "What size reduction can I expect?",
        answer:
          "It varies too much to promise a figure, because it depends on how the PDF was built. Text-heavy documents from office software often carry a lot of unoptimised structure and benefit most from the structural pass. Files already optimised by PDF-native tools, or made up of images the tool skips, may barely change. The panel reports the actual reduction for your specific file once it finishes, so you can decide from the real number rather than an estimate.",
      },
      {
        question: "Could the compressed file come out larger than the original?",
        answer:
          "Individual images are protected against this — a re-encoded image is only substituted when it is genuinely smaller than the original, otherwise the original bytes are kept. The document as a whole is re-serialised with object streams, which on an already well-optimised PDF may yield little or no gain. The panel shows both sizes, so you can simply discard the result and keep your original if it did not help.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "The tool imposes none. The practical ceiling is your device's available memory, since the entire file is loaded into RAM for parsing and every re-encoded image is held in memory during processing. Large image-heavy documents on low-memory devices are where you would run into trouble.",
      },
      {
        question: "Why does the result look different in Safari?",
        answer:
          "Image re-encoding uses the browser's own canvas export, and Safari does not always honour the requested JPEG quality value the way other browsers do — it may apply system graphics defaults instead. The panel shows a note about this when you select Medium or High in Safari. The Low preset is unaffected, because it never touches images.",
      },
      {
        question: "Can I compress a password-protected PDF?",
        answer:
          "If the PDF needs a password to open, the browser cannot read its contents and compression will not run. Files with permission-level restrictions such as print-only may still work, depending on the encryption used, since the content itself remains readable.",
      },
      {
        question: "Can I compress several PDFs at once?",
        answer:
          "No — the tool processes one document per pass. Compress each file separately. If you have merged several PDFs into one, you can of course compress the merged document in a single operation.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Tools That Pair With Compression",
    tools: [
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description:
          "Combine documents first, then compress the merged result to keep the final file as small as possible.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        name: "Split PDF",
        href: "/split-pdf",
        description:
          "If only certain pages need sharing, split first and compress just the pages you actually send.",
        icon: Scissors,
        accent: "from-pink-500 to-rose-500",
      },
      {
        name: "Watermark PDF",
        href: "/watermark-pdf",
        description:
          "Stamp a confidentiality or copyright notice onto the document before the compression pass.",
        icon: ImageIcon,
        accent: "from-violet-500 to-purple-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "More on File Size",
    slugs: ["compress-pdf-without-losing-quality", "why-compress-pdfs-for-email"],
  },
];

const howToSteps = compressSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function CompressPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Compress a PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Compress PDF"
        description="Reduce PDF file size with your choice of lossless or lossy compression — entirely in your browser."
        icon={Minimize2}
        accent="from-emerald-500 to-teal-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <CompressPdfPanel />
      </ToolPageLayout>
    </>
  );
}
