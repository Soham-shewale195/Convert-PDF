import { createFileRoute } from "@tanstack/react-router";
import { FileText, ShieldCheck, Zap, Smartphone, Cloud, Type, Lock, Download } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import TextToPdfPanel from "@/components/tools/TextToPdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/text-to-pdf")({
  head: () => ({
    meta: [
      { title: "Text to PDF Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Convert plain text files (.txt) into formatted PDF documents instantly in your browser. 100% private and secure.",
      },
      { property: "og:title", content: "Text to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Convert plain text files (.txt) into formatted PDF documents instantly in your browser. 100% private and secure.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/text-to-pdf" }],
  }),
  component: TextToPdfPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Text to PDF Conversion?",
    paragraphs: [
      "Text to PDF conversion takes plain, unformatted text files (.txt, .md, .csv) and renders them into a paginated, universally readable PDF document. While raw text files are great for writing code or taking quick notes, they lack inherent structure and can display differently depending on the operating system and text editor used to open them.",
      "Our converter bridges this gap by reading your text file and drawing it onto standard PDF pages using pdf-lib. It automatically handles line wrapping, pagination, and margin spacing, resulting in a professional document that looks identical on every device.",
    ],
  },
  howTo: {
    heading: "How to Convert Text to PDF in 3 Steps",
    steps: [
      {
        title: "Upload a text file",
        description:
          "Select a .txt file from your computer or phone. The text data is loaded securely into your local browser.",
      },
      {
        title: "Process the text",
        description:
          "Click to generate. The tool automatically wraps long lines, splits the text into separate pages, and applies a clean font.",
      },
      {
        title: "Download the PDF",
        description:
          "Once the document is generated, the tool immediately triggers a download of your new, formatted PDF file.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Text to PDF Converter",
    items: [
      {
        icon: ShieldCheck,
        title: "Zero uploads",
        description:
          "Your private notes, logs, or drafts are processed strictly in your browser and never sent over the internet.",
      },
      {
        icon: Type,
        title: "Automatic wrapping",
        description:
          "The tool automatically wraps long sentences to fit within standard document margins, preventing cut-off text.",
      },
      {
        icon: Lock,
        title: "Fixed formatting",
        description:
          "Unlike raw text files, a PDF locks the layout in place, ensuring it looks the same on every screen.",
      },
      {
        icon: Zap,
        title: "Instant generation",
        description:
          "Text parsing and PDF generation happen in milliseconds using optimized JavaScript.",
      },
      {
        icon: Cloud,
        title: "No software needed",
        description:
          "Convert text files from any device without installing a word processor like Microsoft Word.",
      },
      {
        icon: Smartphone,
        title: "Mobile support",
        description: "Quickly convert a notes file on your phone into a shareable PDF document.",
      },
    ],
  },
  useCases: {
    heading: "When to Convert Text to PDF",
    intro:
      "Converting raw text into a PDF is ideal when you need to share information in a finalized, unalterable format:",
    items: [
      {
        label: "Sharing code snippets",
        description:
          "Convert raw application logs, configuration files, or code snippets into a readable PDF for non-technical clients.",
      },
      {
        label: "Finalizing notes",
        description:
          "Turn meeting minutes or lecture notes written in a plain text editor into a formal document.",
      },
      {
        label: "Publishing terms",
        description:
          "Convert plain text software licenses or terms of service into a standard PDF format for distribution.",
      },
      {
        label: "Submitting assignments",
        description:
          "Convert plain text essays or homework into a PDF, which is the preferred format for most educational portals.",
      },
      {
        label: "Archiving data",
        description:
          "Preserve raw data exports or chat logs as paginated PDFs for long-term secure archiving.",
      },
    ],
  },
  privacy: {
    heading: "Private Text Processing",
    paragraphs: [
      "Plain text files often contain highly sensitive information, such as passwords, personal notes, or proprietary code. ConvertPDF ensures your data remains secure by utilizing a zero-upload architecture. When you select a text file, the browser's FileReader API reads the text directly into memory.",
      "The pdf-lib library then paginates the text and constructs the PDF document entirely within the client-side environment. No server communication occurs, meaning your sensitive text is immune to interception or unauthorized logging. Once you close the tab, the text is purged from memory.",
    ],
  },
  faqs: [
    {
      question: "What file types are supported?",
      answer:
        "The tool is designed for plain text files, typically ending in .txt. It can also process other unformatted text files like .csv, .log, or .md, provided they contain readable characters.",
    },
    {
      question: "Will it preserve my bold and italic formatting?",
      answer:
        "No. Plain text files do not contain formatting data. If you upload a file with markdown asterisks (**bold**), they will be rendered as literal asterisks. The converter applies a uniform font and size to all text.",
    },
    {
      question: "How does it handle very long lines of text?",
      answer:
        "The tool automatically calculates the page margins and wraps long strings of text to the next line. You don't have to worry about text running off the edge of the page.",
    },
    {
      question: "What font is used for the PDF?",
      answer:
        "The converter currently uses a standard, highly legible built-in PDF font (such as Helvetica or Courier) to ensure broad compatibility and small file sizes.",
    },
    {
      question: "Does the tool support non-English characters?",
      answer:
        "Yes, basic Unicode characters are supported, though rendering depends on the standard fonts embedded in the PDF specification. Complex scripts may require specialized font embedding.",
    },
    {
      question: "Can I edit the text after converting it to PDF?",
      answer:
        "Once converted, the text is drawn onto the PDF canvas. While standard PDF editors can modify the text, it is much easier to edit the original .txt file and convert it again.",
    },
    {
      question: "Is there a word count limit?",
      answer:
        "There is no strict word limit. However, converting text files with hundreds of thousands of words may cause the browser to consume significant memory while paginating the document.",
    },
  ],
  relatedTools: [
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      description: "Combine multiple PDFs into one",
      icon: FileText,
      accent: "from-blue-500 to-cyan-500",
    },
  ],
  relatedArticleSlugs: ["browser-pdf-converter-privacy", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function TextToPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert Text to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Text to PDF"
        description="Convert plain text files into PDF documents."
        icon={FileText}
        accent="from-blue-500 to-indigo-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <TextToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
