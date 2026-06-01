import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import TextToPdfPanel from "@/components/tools/TextToPdfPanel";

export const Route = createFileRoute("/text-to-pdf")({
  head: () => ({
    meta: [
      { title: "Text to PDF Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert plain text files into PDF documents instantly in your browser." },
      { property: "og:title", content: "Text to PDF Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert plain text files into PDF documents instantly in your browser." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/text-to-pdf" },
    ],
  }),
  component: TextToPdfPage,
});

function TextToPdfPage() {
  return (
    <ToolPageLayout
      title="Text to PDF"
      description="Convert plain text files into PDF documents."
      icon={FileText}
      accent="from-blue-500 to-indigo-500"
    >
      <TextToPdfPanel />
    </ToolPageLayout>
  );
}
