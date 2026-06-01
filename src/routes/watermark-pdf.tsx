import { createFileRoute } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WatermarkPdfPanel from "@/components/tools/WatermarkPdfPanel";

export const Route = createFileRoute("/watermark-pdf")({
  head: () => ({
    meta: [
      { title: "Watermark PDF Online Free | ConvertPDF" },
      { name: "description", content: "Add custom text watermarks to your PDF documents online for free." },
      { property: "og:title", content: "Watermark PDF Online Free | ConvertPDF" },
      { property: "og:description", content: "Add custom text watermarks to your PDF documents online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/watermark-pdf" },
    ],
  }),
  component: WatermarkPdfPage,
});

function WatermarkPdfPage() {
  return (
    <ToolPageLayout
      title="Watermark PDF"
      description="Add custom text watermarks to your document."
      icon={Droplets}
      accent="from-cyan-500 to-blue-500"
    >
      <WatermarkPdfPanel />
    </ToolPageLayout>
  );
}
