import { createFileRoute } from "@tanstack/react-router";
import { Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CompressPdfPanel from "@/components/tools/CompressPdfPanel";

export const Route = createFileRoute("/compress-pdf")({
  head: () => ({
    meta: [
      { title: "Compress PDF Online Free | ConvertPDF" },
      { name: "description", content: "Reduce PDF file size online while maintaining quality." },
      { property: "og:title", content: "Compress PDF Online Free | ConvertPDF" },
      { property: "og:description", content: "Reduce PDF file size online while maintaining quality." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/compress-pdf" },
    ],
  }),
  component: CompressPdfPage,
});

function CompressPdfPage() {
  return (
    <ToolPageLayout
      title="Compress PDF"
      description="Reduce PDF file size while maintaining quality."
      icon={Minimize2}
      accent="from-emerald-500 to-teal-500"
    >
      <CompressPdfPanel />
    </ToolPageLayout>
  );
}
