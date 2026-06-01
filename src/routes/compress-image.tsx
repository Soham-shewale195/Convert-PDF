import { createFileRoute } from "@tanstack/react-router";
import { Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CompressImagePanel from "@/components/tools/CompressImagePanel";

export const Route = createFileRoute("/compress-image")({
  head: () => ({
    meta: [
      { title: "Compress Image Online Free | ConvertPDF" },
      { name: "description", content: "Reduce image file size with quality control online for free." },
      { property: "og:title", content: "Compress Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Reduce image file size with quality control online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/compress-image" },
    ],
  }),
  component: CompressImagePage,
});

function CompressImagePage() {
  return (
    <ToolPageLayout
      title="Compress Image"
      description="Reduce image file size with quality control."
      icon={Minimize2}
      accent="from-lime-500 to-green-500"
    >
      <CompressImagePanel />
    </ToolPageLayout>
  );
}
