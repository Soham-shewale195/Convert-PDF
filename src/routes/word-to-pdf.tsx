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
          "Convert a .docx to PDF in your browser, two ways: rebuild it as clean searchable text, or keep your document's own fonts, colours and page layout.",
      },
      { property: "og:title", content: "Word to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Convert a .docx to PDF in your browser, two ways: rebuild it as clean searchable text, or keep your document's own fonts, colours and page layout.",
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
      'Pick a mode, then click "Convert to PDF". Fast reads the document\'s structure — headings, emphasis, lists, tables, images and links — and redraws it as text on A4 pages. Faithful lays the document out with its own fonts and page setup and captures each page as it appears. Nothing is uploaded either way; the whole conversion runs in this tab.',
  },
  {
    title: "Download, and check the summary",
    description:
      "The finished PDF downloads under your original filename with a .pdf extension. A short message afterwards says what actually happened — how many tables and images Fast carried across, or how many pages Faithful rendered, and whether any font had to be substituted — rather than leaving you to spot it yourself.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "callout",
    heading: "Two Modes, Opposite Trade-Offs",
    tone: "warn",
    paragraphs: [
      "No single conversion can be both fully editable and visually exact, because the two goals pull against each other. A PDF whose text you can select and search has to be rebuilt from the document's structure, and rebuilding means making fresh layout decisions. A PDF that looks like your document has to preserve those decisions, which means capturing the page as it appears rather than re-typesetting it. This tool offers both and asks you to choose.",
      "Fast reads the structure and redraws it as real text: heading levels, bold and italic, list markers and numbering, table rows and columns, images, and working hyperlinks all survive, but the visual design does not — everything is set in one typeface on a clean A4 page. Faithful renders the document as laid out and places each finished page into the PDF: fonts, colours, sizes, alignment, headers, footers and page breaks come through, at the cost that each page is an image, so its text cannot be selected or searched. Faithful is a close match rather than a reproduction — it is not Word's own rendering engine, so small differences remain, and the table below lists them. Pick Fast when the words matter and someone may need to search or copy them; pick Faithful when the document has to look right.",
    ],
  },
  {
    kind: "prose",
    heading: "What Converting Word to PDF Actually Does",
    paragraphs: [
      "A .docx is not really a document in the way it appears on screen. It is a ZIP package holding XML that describes content and intent — this run is bold, this paragraph is a level-two heading, these cells form a table — plus the images. How that turns into a page is decided at display time by whichever program opens it, which is why a document can reflow when it moves between machines, or between Word and Google Docs.",
      "A PDF is the opposite. It records finished pages: this glyph at this coordinate, this rule at that one. Converting is therefore not a repackaging but a rebuild — something has to make the layout decisions that Word would otherwise make live, and here that something is this page.",
      "Fast runs that rebuild in two stages. The .docx is parsed into a structural description of the document, and that structure is then drawn onto A4 pages: headings become progressively smaller bold lines, bold and italic runs keep their emphasis mid-sentence, list items get bullets or numbers, tables are drawn as real bordered grids, and images are embedded where their format allows. Body text is set in Helvetica at 11 points with 48-point margins, and pages break as the content fills them. Those numbers are Fast's own, not your document's.",
      "Faithful works the other way around. The document is laid out with its own styling — its fonts, its spacing, its table widths, its section and page breaks — and each resulting page is captured and placed into the PDF at the page size the document itself specifies. There are no fixed margins or type sizes to quote here, because none are imposed: whatever the document asks for is what gets drawn.",
    ],
  },
  {
    kind: "steps",
    heading: "From .docx to PDF",
    steps: convertSteps,
  },
  {
    kind: "matrix",
    heading: "What Survives, and What Does Not",
    intro:
      "The two modes fail in opposite directions, so the honest answer depends on which you pick. Everything below was checked by converting a document containing each of these features and comparing the result against the same file exported from Word itself — not inferred from documentation:",
    columnHeadings: ["Fast", "Faithful"],
    rows: [
      {
        label: "Selectable, searchable text",
        cells: [
          "Yes. The output is real text you can copy, search and edit.",
          "No. Each page is an image of the page, so text cannot be selected or searched.",
        ],
      },
      {
        label: "Original fonts",
        cells: [
          "Not kept. Everything is set in one typeface.",
          "Kept when the document embeds the font, or when your device already has it. Anything else falls back to the closest match your device can offer.",
        ],
      },
      {
        label: "Text colour",
        cells: ["Not kept. Everything comes out black.", "Kept."],
      },
      {
        label: "Text size",
        cells: [
          "Heading levels keep a size hierarchy, but body text is one fixed size.",
          "Kept, at the sizes the document sets.",
        ],
      },
      {
        label: "Bold and italic",
        cells: ["Kept, including mid-sentence.", "Kept."],
      },
      {
        label: "Underline and strikethrough",
        cells: ["Lost. The words remain as ordinary text.", "Kept."],
      },
      {
        label: "Alignment",
        cells: [
          "Lost. Everything is drawn left-aligned.",
          "Kept, including centred, right-aligned and justified text.",
        ],
      },
      {
        label: "Headings",
        cells: [
          "The hierarchy survives, but not Word's heading fonts or colours.",
          "Kept as laid out. A heading styled through the document's theme font may render in a different typeface of similar character.",
        ],
      },
      {
        label: "Lists",
        cells: [
          "Kept. Bullets are drawn as •, numbered items renumbered from 1.",
          "Kept as laid out.",
        ],
      },
      {
        label: "Tables",
        cells: [
          "Kept as a bordered grid with evenly divided columns. Cells merged across columns are honoured; cells merged down rows are not.",
          "Kept as laid out, including merged cells, shading and column widths.",
        ],
      },
      {
        label: "Images",
        cells: ["Embedded when they are PNG or JPEG.", "Kept as laid out."],
      },
      {
        label: "Hyperlinks",
        cells: [
          "Kept and clickable — the destination travels into the PDF.",
          "Visible, but not clickable. A page image carries no links.",
        ],
      },
      {
        label: "Headers, footers and page numbers",
        cells: ["Not carried over.", "Kept, with page numbers filled in for each page."],
      },
      {
        label: "Page size and page breaks",
        cells: [
          "Replaced with A4 and fixed margins; pages break where content runs out of room.",
          "Your document's own page size, and breaks where Word puts them.",
        ],
      },
      {
        label: "Line spacing",
        cells: [
          "Fixed, and unrelated to the document's own.",
          "Very close to the original, though occasionally a shade looser.",
        ],
      },
      {
        label: "Non-Latin scripts",
        cells: [
          "Not supported. Cyrillic, Greek, Arabic and CJK come out as unreadable characters.",
          "Rendered correctly, provided your device has a font for the script.",
        ],
      },
      {
        label: "File size",
        cells: ["Smaller.", "Larger, because every page carries a full-resolution image."],
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
          "That depends on the mode, and neither answer is an unqualified yes. Fast rebuilds the document rather than photographing it: heading levels, bold and italic, list markers, table structure, images and hyperlinks are preserved, but your original fonts, colours, alignment, headers and footers are not, and everything is set in one typeface on a clean A4 page. Faithful comes close — fonts, colours, sizes, alignment, headers, footers and page breaks all come through — but it is not Word's own rendering engine, so expect small residual differences such as slightly looser line spacing, and a heading styled through the document's theme font may resolve to a different typeface of similar character. Faithful's text is also part of a page image, so it cannot be selected or searched.",
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
          "In Faithful mode, yes. Cyrillic, Greek, Arabic, Hebrew, Chinese, Japanese and Korean all render correctly, because the page is drawn with real fonts before it is captured — the only requirement is that your device has a font covering that script. Fast is Latin-only: accented characters such as é, ï, ç and ü come through, along with en dashes, em dashes and typographic quotes, but the built-in PDF font has no glyphs for non-Latin scripts, so that text arrives unreadable. For a document in one of those scripts, use Faithful, or export from Word.",
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
        description="Convert a .docx into a PDF — as searchable text, or as a close visual match. Two modes, opposite trade-offs."
        icon={FileType2}
        accent="from-sky-500 to-blue-600"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <WordToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
