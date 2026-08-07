import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Type,
  Lock,
  Download,
  Table,
  Droplets,
} from "lucide-react";
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
          "Paste or type text and get a formatted, paginated PDF instantly. No file to upload, no account, and nothing ever leaves your browser.",
      },
      { property: "og:title", content: "Text to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Paste or type text and get a formatted, paginated PDF instantly. No file to upload, no account, and nothing ever leaves your browser.",
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
      "Text to PDF conversion takes plain, unformatted text and renders it into a paginated, universally readable document. Raw text is great for notes, logs, and code, but it has no fixed layout — line breaks, margins, and page boundaries all shift depending on the editor and screen it lands on.",
      "This tool works straight from a text box: you paste or type, and it draws the result onto A4 pages with jsPDF. There is no file picker and no upload step, which makes it the fastest route from something in your clipboard to a finished PDF. It handles line wrapping, page breaks, and margins for you, producing a document that reads the same everywhere.",
    ],
  },
  howTo: {
    heading: "How to Turn Pasted Text into a PDF in 3 Steps",
    steps: [
      {
        title: "Paste or type your text",
        description:
          "Write directly into the text box, or paste from your clipboard. There is no file to choose and nothing is read from your disk.",
      },
      {
        title: "Process the text",
        description:
          "Click to generate. The tool wraps long lines to the page width, breaks the text across A4 pages, and sets it in 11pt Helvetica.",
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
        title: "Nothing touches your disk",
        description:
          "There is no file picker at all. Your text exists only in the page's text box and in memory, so there is no upload, no temporary file, and nothing left behind.",
      },
      {
        icon: Type,
        title: "Wrapped to the measured width",
        description:
          "Lines are wrapped against the real rendered width of the text at 11pt, not a character count, so nothing runs past the margin.",
      },
      {
        icon: Lock,
        title: "Layout stops moving",
        description:
          "Plain text reflows to whatever window opens it. Once it is a PDF, the line breaks and page breaks are fixed for every reader.",
      },
      {
        icon: Zap,
        title: "Clipboard to PDF in one step",
        description:
          "Skipping the save-a-file-then-upload-it round trip is the whole point: paste, click once, and the document is built.",
      },
      {
        icon: Cloud,
        title: "A4 with proper margins",
        description:
          "Output is A4 with 48pt margins and 16pt line spacing, so it prints sensibly instead of running edge to edge.",
      },
      {
        icon: Smartphone,
        title: "Useful on a phone",
        description:
          "Turning a note or a message thread into a PDF on a phone normally means installing an app; here it is a paste and a tap.",
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
      "Text you would paste into a converter is often exactly the text you would least like to send somewhere — credentials, private notes, internal code, a draft you have not shared yet. This tool removes the question entirely, because there is no transmission step to trust: your text never leaves the text box on this page.",
      "The jsPDF library, which ships inside the page itself, paginates the text and assembles the PDF in your browser's memory. No request is made while you generate a document, and because there is no file picker, nothing is ever read from or written to your disk either. Closing the tab discards the text and the generated PDF together.",
    ],
  },
  faqs: [
    {
      question: "Where do I upload my .txt file?",
      answer:
        "You don't — and that is deliberate. This tool takes text directly from a text box rather than from a file. Open your .txt, .md, .log, or .csv in any editor, select all, copy, and paste it in. It saves a round trip, and it means the tool never needs access to your file system.",
    },
    {
      question: "Will it preserve my bold and italic formatting?",
      answer:
        "No. Plain text carries no formatting data. If you paste Markdown, the asterisks in **bold** are rendered as literal asterisks rather than interpreted. Everything is set in one uniform font and size.",
    },
    {
      question: "How does it handle very long lines of text?",
      answer:
        "The tool automatically calculates the page margins and wraps long strings of text to the next line. You don't have to worry about text running off the edge of the page.",
    },
    {
      question: "What font is used for the PDF?",
      answer:
        "Text is set in Helvetica at 11pt, one of the standard fonts built into the PDF specification. Because the font does not need to be embedded, the resulting files stay small and open reliably in any reader.",
    },
    {
      question: "Does the tool support non-English characters?",
      answer:
        "Only partially, and it is worth knowing where the line falls. Western European accented characters — é, ï, ç, ü and similar — come through correctly, as do typographic marks like en dashes, em dashes, and ellipses. Cyrillic, Greek, Arabic, Chinese, Japanese, and emoji do not: the built-in Helvetica font has no glyphs for them, and rather than showing an error the tool will produce a PDF containing unreadable characters where that text should be. If your text uses those scripts, this tool is not the right one for it.",
    },
    {
      question: "Can I edit the text after converting it to PDF?",
      answer:
        "Once generated, the text is drawn as fixed page content. PDF editors can modify it, but the simplest route is to keep your text in whatever you wrote it in, then paste and generate again after making changes.",
    },
    {
      question: "Is there a word count limit?",
      answer:
        "No limit is enforced. Pagination measures and places every line individually, so very long inputs — on the order of a whole book pasted at once — will make the browser work noticeably harder and may make the tab unresponsive while it finishes. Ordinary notes, logs, and documents are not affected.",
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
    {
      name: "Excel to PDF",
      href: "/excel-to-pdf",
      description: "Turn spreadsheets into PDF",
      icon: Table,
      accent: "from-emerald-500 to-green-500",
    },
    {
      name: "Watermark PDF",
      href: "/watermark-pdf",
      description: "Stamp text across the result",
      icon: Droplets,
      accent: "from-cyan-500 to-blue-500",
    },
  ],
  relatedArticleSlugs: ["text-to-pdf-converter-guide", "browser-pdf-converter-privacy"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function TextToPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert Text to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Text to PDF"
        description="Paste or type text and get a formatted PDF — no file upload needed."
        icon={FileText}
        accent="from-blue-500 to-indigo-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <TextToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
