import { createFileRoute } from "@tanstack/react-router";
import { FileType2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ExcelToPdfPanel from "@/components/tools/ExcelToPdfPanel";

export const Route = createFileRoute("/excel-to-pdf")({
  head: () => ({
    meta: [
      { title: "Excel to PDF Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert Excel spreadsheets (.xlsx, .csv) into PDF documents online for free." },
      { property: "og:title", content: "Excel to PDF Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert Excel spreadsheets (.xlsx, .csv) into PDF documents online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/excel-to-pdf" },
    ],
  }),
  component: ExcelToPdfPage,
});

function ExcelToPdfPage() {
  return (
    <ToolPageLayout
      title="Excel to PDF"
      description="Convert spreadsheets (.xlsx, .csv) into PDF documents."
      icon={FileType2}
      accent="from-emerald-500 to-green-500"
    >
      <ExcelToPdfPanel />
    </ToolPageLayout>
  );
}
