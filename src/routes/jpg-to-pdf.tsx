import { createFileRoute } from "@tanstack/react-router";
import { FileImage } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import JpgToPdfPanel from "@/components/tools/JpgToPdfPanel";

export const Route = createFileRoute("/jpg-to-pdf")({
  head: () => ({
    meta: [
      { title: "JPG to PDF Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert JPG and PNG images into PDF documents online for free." },
      { property: "og:title", content: "JPG to PDF Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert JPG and PNG images into PDF documents online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/jpg-to-pdf" },
    ],
  }),
  component: JpgToPdfPage,
});

function JpgToPdfPage() {
  return (
    <ToolPageLayout
      title="JPG/PNG to PDF"
      description="Bundle images into a single PDF document."
      icon={FileImage}
      accent="from-amber-500 to-orange-500"
    >
      <JpgToPdfPanel />
    </ToolPageLayout>
  );
}
