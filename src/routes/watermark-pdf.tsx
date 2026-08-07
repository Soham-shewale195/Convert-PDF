import { createFileRoute } from "@tanstack/react-router";
import {
  Droplets,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Type,
  Eye,
  FileStack,
  Scissors,
} from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WatermarkPdfPanel from "@/components/tools/WatermarkPdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/watermark-pdf")({
  head: () => ({
    meta: [
      { title: "Watermark PDF Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Stamp any text across every page of a PDF for free. Preset styling, embedded into the page content, private and instant in your browser.",
      },
      { property: "og:title", content: "Watermark PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Stamp any text across every page of a PDF for free. Preset styling, embedded into the page content, private and instant in your browser.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/watermark-pdf" }],
  }),
  component: WatermarkPdfPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PDF Watermarking?",
    paragraphs: [
      "PDF watermarking is the process of superimposing text or an image onto every page of a document. A watermark acts as a visible stamp — such as 'CONFIDENTIAL' or 'DRAFT' — that indicates the document's status, ownership, or intended use, helping to prevent unauthorized distribution or clarify its context.",
      "Our watermarking tool embeds your text directly into the PDF content stream using pdf-lib. You supply the wording; the tool applies a single fixed house style to it — semi-transparent red, angled across the page, and scaled to the page size — drawing it over the existing contents of every page.",
    ],
  },
  howTo: {
    heading: "How to Add a Watermark in 3 Steps",
    steps: [
      {
        title: "Upload your PDF",
        description:
          "Select or drag and drop your document into the tool. The file loads securely and privately into your browser's memory.",
      },
      {
        title: "Type your watermark text",
        description:
          'Replace the default "CONFIDENTIAL" with any wording you need. Styling is preset, so the text is the only thing to decide — and it applies identically to every page.',
      },
      {
        title: "Apply and download",
        description:
          "Click to apply the watermark. The tool quickly redraws each page with your custom text and prepares the new, watermarked PDF for download.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Watermark Tool",
    items: [
      {
        icon: ShieldCheck,
        title: "Contracts never transit",
        description:
          "pdf-lib is bundled into the page, so marking an NDA or offer letter involves no upload and no runtime request to any server.",
      },
      {
        icon: Type,
        title: "One decision to make",
        description:
          "Colour, angle, opacity, and size are preset to a legible standard. You choose the wording; everything else is already settled.",
      },
      {
        icon: Eye,
        title: "Part of the page, not a layer",
        description:
          "The text is written into the page's content stream rather than added as an annotation, so it cannot be hidden by toggling layers off in a viewer.",
      },
      {
        icon: Zap,
        title: "Scales to the page",
        description:
          "Font size is derived from each page's own dimensions, so the stamp stays proportionate across mixed A4, Letter, and landscape pages in one document.",
      },
      {
        icon: Cloud,
        title: "Unlimited documents",
        description:
          "No subscription, no per-file quota, and no trial watermark of ours layered on top of yours.",
      },
      {
        icon: Smartphone,
        title: "Mark before you forward",
        description:
          "Stamp a draft as DRAFT on your phone in the moment you're about to send it, rather than waiting to get back to a desktop.",
      },
    ],
  },
  useCases: {
    heading: "When to Watermark a PDF",
    intro:
      "Adding a watermark is an essential step for document security, branding, and version control:",
    items: [
      {
        label: "Protecting drafts",
        description:
          "Stamp 'DRAFT' across pages to ensure readers know the document is not the final version.",
      },
      {
        label: "Securing confidential data",
        description:
          "Mark financial or legal documents as 'CONFIDENTIAL' to deter unauthorized sharing.",
      },
      {
        label: "Copyrighting work",
        description:
          "Add a copyright notice or your name across creative work to establish ownership before distribution.",
      },
      {
        label: "Designating samples",
        description:
          "Label portfolio pieces or templates as 'SAMPLE' so they cannot be passed off as original client work.",
      },
      {
        label: "Tracking distribution",
        description:
          "Create multiple copies of a document, each watermarked with a specific recipient's name.",
      },
    ],
  },
  privacy: {
    heading: "Secure Browser-Based Watermarking",
    paragraphs: [
      "When you add a watermark using ConvertPDF, the entire process takes place locally on your device. The tool loads your file using the browser's File API, and pdf-lib interprets the document structure in memory. It then iterates through every page and uses the drawText method to embed your watermark directly into the PDF content stream.",
      "Your document is never uploaded, stored, or transmitted to any external server. Because all data manipulation occurs strictly within the sandboxed environment of your browser, your information remains entirely under your control.",
    ],
  },
  faqs: [
    {
      question: "Can someone easily remove the watermark?",
      answer:
        "Our tool embeds the watermark text directly into the PDF's content stream, making it a permanent part of the page geometry. While dedicated PDF editors can technically select and delete text objects, it cannot be removed by simply toggling a layer in a standard viewer.",
    },
    {
      question: "Will the watermark cover up important text?",
      answer:
        "The watermark is drawn at 25% opacity, so the page content underneath stays visible and readable through it. That opacity is a fixed part of the preset and is not adjustable in this tool.",
    },
    {
      question: "Can I change the colour, angle, size, or opacity?",
      answer:
        "No. This tool deliberately ships one preset: red at 25% opacity, rotated -35°, with the font size derived from each page's smaller dimension. The watermark text itself is the only input. If you need brand-specific styling, you will want a desktop PDF editor.",
    },
    {
      question: "Does the tool support image watermarks like logos?",
      answer:
        "No. This tool draws text only. There is no image or logo upload — you type the wording and it is rendered with the built-in Helvetica Bold font.",
    },
    {
      question: "Can I choose which pages receive the watermark?",
      answer:
        "The tool applies the watermark to every page in the document automatically. If you only want specific pages watermarked, you can split the PDF first, watermark those pages, and then merge them back.",
    },
    {
      question: "Will adding a watermark increase the file size?",
      answer:
        "The file size increase is generally negligible. Text watermarks use very little data, as they rely on standard fonts and minimal vector instructions.",
    },
    {
      question: "Can I watermark a password-protected PDF?",
      answer:
        "No. If a document is encrypted with an open password, the browser cannot parse its contents. You must remove the password using your PDF software before applying a watermark.",
    },
    {
      question: "Are the watermarks centered automatically?",
      answer:
        "The tool reads each page's dimensions and positions the text from the page centre, estimating the horizontal offset from your text's character count. It is a close approximation rather than true glyph-measured centring, so very short or very long wording can sit slightly off-centre.",
    },
    {
      question: "Can I use non-Latin text, such as Cyrillic or Chinese?",
      answer:
        "No. The watermark is drawn with pdf-lib's built-in Helvetica Bold, which only covers the Latin-1 character set. Accented Western European characters work, but Cyrillic, Greek, Arabic, and CJK text will cause the operation to fail with a generic error rather than produce a watermark.",
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
  ],
  relatedArticleSlugs: ["how-to-watermark-pdf-documents", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function WatermarkPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Add a Watermark to a PDF" steps={howToSteps} />
      <ToolPageLayout
        title="Watermark PDF"
        description="Add custom text watermarks to your document."
        icon={Droplets}
        accent="from-cyan-500 to-blue-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <WatermarkPdfPanel />
      </ToolPageLayout>
    </>
  );
}
