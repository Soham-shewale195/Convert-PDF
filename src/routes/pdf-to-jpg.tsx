import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import PdfToJpgPanel from "@/components/tools/PdfToJpgPanel";

export const Route = createFileRoute("/pdf-to-jpg")({
  head: () => ({
    meta: [
      { title: "PDF to JPG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert PDF pages into JPG images instantly in your browser." },
      { property: "og:title", content: "PDF to JPG Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert PDF pages into JPG images instantly in your browser." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/pdf-to-jpg" },
    ],
  }),
  component: PdfToJpgPage,
});

function PdfToJpgPage() {
  return (
    <ToolPageLayout
      title="PDF to JPG"
      description="Convert each PDF page to a high-quality JPG image."
      icon={ImageIcon}
      accent="from-violet-500 to-purple-500"
    >
      <PdfToJpgPanel />
    </ToolPageLayout>
  );
}
