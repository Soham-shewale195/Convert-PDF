import { createFileRoute } from "@tanstack/react-router";
import { FileStack } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import MergePdfPanel from "@/components/tools/MergePdfPanel";

export const Route = createFileRoute("/merge-pdf")({
  head: () => ({
    meta: [
      { title: "Merge PDF Online Free | ConvertPDF" },
      { name: "description", content: "Merge multiple PDF files online for free. Fast, secure and browser-based PDF merger." },
      { property: "og:title", content: "Merge PDF Online Free | ConvertPDF" },
      { property: "og:description", content: "Merge multiple PDF files online for free. Fast, secure and browser-based PDF merger." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/merge-pdf" },
    ],
  }),
  component: MergePdfPage,
});

function MergePdfPage() {
  return (
    <ToolPageLayout
      title="Merge PDFs"
      description="Combine multiple PDF files into one document."
      icon={FileStack}
      accent="from-blue-500 to-cyan-500"
    >
      <MergePdfPanel />
    </ToolPageLayout>
  );
}
