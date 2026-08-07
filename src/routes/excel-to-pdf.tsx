import { createFileRoute } from "@tanstack/react-router";
import {
  FileType2,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Table,
  Lock,
  Download,
  FileStack,
  Droplets,
} from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ExcelToPdfPanel from "@/components/tools/ExcelToPdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
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

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Excel to PDF Conversion?",
    paragraphs: [
      "Excel to PDF conversion is the process of translating a dynamic spreadsheet (such as a .xlsx or .csv file) into a static, paginated document. Spreadsheets are excellent for calculating data and organizing information, but they can be messy to print and often display differently depending on the spreadsheet software used to open them.",
      "By converting your spreadsheet to a PDF, you freeze the rows and columns into a universally readable format. Our tool parses the workbook with SheetJS and lays the values out onto landscape A4 pages with jsPDF. Every worksheet in the file gets its own page, titled with the sheet name — so a multi-tab workbook converts in one pass rather than one tab at a time.",
    ],
  },
  howTo: {
    heading: "How to Convert Excel to PDF in 3 Steps",
    steps: [
      {
        title: "Upload a spreadsheet",
        description:
          "Select an .xlsx, .xls, or .csv file from your device. SheetJS parses the workbook locally in your browser.",
      },
      {
        title: "Process the data",
        description:
          "Click to generate. Each worksheet starts a new landscape page headed with its name, columns are divided evenly across the page width, and cell text wraps onto extra lines where it needs the room.",
      },
      {
        title: "Download the document",
        description:
          "Once the tabular data is drawn onto the PDF pages, the tool immediately triggers a download of the finalized PDF.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Spreadsheet Converter",
    items: [
      {
        icon: ShieldCheck,
        title: "Payroll data never transits",
        description:
          "SheetJS and jsPDF both ship inside this page. A salary sheet or customer list is parsed where it already sits, with no upload and no runtime request.",
      },
      {
        icon: Table,
        title: "Every worksheet, one pass",
        description:
          "All tabs in the workbook are converted, each starting its own page under its sheet name — not just the first sheet.",
      },
      {
        icon: Lock,
        title: "Values, not formulas",
        description:
          "Cells are read at their computed values, so recipients see the numbers as they stood without inheriting a live, editable calculation model.",
      },
      {
        icon: Zap,
        title: "Nothing gets cut off",
        description:
          "Long cell contents wrap onto additional lines and the row grows taller to fit, so no value is shortened or dropped from the output.",
      },
      {
        icon: Cloud,
        title: "Landscape by default",
        description:
          "Pages are generated in landscape, which gives wide tables meaningfully more horizontal room than a portrait layout would.",
      },
      {
        icon: Smartphone,
        title: "No Excel licence needed",
        description:
          "Open an emailed .xlsx on a phone with no spreadsheet app installed and still get a readable PDF out of it.",
      },
    ],
  },
  useCases: {
    heading: "When to Convert Excel to PDF",
    intro:
      "Converting a spreadsheet into a PDF is crucial when you need to share tabular data securely and professionally:",
    items: [
      {
        label: "Sharing financial reports",
        description:
          "Convert quarterly earnings or budget spreadsheets into PDFs before distributing them to stakeholders.",
      },
      {
        label: "Generating invoices",
        description:
          "If you build your invoices in Excel, convert them to PDF before sending them to clients for a professional appearance.",
      },
      {
        label: "Preparing for print",
        description:
          "Excel print settings are notoriously fiddly. Converting to landscape PDF gives you a fixed, predictable page layout to send to a printer.",
      },
      {
        label: "Publishing price lists",
        description:
          "Distribute your product catalog or service pricing as a locked PDF rather than an editable spreadsheet.",
      },
      {
        label: "Submitting timesheets",
        description:
          "Turn a timesheet tracker into a standard document format required by HR departments.",
      },
    ],
  },
  privacy: {
    heading: "Secure Financial Data Processing",
    paragraphs: [
      "Spreadsheets often contain a company's most sensitive information, including financial records, customer data, and employee payroll. Uploading these files to a third-party server for conversion poses a significant security risk. ConvertPDF eliminates this risk entirely.",
      "Our tool uses SheetJS to parse your .xlsx, .xls, or .csv file locally in your computer's RAM, and jsPDF to draw the extracted values onto landscape pages. Both libraries are bundled into the page itself, so once it has loaded, generating a PDF makes no network request at all. There is no backend to breach, no upload log to leak, and nothing to delete afterwards.",
    ],
  },
  faqs: [
    {
      question: "Which spreadsheet formats are supported?",
      answer:
        "Modern Excel workbooks (.xlsx), the older binary Excel format (.xls), and Comma-Separated Values files (.csv) are all accepted.",
    },
    {
      question: "Will it preserve my Excel formulas?",
      answer:
        "No. A PDF is a static document. The converter reads the calculated values of the cells and prints those numbers onto the page. The underlying formulas will not be included or functional in the PDF.",
    },
    {
      question: "How does it handle multiple sheets?",
      answer:
        "Every worksheet in the workbook is converted, not just the first. Each sheet starts on a fresh page headed with its name, so the tab structure of your file is preserved in the page order of the PDF. There is nothing to consolidate beforehand.",
    },
    {
      question: "What happens to cells with a lot of text in them?",
      answer:
        "They wrap. Cell contents are measured against the column width and broken across as many lines as they need, and the row grows taller so the tallest cell in it fits. Nothing is shortened, and no value is replaced with an ellipsis — the full original text always reaches the PDF.",
    },
    {
      question: "Will my custom colors and fonts carry over?",
      answer:
        "No. The tool reads cell values and places them as plain 9pt text in an evenly divided column grid. Background colours, fonts, borders, merged cells, and conditional formatting are all dropped. The output is structured positioned text rather than a drawn table — there are no ruled gridlines around cells.",
    },
    {
      question: "Can I edit the PDF table later?",
      answer:
        "The values remain selectable as text, but the layout is fixed once generated. To change the structure, edit the original spreadsheet and convert it again.",
    },
    {
      question: "Is there a limit to how many rows I can convert?",
      answer:
        "No limit is enforced. Because every cell is measured and placed individually in the browser, very large datasets — on the order of tens of thousands of rows — will make the tab work hard and may make it briefly unresponsive while the document is built. Sheets with many columns also give each column less width, which means more wrapping and taller rows.",
    },
  ],
  relatedTools: [
    {
      name: "Text to PDF",
      href: "/text-to-pdf",
      description: "Paste text, get a PDF",
      icon: FileType2,
      accent: "from-blue-500 to-indigo-500",
    },
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      description: "Combine reports into one file",
      icon: FileStack,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      name: "Watermark PDF",
      href: "/watermark-pdf",
      description: "Mark figures as draft",
      icon: Droplets,
      accent: "from-cyan-500 to-blue-500",
    },
  ],
  relatedArticleSlugs: ["excel-to-pdf-formatting-guide", "browser-pdf-converter-privacy"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function ExcelToPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert Excel to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Excel to PDF"
        description="Convert spreadsheets (.xlsx, .xls, .csv) into landscape PDFs — every worksheet on its own page."
        icon={FileType2}
        accent="from-emerald-500 to-green-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <ExcelToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
