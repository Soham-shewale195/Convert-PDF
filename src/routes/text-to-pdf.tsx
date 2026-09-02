import { createFileRoute } from "@tanstack/react-router";
import { FileText, Table, Droplets, FileStack } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import TextToPdfPanel from "@/components/tools/TextToPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
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

const writeSteps = [
  {
    title: "Paste or type into the box",
    description:
      "Write directly in the text area, or paste from your clipboard. There is no file picker anywhere in this tool, so nothing is read from your disk and nothing needs saving first.",
  },
  {
    title: "Generate",
    description:
      "Click the button. Every line is measured against the available text width, wrapped where it needs to be, and placed one after another until the page runs out of room, at which point a new page starts.",
  },
  {
    title: "Download text.pdf",
    description:
      "The finished document downloads immediately. It is always named text.pdf, since there was no source filename to inherit.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is Text to PDF Conversion?",
    paragraphs: [
      "Plain text has no layout. Where the lines break, how wide the margins are, where one page ends and the next begins — none of that is stored in a .txt file. It is decided fresh by whatever editor, terminal, or phone screen opens it, which is why the same log file looks different everywhere you read it.",
      "Converting to PDF fixes those decisions permanently. This tool works straight from a text box: you paste, it measures and paginates, and you get an A4 document that reads identically for every recipient. There is no file picker and no upload step, which makes it the shortest possible path from something in your clipboard to a finished document.",
      "It is deliberately a plain-text tool, not a document editor. Everything comes out in one font at one size, because that is all plain text can describe. If you paste Markdown, the asterisks around **bold** arrive as literal asterisks — the tool sets what you gave it, without interpreting it.",
    ],
  },
  {
    kind: "steps",
    heading: "From Clipboard to Document",
    variant: "timeline",
    steps: writeSteps,
  },
  {
    kind: "comparison",
    heading: "What Changes When Text Becomes a PDF",
    intro:
      "The point of the conversion is to stop the layout moving. This is what is actually different on the other side:",
    columns: ["Your plain text", "The generated PDF"],
    rows: [
      {
        aspect: "Line breaks",
        a: "Decided by the window width, so they move every time it is resized.",
        b: "Fixed where the tool wrapped them, at a measured width of about 499 points.",
      },
      {
        aspect: "Pages",
        a: "No concept of a page at all — it is one continuous stream.",
        b: "Divided into A4 pages, with a new page started whenever the next line would cross the bottom margin.",
      },
      {
        aspect: "Margins",
        a: "None, or whatever padding the viewing app applies.",
        b: "A uniform 48-point margin on all four sides.",
      },
      {
        aspect: "Typeface",
        a: "Whatever the reader's app defaults to, usually monospaced.",
        b: "Helvetica at 11 points with 16-point line spacing, identical for every reader.",
      },
      {
        aspect: "Column alignment",
        a: "Aligned columns in logs and tables hold together in a monospaced view.",
        b: "Helvetica is proportional, so hand-aligned columns will no longer line up.",
      },
      {
        aspect: "Editing",
        a: "Trivially editable by anyone with a text editor.",
        b: "Drawn as fixed page content; changing it means editing the source and generating again.",
      },
    ],
  },
  {
    kind: "definitions",
    heading: "The Layout the Tool Applies",
    intro:
      "Every setting is fixed. Knowing the numbers helps you predict how much text lands on a page:",
    terms: [
      {
        term: "A4 portrait, measured in points",
        definition:
          "Pages are 595 by 842 points, the standard A4 size. A point is 1/72 of an inch, so this is the same page you would get from any word processor set to A4.",
      },
      {
        term: "A 48-point margin on every side",
        definition:
          "That is two thirds of an inch, leaving roughly 499 points of usable width for text. It prints sensibly rather than running edge to edge.",
      },
      {
        term: "Helvetica at 11 points",
        definition:
          "One of the standard fonts built into the PDF format, so it does not need to be embedded. That keeps the file small and means it opens reliably in any reader.",
      },
      {
        term: "16 points of line spacing",
        definition:
          "Every line advances the same distance regardless of content, which is what makes the pagination predictable.",
      },
      {
        term: "Wrapping by measured width",
        definition:
          "Long lines are broken against the real rendered width of the text at 11 points, not by counting characters, so nothing overruns the margin. Blank lines in your input are preserved as blank lines, which keeps paragraph spacing intact.",
      },
      {
        term: "Automatic page breaks",
        definition:
          "Before each line is placed, the tool checks whether it would cross the bottom margin, and starts a new page if so. There is no manual page break and no way to force one.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Text Processing",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Text you would paste into a converter is often exactly the text you would least like to send somewhere — credentials, private notes, internal code, a draft you have not shared yet. This tool removes the question entirely, because there is no transmission step to trust: your text never leaves the text box on this page.",
      "The jsPDF library paginates the text and assembles the document in your browser's memory. No third-party service is involved, and because there is no file picker, nothing is ever read from or written to your disk either. The library itself loads as a script file from this site in the same way the rest of the page loads; generating a document after that produces no network activity. Closing the tab discards the text and the generated PDF together.",
    ],
  },
  {
    kind: "checklist",
    heading: "When Pasting Beats Uploading",
    intro:
      "The absence of a file picker is the feature. These are the situations where it matters most:",
    items: [
      {
        label: "Turning a message thread into a document",
        description:
          "Chat logs, support transcripts, and email threads live in an app rather than a file. Copy the relevant part, paste, and you have a dated document without exporting anything first.",
      },
      {
        label: "Submitting written work to a portal",
        description:
          "Educational and application portals almost always want PDF. Text written in a plain editor or a notes app converts directly without a word processor in between.",
      },
      {
        label: "Sharing logs or configuration with someone non-technical",
        description:
          "A paginated PDF is easier for a client or a manager to open and annotate than a raw .log or .conf file their machine may not know how to display.",
      },
      {
        label: "Handling text you would rather not upload anywhere",
        description:
          "Credentials, internal notes, an unsent draft, an incident write-up. Because the tool has no file picker and no upload step, there is no transmission to reason about at all.",
      },
      {
        label: "Fixing a document's layout before archiving",
        description:
          "Notes and exports that reflow differently on every machine become stable once paginated, which matters when the record needs to look the same years later.",
      },
      {
        label: "When to use something else",
        description:
          "If you need headings, bold, tables, or images, this is the wrong tool — everything comes out as uniform 11-point Helvetica. And if your text uses a non-Latin script, see the FAQ below before converting.",
      },
    ],
  },
  {
    kind: "faq",
    heading: "Text to PDF: Questions and Answers",
    faqs: [
      {
        question: "Where do I upload my .txt file?",
        answer:
          "You don't, and that is deliberate. This tool takes text from a text box rather than from a file. Open your .txt, .md, .log, or .csv in any editor, select all, copy, and paste it in. It saves a round trip, and it means the tool never needs access to your file system.",
      },
      {
        question: "Will it preserve bold and italic formatting?",
        answer:
          "No. Plain text carries no formatting data. Pasting Markdown renders the asterisks in **bold** as literal asterisks rather than interpreting them, and everything is set in one uniform font and size.",
      },
      {
        question: "What font and page size does it use?",
        answer:
          "A4 portrait at 595 by 842 points, with 48-point margins, set in Helvetica at 11 points with 16-point line spacing. Helvetica is one of the standard fonts built into the PDF specification, so it is not embedded in the file — which keeps the output small and reliably openable anywhere.",
      },
      {
        question: "How does it handle very long lines?",
        answer:
          "They wrap. Each line is measured against the usable page width at 11 points and broken where it needs to be, so nothing runs past the margin. Wrapping uses real rendered width rather than a character count, so it is accurate for proportional text.",
      },
      {
        question: "Will my aligned columns survive?",
        answer:
          "Probably not. Text aligned with spaces — tables in a log file, ASCII art, column output from a terminal — relies on every character being the same width. Helvetica is proportional, so those alignments break. There is no monospaced option in this tool.",
      },
      {
        question: "Does it support non-English characters?",
        answer:
          "Only partially, and it is worth knowing where the line falls. Western European accented characters such as é, ï, ç and ü come through correctly, as do typographic marks like en dashes, em dashes, and ellipses. Cyrillic, Greek, Arabic, Chinese, Japanese, and emoji do not: the built-in Helvetica font has no glyphs for them, and rather than showing an error the tool produces a PDF containing unreadable characters where that text should be. If your text uses those scripts, this is not the right tool for it.",
      },
      {
        question: "What is the file called?",
        answer:
          "Always text.pdf. Because you pasted the content rather than selecting a file, there is no original filename to derive one from — give it a proper name once it lands in your downloads folder.",
      },
      {
        question: "Is there a length limit?",
        answer:
          "No limit is enforced. Pagination measures and places every line individually, so very long inputs — on the order of a whole book pasted at once — will make the browser work noticeably harder and may leave the tab unresponsive while it finishes. Ordinary notes, logs, and documents are unaffected.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Other Ways Into a PDF",
    tools: [
      {
        name: "Excel to PDF",
        href: "/excel-to-pdf",
        description: "For tabular data, which needs real columns rather than pasted text.",
        icon: Table,
        accent: "from-emerald-500 to-green-500",
      },
      {
        name: "Watermark PDF",
        href: "/watermark-pdf",
        description: "Stamp DRAFT or CONFIDENTIAL across the document you just generated.",
        icon: Droplets,
        accent: "from-cyan-500 to-blue-500",
      },
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description: "Combine the generated file with other documents into one.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Further Reading",
    slugs: ["text-to-pdf-converter-guide", "pdf-vs-word-differences"],
  },
];

const howToSteps = writeSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function TextToPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert Text to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Text to PDF"
        description="Paste or type text and get a formatted PDF — no file upload needed."
        icon={FileText}
        accent="from-blue-500 to-indigo-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <TextToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
