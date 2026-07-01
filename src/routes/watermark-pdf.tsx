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
          "Add custom text watermarks to your PDF documents online for free. Highly customizable, private, and instant in your browser.",
      },
      { property: "og:title", content: "Watermark PDF Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Add custom text watermarks to your PDF documents online for free. Highly customizable, private, and instant in your browser.",
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
      "Our watermarking tool embeds your chosen text directly into the PDF content stream using pdf-lib. It modifies the document structure in your browser to permanently draw the text with your selected opacity, color, size, and rotation angle over the existing page contents.",
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
        title: "Customize your watermark",
        description:
          "Type your watermark text, then adjust the size, color, opacity, and rotation angle. The settings will apply consistently to every page.",
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
        title: "100% Private",
        description:
          "Watermarking happens entirely on your device. Your sensitive documents never leave your browser.",
      },
      {
        icon: Type,
        title: "Fully customizable",
        description:
          "Control exactly how your watermark looks by adjusting its text, color, rotation, opacity, and size.",
      },
      {
        icon: Eye,
        title: "High visibility",
        description:
          "The watermark is embedded directly into the page content stream, ensuring it prints and displays reliably.",
      },
      {
        icon: Zap,
        title: "Instant processing",
        description:
          "No waiting for uploads or server queues. The text is drawn onto the pages in milliseconds.",
      },
      {
        icon: Cloud,
        title: "Free forever",
        description: "No subscriptions, no hidden fees, and no account required to use the tool.",
      },
      {
        icon: Smartphone,
        title: "Mobile friendly",
        description:
          "Apply watermarks to contracts or drafts directly from your smartphone or tablet.",
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
        "You can adjust the opacity (transparency) of the watermark text. By lowering the opacity, the text beneath the watermark will remain perfectly visible and readable.",
    },
    {
      question: "Does the tool support image watermarks like logos?",
      answer:
        "Currently, this tool is designed specifically for text-based watermarks. You can type any text, adjust its appearance, and apply it across your document.",
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
        "Yes, the tool calculates the dimensions of each page individually and centers the watermark text, accounting for your chosen rotation angle and font size.",
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
  relatedArticleSlugs: ["best-free-pdf-tools", "browser-pdf-converter-privacy"],
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
