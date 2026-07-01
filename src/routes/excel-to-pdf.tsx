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
          "Convert Excel spreadsheets (.xlsx, .csv) into clean PDF documents instantly in your browser. 100% private and free.",
      },
      { property: "og:title", content: "Excel to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Convert Excel spreadsheets (.xlsx, .csv) into clean PDF documents instantly in your browser. 100% private and free.",
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
      "By converting your spreadsheet to a PDF, you freeze the layout, rows, and columns into a universally readable format. Our tool parses your Excel data using SheetJS and renders the tables directly onto standard PDF pages using pdf-lib, ensuring your data looks clean and professional on any device.",
    ],
  },
  howTo: {
    heading: "How to Convert Excel to PDF in 3 Steps",
    steps: [
      {
        title: "Upload a spreadsheet",
        description:
          "Select an Excel file (.xlsx) or CSV file from your device. The data is parsed locally in your browser.",
      },
      {
        title: "Process the data",
        description:
          "Click to generate. The tool automatically reads the rows and columns, calculating column widths and formatting the data into neat tables.",
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
        title: "Financial privacy",
        description:
          "Your spreadsheets are processed entirely in your browser. Sensitive financial data is never uploaded.",
      },
      {
        icon: Table,
        title: "Clean table rendering",
        description:
          "The converter automatically formats your data into clear, bordered tables for optimal readability.",
      },
      {
        icon: Lock,
        title: "Immutable data",
        description:
          "Once converted, the numbers cannot be easily altered or accidentally overwritten by the recipient.",
      },
      {
        icon: Zap,
        title: "Instant generation",
        description:
          "The spreadsheet parsing and PDF construction happen in milliseconds, saving you time.",
      },
      {
        icon: Cloud,
        title: "No Excel required",
        description:
          "You don't need a Microsoft Office subscription to generate a PDF from an Excel file.",
      },
      {
        icon: Smartphone,
        title: "Works on mobile",
        description: "Convert an emailed spreadsheet into a PDF directly from your phone.",
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
          "Excel print settings can be notoriously difficult to manage. Converting to PDF ensures the table fits the page perfectly.",
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
      "Our tool utilizes SheetJS to parse your .xlsx or .csv files locally in your computer's RAM. The pdf-lib library then draws the extracted data onto PDF pages. Because there is no backend server involved, your proprietary data is completely protected from interception, logging, or data breaches.",
    ],
  },
  faqs: [
    {
      question: "Which spreadsheet formats are supported?",
      answer:
        "The tool supports standard Microsoft Excel formats (.xlsx) as well as Comma-Separated Values (.csv) files.",
    },
    {
      question: "Will it preserve my Excel formulas?",
      answer:
        "No. A PDF is a static document. The converter reads the calculated values of the cells and prints those numbers onto the page. The underlying formulas will not be included or functional in the PDF.",
    },
    {
      question: "How does it handle multiple sheets?",
      answer:
        "Currently, the tool parses the first active worksheet in your Excel file. If you have data across multiple sheets, you should consolidate it or convert each sheet individually.",
    },
    {
      question: "What happens if a row is very long?",
      answer:
        "The tool attempts to calculate appropriate column widths. If a row contains too much data to fit horizontally on a standard portrait page, the text may wrap within the cell or require you to adjust the original spreadsheet before conversion.",
    },
    {
      question: "Will my custom colors and fonts carry over?",
      answer:
        "The tool extracts the raw data and renders it into a clean, standardized table format. Custom background colors, varied fonts, and complex cell formatting are stripped away to ensure a neat final document.",
    },
    {
      question: "Can I edit the PDF table later?",
      answer:
        "While the data is selectable as text in the resulting PDF, the table structure is fixed. To make structural changes, you should edit the original Excel file and convert it again.",
    },
    {
      question: "Is there a limit to how many rows I can convert?",
      answer:
        "There is no hard limit, but because processing happens in the browser, extremely large datasets (e.g., tens of thousands of rows) may cause your browser tab to become unresponsive.",
    },
  ],
  relatedTools: [
    {
      name: "Text to PDF",
      href: "/text-to-pdf",
      description: "Convert text files to PDF",
      icon: FileType2,
      accent: "from-blue-500 to-indigo-500",
    },
  ],
  relatedArticleSlugs: ["browser-pdf-converter-privacy", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function ExcelToPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert Excel to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="Excel to PDF"
        description="Convert spreadsheets (.xlsx, .csv) into PDF documents."
        icon={FileType2}
        accent="from-emerald-500 to-green-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <ExcelToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
