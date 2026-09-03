import { createFileRoute } from "@tanstack/react-router";
import { FileType2, FileText, Minimize2, FileStack } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WordToPdfPanel from "@/components/tools/WordToPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/word-to-pdf")({
  head: () => ({
    meta: [
      { title: "Word to PDF Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Turn a .docx into a PDF in your browser. Headings, bold, lists, tables, images and links come across; original fonts and page setup do not.",
      },
      { property: "og:title", content: "Word to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Turn a .docx into a PDF in your browser. Headings, bold, lists, tables, images and links come across; original fonts and page setup do not.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/word-to-pdf" }],
  }),
  component: WordToPdfPage,
});

const convertSteps = [
  {
    title: "Choose a .docx file",
    description:
      "Drop a Word document onto the upload area or click to browse. The opening bytes are checked rather than the extension, so a renamed file is refused up front. Only the modern .docx format is read — the older binary .doc is a different format and is not supported.",
  },
  {
    title: "Convert",
    description:
      'Click "Convert to PDF". The document\'s structure is read first — headings, emphasis, lists, tables, images and links — and then redrawn onto A4 pages. Nothing is uploaded; the whole conversion runs in this tab.',
  },
  {
    title: "Download, and check the summary",
    description:
      "The finished PDF downloads under your original filename with a .pdf extension. A short message reports how many tables and images were carried across, and says so explicitly if an image could not be embedded rather than leaving you to spot the gap.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "callout",
    heading: "A Rebuild, Not a Photocopy",
    tone: "warn",
    paragraphs: [
      "This converter reads your document's structure and redraws it as a PDF. It is not a rendering engine like Word's own Save as PDF, so the result will not be pixel-identical to what you see in Word. What it does keep is the things that carry meaning: heading levels, bold and italic, list markers and numbering, table rows and columns, images, and working hyperlinks.",
      "What it does not keep is the visual identity: your original fonts, text colours and sizes, alignment, page headers and footers, and the exact page breaks. Everything is set in one typeface on a clean A4 page. If the document must look precisely as it does in Word — a branded template, a legal filing with fixed pagination — export it from Word itself. The table below is a complete account of both sides.",
    ],
  },
  {
    kind: "prose",
    heading: "What Converting Word to PDF Actually Does",
    paragraphs: [
      "A .docx is not really a document in the way it appears on screen. It is a ZIP package holding XML that describes content and intent — this run is bold, this paragraph is a level-two heading, these cells form a table — plus the images. How that turns into a page is decided at display time by whichever program opens it, which is why a document can reflow when it moves between machines, or between Word and Google Docs.",
      "A PDF is the opposite. It records finished pages: this glyph at this coordinate, this rule at that one. Converting is therefore not a repackaging but a rebuild — something has to make the layout decisions that Word would otherwise make live, and here that something is this page.",
      "The conversion runs in two stages. First the .docx is parsed into a structural description of the document. Then that structure is drawn onto A4 pages: headings become progressively smaller bold lines, bold and italic runs keep their emphasis mid-sentence, list items get bullets or numbers, tables are drawn as real bordered grids, and images are embedded where their format allows. Body text is set in Helvetica at 11 points with 48-point margins, and pages break automatically as the content fills them.",
    ],
  },
  {
    kind: "steps",
    heading: "From .docx to PDF",
    steps: convertSteps,
  },
  {
    kind: "specTable",
    heading: "What Survives, and What Does Not",
    intro:
      "This is the honest, complete account — verified by converting a document containing every one of these features and inspecting the resulting PDF, not inferred from the library's documentation:",
    columns: ["Feature in your .docx", "What happens"],
    rows: [
      {
        label: "Headings",
        value: "Kept. Heading levels 1 to 6 become progressively smaller bold lines.",
        note: "The hierarchy survives, but not Word's heading fonts or colours.",
      },
      {
        label: "Bold and italic",
        value: "Kept, including where the emphasis changes partway through a sentence.",
      },
      {
        label: "Underline and strikethrough",
        value: "Lost. The words remain but render as ordinary text.",
      },
      {
        label: "Bulleted and numbered lists",
        value:
          "Kept. Bullets are drawn as •, numbered items are renumbered from 1, and nested lists are indented a further level.",
      },
      {
        label: "Tables",
        value:
          "Kept as a real bordered grid, so rows and columns stay aligned and the data remains readable.",
        note: "Columns are divided evenly rather than at Word's widths. Cells merged across columns are honoured; cells merged down rows are not.",
      },
      {
        label: "Images",
        value: "Embedded when they are PNG or JPEG, which covers almost everything Word produces.",
        note: "Any image in another format is left out, and the tool tells you how many were skipped.",
      },
      {
        label: "Hyperlinks",
        value:
          "Kept and clickable. The destination URL is carried into the PDF, not just the link text.",
      },
      {
        label: "Text alignment",
        value: "Lost. Centred and right-aligned text is drawn left-aligned.",
      },
      {
        label: "Fonts, text colour and text size",
        value: "Not carried over. Body text is Helvetica at 11 points throughout.",
      },
      {
        label: "Page setup",
        value:
          "Replaced. Output is A4 portrait with 48-point margins, and pages break where the content runs out of room.",
      },
      {
        label: "Headers, footers and page numbers",
        value: "Not carried over.",
      },
      {
        label: "Footnotes, comments, text boxes and multi-column layouts",
        value: "Not reproduced.",
      },
      {
        label: "Accented Latin text",
        value:
          "Kept. Characters such as café, naïve and Müller come through correctly, as do en and em dashes.",
      },
      {
        label: "Non-Latin scripts",
        value:
          "Not supported. Cyrillic, Greek, Arabic, Hebrew and CJK have no glyphs in the built-in font and render as unreadable characters.",
        note: "If your document uses those scripts, export from Word instead — see the FAQ below.",
      },
    ],
  },
  {
    kind: "troubleshooting",
    heading: "When the PDF Does Not Look Right",
    intro:
      "Almost every surprise here traces back to the same root: the layout is rebuilt rather than photographed. These are the ones that come up:",
    items: [
      {
        problem: "The PDF does not look like my Word document",
        cause:
          "Fonts, colours, sizes, alignment and page setup are not carried over — the content is redrawn in one typeface on a clean A4 page.",
        fix: "That is the expected behaviour. If visual fidelity is what you need, use Word's own Save as PDF, which renders the document exactly as laid out.",
      },
      {
        problem: "My table columns are the wrong widths",
        cause:
          "Columns are divided evenly across the page rather than reproducing the widths set in Word.",
        fix: "The rows and columns are still correct, so the data reads properly. Long cell text wraps within its column rather than being cut off.",
      },
      {
        problem: "A table cell merged down several rows is in the wrong place",
        cause:
          "Cells merged across columns are handled, but cells merged vertically down rows are not, so later rows can shift sideways.",
        fix: "Split the vertical merge in Word before converting, or export that document from Word directly.",
      },
      {
        problem: "Text in Russian, Arabic, Chinese or Japanese is unreadable",
        cause:
          "The built-in PDF font has no glyphs for those scripts, so the characters are written but cannot be drawn correctly.",
        fix: "This tool cannot convert those documents legibly. Use Word's own PDF export, which embeds the fonts your document actually uses.",
      },
      {
        problem: "An image is missing from the output",
        cause:
          "Only PNG and JPEG images can be embedded. Anything else — an EMF or WMF drawing pasted from another Office program, for instance — is skipped.",
        fix: "The tool reports how many images were left out. Re-save those pictures as PNG inside Word, then convert again.",
      },
      {
        problem: "The tool refuses my file",
        cause:
          "The opening bytes are checked, and only the modern .docx package is accepted. An older binary .doc, or a file renamed to .docx, is rejected before any work starts.",
        fix: 'Open it in Word and use "Save As" to produce a real .docx, then convert that.',
      },
    ],
  },
  {
    kind: "checklist",
    heading: "When This Is the Right Tool",
    intro:
      "A rebuilt PDF is genuinely the better option in some situations and the wrong one in others. The dividing line is whether the words or the appearance matter more:",
    items: [
      {
        label: "Sending a document to someone without Word",
        description:
          "A PDF opens anywhere, and the recipient cannot accidentally edit it or see your tracked changes. For a plain report or letter, the rebuild reads perfectly well.",
      },
      {
        label: "Submitting to a portal that only accepts PDF",
        description:
          "Application forms, journals and procurement systems routinely reject .docx outright. This produces a valid, text-searchable PDF that satisfies the format requirement.",
      },
      {
        label: "Locking down a draft before circulating it",
        description:
          "Converting fixes the content in place. Nobody can quietly amend a paragraph and pass it on, and the file will not reflow differently on their machine.",
      },
      {
        label: "Working on a machine without Word installed",
        description:
          "No Office licence, no upload, no account. This is the case the tool exists for — a browser is the only requirement.",
      },
      {
        label: "Handling a document you would rather not upload",
        description:
          "A contract, a medical letter, a document under NDA. Because the conversion is local, there is no transmission to reason about at all.",
      },
      {
        label: "When to use Word's own export instead",
        description:
          "Anything where appearance is the point: a branded template, a CV whose layout you have tuned, a legal filing with required pagination, or a document written in a non-Latin script. Word renders those faithfully; this rebuilds them.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Your Document Never Leaves the Tab",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "The conversion is entirely local. Your browser reads the .docx into memory with the File API, unpacks it, and builds the PDF with JavaScript running on this page. The document is never uploaded, and no third-party service is contacted at any point during the conversion.",
      "Images are embedded directly from the bytes inside your document rather than being fetched over the network, so a picture in your file never becomes a request that could be logged elsewhere. The libraries that do the work load as script files from this site the first time you use the tool, in the same way the rest of the page loads; after that, converting produces no network activity at all.",
      "That local guarantee matters more for Word files than for most formats, because .docx is what contracts, medical letters, HR paperwork and legal drafts are usually written in. Nothing you convert is stored, queued or logged, and closing the tab releases both the source document and the generated PDF from memory.",
    ],
  },
  {
    kind: "faq",
    heading: "Word to PDF: Questions and Answers",
    faqs: [
      {
        question: "Will the PDF look exactly like my Word document?",
        answer:
          "No, and it is better to know that up front. The converter rebuilds your document rather than photographing it: heading levels, bold and italic, list markers, table structure, images and hyperlinks are preserved, but your original fonts, colours, alignment, headers and footers are not. Everything is set in one typeface on a clean A4 page. When appearance matters more than content, use Word's own Save as PDF.",
      },
      {
        question: "Do tables survive the conversion?",
        answer:
          "Yes, as real bordered grids, which is the main thing that makes the output readable. Rows and columns stay aligned, so a figure still sits under the right heading and beside the right label. Columns are divided evenly rather than at the widths you set in Word, and cells merged across columns are handled while cells merged down rows are not.",
      },
      {
        question: "What happens to images in my document?",
        answer:
          "PNG and JPEG images are embedded into the PDF directly from the bytes in your document — which covers essentially everything Word produces from pasted or inserted pictures. Images in other formats, such as EMF or WMF drawings pasted from another Office program, are left out, and the tool tells you how many were skipped rather than letting you discover a gap later.",
      },
      {
        question: "Can I convert an older .doc file?",
        answer:
          "No. Only the modern .docx package is supported. The older binary .doc is an entirely different format that this tool cannot read, and because the file's opening bytes are checked rather than its name, renaming a .doc to .docx will not get it through. Open it in Word and re-save it as .docx first.",
      },
      {
        question: "Does it work with languages other than English?",
        answer:
          "Only for languages written in the Latin alphabet. Accented characters such as é, ï, ç and ü come through correctly, along with en dashes, em dashes and typographic quotes. Cyrillic, Greek, Arabic, Hebrew, Chinese, Japanese and Korean do not: the built-in PDF font has no glyphs for them, so that text arrives unreadable. For documents in those scripts, export from Word, which embeds the fonts your document actually uses.",
      },
      {
        question: "Are my hyperlinks still clickable?",
        answer:
          "Yes. The destination address is carried into the PDF as a real link annotation, not just left as visible text, so clicking the link in a PDF reader opens the same page it opened in Word.",
      },
      {
        question: "Is my document uploaded anywhere?",
        answer:
          "No. The file is read into your browser's memory and converted by JavaScript running on this page. It is never transmitted, no third-party service is involved, and nothing is stored or logged. Closing the tab discards the document and the generated PDF together.",
      },
      {
        question: "How large a document can it handle?",
        answer:
          "None is imposed by the tool. The practical limit is your device's memory, since the document is unpacked and the PDF assembled in RAM. Very long documents with many large images are where a low-memory device would struggle.",
      },
      {
        question: "Can I convert several documents at once?",
        answer:
          "No — one document per pass. Selecting a new file replaces the current one, and you can run another conversion straight afterwards without reloading the page.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "After the Conversion",
    tools: [
      {
        name: "Text to PDF",
        href: "/text-to-pdf",
        description: "Paste text straight into a PDF when there is no document file to convert.",
        icon: FileText,
        accent: "from-blue-500 to-indigo-500",
      },
      {
        name: "Compress PDF",
        href: "/compress-pdf",
        description: "Shrink the converted file if the embedded images make it heavy to send.",
        icon: Minimize2,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description: "Combine the converted document with other PDFs into a single file.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Word and PDF, Compared",
    slugs: ["pdf-vs-word-differences", "how-to-convert-pdf-to-word"],
  },
];

const howToSteps = convertSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function WordToPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert Word to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Word to PDF"
        description="Convert a .docx into a PDF — structure, tables and images kept, original styling not."
        icon={FileType2}
        accent="from-sky-500 to-blue-600"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <WordToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
