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
          "Shrink a PDF for free using three quality levels. Every preset recompresses images, Low the most gently. No uploads and no signup required.",
      },
      { property: "og:title", content: "Compress PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Shrink a PDF for free using three quality levels. Every preset recompresses images, Low the most gently. No uploads and no signup required.",
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
      "The three presets appear once a file is loaded. They run the same pipeline and differ only in how hard they push image quality: Low re-encodes images at 82%, Medium — the default — at 75%, and High at 50%. Text, fonts, and vector artwork are never altered by any of them.",
  },
  {
    title: "Compress and compare",
    description:
      'Click "Compress PDF" and watch the progress messages as the document is analysed object by object. A text-heavy file finishes quickly; an image-heavy one can take a while, because every image is decoded and re-encoded individually. When it finishes, the panel shows your original size, the compressed size, and the reduction actually achieved.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is PDF Compression?",
    paragraphs: [
      "PDF compression reduces a document's file size so it transfers faster, fits within email attachment limits, and occupies less storage. The important detail is that PDFs are not all large for the same reason. Some are heavy because they contain high-resolution photographs. Others are heavy because of unoptimised internal structure — redundant object dictionaries and legacy cross-reference tables that pile up during document generation.",
      "This tool addresses both, in two layers. Every preset performs a structural re-save: the document is re-serialised using object streams and a compressed cross-reference stream, a technique introduced in PDF 1.5 and defined in the ISO 32000 specification. Multiple internal objects are repacked together and the flat xref table is replaced. This layer is completely lossless — no text is reworded, no font is modified.",
      "The second layer applies to images, and it is worth being blunt about it: all three presets re-encode them. Low writes JPEG at 82% quality, Medium at 75%, and High at 50%. Every preset is therefore a lossy operation on images, each discarding some data permanently in exchange for a smaller file, with Low discarding the least. No preset preserves images byte-for-byte, so if you need a faithful copy, keep your original file alongside the compressed one.",
      "Which images get recompressed depends on how they are encoded rather than on the preset. JPEG, PNG-style Flate-compressed images, and JPEG 2000 are all decoded and re-encoded, including those whose colour space is written as an ICCBased profile — the usual output of Word, InDesign and scanner software. JPEG 2000 matters more than it sounds: it is common in exported lecture notes and slide decks, where it can account for the overwhelming majority of the file. A few kinds are deliberately left alone, and the table below sets out exactly which.",
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
        label: "JPEG images",
        cells: ["Re-encoded at 82%", "Re-encoded at 75%", "Re-encoded at 50%"],
      },
      {
        label: "PNG-style images stored with Flate compression",
        cells: ["Re-encoded at 82%", "Re-encoded at 75%", "Re-encoded at 50%"],
      },
      {
        label: "JPEG 2000 images",
        cells: ["Re-encoded at 82%", "Re-encoded at 75%", "Re-encoded at 50%"],
      },
      {
        label: "An image that carries a transparency mask",
        cells: ["Re-encoded, mask kept", "Re-encoded, mask kept", "Re-encoded, mask kept"],
      },
      {
        label: "The transparency mask itself",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "CMYK, indexed-palette, Separation or Lab images",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "Bitonal CCITT or JBIG2 scans (typical fax and black-and-white scans)",
        cells: ["Untouched", "Untouched", "Untouched"],
      },
      {
        label: "Any image that would come out larger",
        cells: ["Original kept", "Original kept", "Original kept"],
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
    heading: "What the Compressor Guarantees",
    columns: 3,
    items: [
      {
        icon: ShieldCheck,
        title: "Your PDF is never uploaded",
        description:
          "Parsing, rewriting, and exporting all happen inside your browser. The document itself is never transmitted, and no third-party service is contacted.",
      },
      {
        icon: SlidersHorizontal,
        title: "You pick the trade-off",
        description:
          "Three quality levels, chosen before anything is processed. Low keeps the most image detail, High produces the smallest file.",
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
          "Bitonal scans, CMYK and indexed-palette images, and transparency masks are left untouched rather than re-encoded badly.",
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
    kind: "callout",
    heading: "Your Document Stays on Your Device",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Compression runs inside your web browser. Your file is read into local memory through the File API and handed to pdf-lib, a JavaScript library that parses the full PDF object graph, walks its indirect objects, and re-serialises the document with object streams enabled. Image re-encoding is performed by drawing each eligible image onto an in-page canvas and exporting it again — also entirely local. Your document is never uploaded, and no third-party service is contacted at any point.",
      "One detail worth stating plainly rather than glossing over: when a document contains JPEG 2000 images, the decoder for that format is fetched from this site the first time it is needed, in the same way the rest of the page loads. It carries no part of your document — nothing of your file travels with that request. Beyond it, compressing produces no network activity at all.",
      "There are no server-side queues, no temporary cloud storage, and no logging of your document's contents. That matters for sensitive material: a contract with personal details, a financial statement, or a confidential internal report is processed and discarded within your own device. Close the tab and everything held in memory is released.",
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
          "Office exports frequently leave uncompressed xref tables and redundant object dictionaries behind, and the structural pass alone often makes a worthwhile dent. If the document is mostly text, any preset gives a similar result, because there is little image data for the quality setting to act on.",
      },
      {
        label: "A photo-heavy brochure or portfolio",
        description:
          "This is where the presets genuinely diverge and where the largest reductions come from. Start with Low, check how the images look, and step up to Medium or High only if you need more. Compare the reported reduction against the visible cost before you commit.",
      },
      {
        label: "A black-and-white scanned document",
        description:
          "Scans stored as bitonal CCITT or JBIG2 images are skipped by every preset, so the reduction may be very small no matter what you pick. That is a deliberate safeguard — re-encoding a bitonal scan as JPEG would look worse and could make it larger.",
      },
      {
        label: "A file that must stay byte-faithful",
        description:
          "No preset can give you that, because all three re-encode images. For an archive, a legal submission, or a print workflow where the images must be exactly as supplied, keep the original file and treat the compressed copy as a distribution version only.",
      },
      {
        label: "A document that is taking a long time",
        description:
          "Every image is decoded and re-encoded one at a time, so a long image-heavy document can run for a minute or more. The progress messages name the object being processed, so a slow run is working rather than stuck.",
      },
      {
        label: "When this tool is the wrong choice",
        description:
          "The compressor reduces encoding quality but never reduces pixel dimensions. A 6000-pixel-wide scan stays 6000 pixels wide, so a very high-resolution document can remain large even on High. If you need genuine downsampling to smaller dimensions, this tool does not do that.",
      },
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
          "Images encoded as JPEG, as PNG-style Flate streams, or as JPEG 2000 — including those whose colour space is recorded as an ICCBased profile, which is what Word, InDesign and most scanner software produce. Left alone are bitonal CCITT and JBIG2 scans, transparency masks themselves, and CMYK, indexed-palette, Separation or Lab images, none of which can be re-encoded without risking a corrupted or colour-shifted result. An image that merely has a transparency mask is still recompressed; its mask is preserved intact alongside it.",
      },
      {
        question: "Does compression reduce text or image quality?",
        answer:
          "Text, fonts, and vector graphics are never altered by any preset; they are restructured, not re-rendered. Images are re-encoded by all three: Low at 82% quality, Medium at 75%, and High at 50%. Each discards some image data permanently, Low the least. No preset preserves images exactly, so if you need a byte-faithful copy, keep your original file.",
      },
      {
        question: "What size reduction can I expect?",
        answer:
          "It varies too much to promise a figure. The largest reductions come from documents full of photographs, diagrams or scanned pages, because recompressing images is where most of the saving is found. Text-only documents change far less, since only the internal structure can be tightened. The panel reports the actual reduction for your specific file once it finishes, so you can decide from the real number rather than an estimate.",
      },
      {
        question: "Why is it taking so long?",
        answer:
          "Because every eligible image is decoded, redrawn and re-encoded individually, and that work scales with how many images the document holds rather than with its page count. A text-heavy file finishes quickly; a long image-heavy one can run for a minute or more. The progress messages update as each object is processed, so you can tell a slow run from a stalled one.",
      },
      {
        question: "Could the compressed file come out larger than the original?",
        answer:
          "Individual images are protected against this — a re-encoded image is only substituted when it is genuinely smaller than the original, otherwise the original bytes are kept. The document as a whole is re-serialised with object streams, which on an already well-optimised PDF may yield little or no gain. The panel shows both sizes, so you can simply discard the result and keep your original if it did not help.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "The tool imposes none. What actually limits you is RAM: the whole document is parsed in memory, and each image being re-encoded occupies more of it on top. Large image-heavy documents on low-memory devices are where you would run into trouble.",
      },
      {
        question: "Why does the result look different in Safari?",
        answer:
          "Image re-encoding uses the browser's own canvas export, and Safari does not always honour the requested JPEG quality value the way other browsers do — it may apply system graphics defaults instead. The panel shows a note about this in Safari whichever preset you choose, since all three re-encode images through the same canvas path.",
      },
      {
        question: "Can I compress a password-protected PDF?",
        answer:
          "No. Encryption is detected as the file loads and the tool stops with a message naming the file rather than producing a broken download. This applies to any encrypted PDF, including one that opens without a password but carries permission restrictions such as print-only. Remove the password or the restrictions in your PDF software first, then compress the unprotected copy.",
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
          "If only certain pages need sharing, extract them first and compress just the pages you actually send.",
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
        description="Reduce PDF file size with three quality levels — entirely in your browser."
        icon={Minimize2}
        accent="from-emerald-500 to-teal-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <CompressPdfPanel />
      </ToolPageLayout>
    </>
  );
}
