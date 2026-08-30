import { createFileRoute } from "@tanstack/react-router";
import {
  FileType2,
  ShieldCheck,
  Table,
  Lock,
  Zap,
  Maximize2,
  Smartphone,
  FileText,
  FileStack,
  Droplets,
} from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ExcelToPdfPanel from "@/components/tools/ExcelToPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/excel-to-pdf")({
  head: () => ({
    meta: [
      { title: "Excel to PDF Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Convert Excel and CSV files (.xlsx, .xls, .csv) into landscape PDFs in your browser. Every worksheet becomes its own page. Private and free.",
      },
      { property: "og:title", content: "Excel to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Convert Excel and CSV files (.xlsx, .xls, .csv) into landscape PDFs in your browser. Every worksheet becomes its own page. Private and free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/excel-to-pdf" }],
  }),
  component: ExcelToPdfPage,
});

const convertSteps = [
  {
    title: "Upload a spreadsheet",
    description:
      "Select one .xlsx, .xls, or .csv file. SheetJS parses the workbook in your browser, reading every worksheet it contains.",
  },
  {
    title: "Generate the document",
    description:
      "Click convert. Each worksheet starts a fresh landscape page headed with its sheet name, the page width is divided evenly between however many columns the widest row has, and each cell's text is wrapped to fit its column.",
  },
  {
    title: "Download",
    description:
      "The finished PDF downloads under your original filename with the extension swapped — budget.xlsx becomes budget.pdf.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is Excel to PDF Conversion?",
    paragraphs: [
      "A spreadsheet is a live calculation model. A PDF is a fixed record. Converting between them freezes the numbers as they stood, so a recipient sees what you saw rather than a document that recalculates, reflows, or opens differently depending on which spreadsheet application they happen to have.",
      "This tool parses your workbook with SheetJS and draws the values onto landscape A4 pages with jsPDF. Every worksheet in the file is converted — not just the active one — and each starts its own page under a heading with the sheet name, so a multi-tab workbook goes through in a single pass.",
      "It is a value extractor rather than a layout renderer, and that distinction governs everything about the output. The tool reads what is stored in each cell and places it as plain text in an evenly divided grid. It does not reproduce your spreadsheet's appearance, and the table below sets out exactly where that line falls before you convert something that depends on it.",
    ],
  },
  {
    kind: "matrix",
    heading: "What Survives the Conversion",
    intro:
      "Because only cell values are read, anything that lives in the formatting layer is left behind. This is the honest accounting:",
    columnHeadings: ["In your spreadsheet", "In the generated PDF"],
    rows: [
      {
        label: "Cell values",
        cells: [
          "Text and numbers held in each cell",
          "Carried across in full, wrapped to the column width",
        ],
      },
      {
        label: "Formulas",
        cells: [
          "=SUM(B2:B40), recalculating live",
          "The last calculated result only — the formula itself is not carried over",
        ],
      },
      {
        label: "Currency and number formats",
        cells: ["1234.5 displayed as £1,234.50", "1234.5 — the stored value, without its format"],
      },
      {
        label: "Percentages",
        cells: ["0.15 displayed as 15%", "0.15"],
      },
      {
        label: "Dates",
        cells: [
          "A date cell showing 01/03/2024",
          "The underlying serial number, such as 45352, in .xlsx and .xls files",
        ],
      },
      {
        label: "Bold, colours, conditional formatting",
        cells: ["Applied per cell", "Dropped. Everything is plain 9-point text"],
      },
      {
        label: "Borders and gridlines",
        cells: ["Drawn around cells", "Dropped. The output is positioned text with no ruled lines"],
      },
      {
        label: "Merged cells",
        cells: [
          "One value spanning several columns",
          "Not honoured — the value lands in the first column of the span",
        ],
      },
      {
        label: "Column widths",
        cells: [
          "Set individually per column",
          "Ignored. Every column receives an equal share of the page width",
        ],
      },
      {
        label: "Charts, images, pivot tables",
        cells: ["Embedded in the sheet", "Not rendered at all — only cell values are read"],
      },
      {
        label: "Hidden rows and columns",
        cells: ["Hidden from view", "Included, because the underlying cells are still read"],
      },
      {
        label: "Multiple worksheets",
        cells: [
          "Tabs along the bottom",
          "All converted, each starting a new page headed with its name",
        ],
      },
    ],
  },
  {
    kind: "steps",
    heading: "Converting a Workbook",
    steps: convertSteps,
  },
  {
    kind: "decision",
    heading: "Is This the Right Converter?",
    intro:
      "This tool is built for getting data out of a spreadsheet and into a fixed, readable document. It is not built to reproduce how the spreadsheet looks. Which of these is your situation?",
    branches: [
      {
        condition: "You need a readable record of the numbers, and appearance is secondary.",
        recommendation: "This is exactly what the tool does. Upload and convert.",
      },
      {
        condition:
          "The output must match your spreadsheet's own print layout, with your fonts, colours, and page breaks.",
        recommendation:
          "Use Excel's or LibreOffice's built-in Export as PDF instead — they render the sheet as designed, which this tool does not attempt.",
      },
      {
        condition: "Dates or currency values need to appear formatted, not as raw numbers.",
        recommendation:
          "Convert those columns to text in the spreadsheet first, so the formatted string is what gets stored in the cell and therefore what reaches the PDF.",
      },
      {
        condition: "The sheet contains charts or images that need to be in the document.",
        recommendation:
          "Not supported here — only cell values are read. Export from your spreadsheet application instead.",
      },
      {
        condition: "You have several workbooks that should end up as one document.",
        recommendation: "Convert each one, then combine the resulting PDFs with",
        href: "/merge-pdf",
        linkLabel: "Merge PDF",
      },
    ],
  },
  {
    kind: "cards",
    heading: "How the Converter Behaves",
    columns: 3,
    items: [
      {
        icon: ShieldCheck,
        title: "Payroll data never transits",
        description:
          "A salary sheet or customer list is parsed where it already sits. Nothing is uploaded, and no third-party service is involved.",
      },
      {
        icon: Table,
        title: "Every worksheet, one pass",
        description:
          "All tabs are converted, each starting its own page under its sheet name — not just the first or the active one.",
      },
      {
        icon: Lock,
        title: "Values, not formulas",
        description:
          "Cells are read at their computed values, so recipients see the numbers as they stood without a live, editable calculation model.",
      },
      {
        icon: Zap,
        title: "Long cells wrap",
        description:
          "Cell contents are measured against the column width and broken across as many lines as they need, rather than being truncated.",
      },
      {
        icon: Maximize2,
        title: "Landscape by default",
        description:
          "Pages are generated in landscape, giving wide tables meaningfully more horizontal room than portrait would.",
      },
      {
        icon: Smartphone,
        title: "No spreadsheet app needed",
        description:
          "Open an emailed .xlsx on a phone with nothing installed that can read it, and still get a legible PDF out.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "Where This Fits in Practice",
    intro: "The conversion suits data you want on the record, and suits presentation work poorly:",
    items: [
      {
        label: "Circulating figures that must not be edited",
        description:
          "Sending a budget or a set of results as a PDF removes the ambiguity of a spreadsheet that someone might resort, refilter, or accidentally recalculate before quoting it back to you.",
      },
      {
        label: "Making a CSV readable for someone else",
        description:
          "A raw CSV opens as a wall of commas for anyone without the right tool. Converting produces a paginated, columnised document that anyone can read.",
      },
      {
        label: "Attaching data to a report or submission",
        description:
          "Where a process demands PDF attachments, converting the working spreadsheet gets the data into the accepted format without retyping it.",
      },
      {
        label: "Archiving a snapshot of a live model",
        description:
          "A spreadsheet that keeps changing has no fixed state. Converting at a point in time captures what the numbers were on that date, formulas resolved.",
      },
      {
        label: "Reading a workbook without a spreadsheet application",
        description:
          "On a device with no Excel or Sheets, converting to PDF is often the quickest way to see what a file actually contains.",
      },
      {
        label: "When to reach for Excel's own export",
        description:
          "Anything where the look matters — an invoice template, a formatted price list, a branded report — should be exported from the spreadsheet application itself. This tool will produce the right numbers in the wrong clothes.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Secure Financial Data Processing",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Spreadsheets hold some of the most sensitive material an organisation has: payroll, customer lists, financial records, commercial models. Uploading those to a third-party conversion service is a real risk, and this tool removes it by never uploading anything. SheetJS parses your file in your computer's RAM and jsPDF draws the values onto pages, both locally.",
      "No third-party service is contacted at any stage. The two libraries load as script files from this site the first time you use the tool, in the same way the rest of the page loads; the conversion itself generates no network activity. There is no backend to breach, no upload log to leak, and nothing to delete afterwards.",
    ],
  },
  {
    kind: "faq",
    heading: "Excel to PDF: Questions and Answers",
    faqs: [
      {
        question: "Which spreadsheet formats are supported?",
        answer:
          "Modern Excel workbooks (.xlsx), the older binary Excel format (.xls), and comma-separated values files (.csv). One file per conversion.",
      },
      {
        question: "Why did my dates turn into numbers?",
        answer:
          "Excel stores a date as a serial number counting days from an epoch, and the date you see is a display format applied on top. This tool reads the stored value, so the serial number is what reaches the PDF — 45352 rather than 01/03/2024. The same applies to currency and percentages, where 1234.5 and 0.15 are what is stored behind £1,234.50 and 15%. To carry the formatted version across, convert those columns to text in the spreadsheet before converting.",
      },
      {
        question: "Will my formulas be preserved?",
        answer:
          "No, and that is usually the point. A PDF is static. The converter reads each cell's last calculated value and prints that, so recipients see the resulting numbers without inheriting a live model they could alter.",
      },
      {
        question: "How are multiple sheets handled?",
        answer:
          "Every worksheet in the workbook is converted, not just the first. Each starts on a fresh page headed with its name, so the tab structure of your file becomes the page order of the PDF. There is nothing to consolidate beforehand.",
      },
      {
        question: "Will my colours, fonts, and borders carry over?",
        answer:
          "No. The tool reads cell values and places them as plain 9-point text in an evenly divided column grid. Background colours, fonts, borders, merged cells, and conditional formatting are all dropped, and there are no ruled gridlines around cells — the output is positioned text rather than a drawn table.",
      },
      {
        question: "What happens to cells containing a lot of text?",
        answer:
          "They wrap. Cell contents are measured against the column width and broken across as many lines as needed, and the row grows taller so the tallest cell in it fits, rather than being truncated or replaced with an ellipsis. One caveat: the page break is evaluated after a row has been drawn, so an unusually tall row that starts near the bottom of a page can overrun the bottom edge.",
      },
      {
        question: "What if my sheet has a lot of columns?",
        answer:
          "The available page width is divided equally between however many columns the widest row contains, so more columns means a narrower share each. Past a couple of dozen columns the space per column becomes small enough that text wraps heavily and rows grow very tall. Original column widths are not consulted, so a sheet with one wide notes column and several narrow ones will not reflect that balance.",
      },
      {
        question: "Is there a limit on rows?",
        answer:
          "No limit is enforced. Because every cell is measured and placed individually in the browser, very large datasets — on the order of tens of thousands of rows — make the tab work hard and can leave it briefly unresponsive while the document is built.",
      },
      {
        question: "Can I edit the table afterwards?",
        answer:
          "The values stay selectable as text, but the layout is fixed once generated. To change the structure, edit the original spreadsheet and convert again.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Related Document Tools",
    tools: [
      {
        name: "Text to PDF",
        href: "/text-to-pdf",
        description: "For prose rather than tabular data — paste and generate.",
        icon: FileText,
        accent: "from-blue-500 to-indigo-500",
      },
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description: "Combine several converted workbooks into a single report.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        name: "Watermark PDF",
        href: "/watermark-pdf",
        description: "Mark converted figures as DRAFT before circulating them.",
        icon: Droplets,
        accent: "from-cyan-500 to-blue-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Spreadsheet Conversion Reading",
    slugs: ["excel-to-pdf-formatting-guide", "freelance-contract-management-free"],
  },
];

const howToSteps = convertSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function ExcelToPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert Excel to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Excel to PDF"
        description="Convert spreadsheets (.xlsx, .xls, .csv) into landscape PDFs — every worksheet on its own page."
        icon={FileType2}
        accent="from-emerald-500 to-green-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <ExcelToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
