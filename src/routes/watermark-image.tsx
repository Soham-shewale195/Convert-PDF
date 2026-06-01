import { createFileRoute } from "@tanstack/react-router";
import { Droplets } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WatermarkImagePanel from "@/components/tools/WatermarkImagePanel";

export const Route = createFileRoute("/watermark-image")({
  head: () => ({
    meta: [
      { title: "Watermark Image Online Free | ConvertPDF" },
      { name: "description", content: "Overlay custom text on any image online for free." },
      { property: "og:title", content: "Watermark Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Overlay custom text on any image online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/watermark-image" },
    ],
  }),
  component: WatermarkImagePage,
});

function WatermarkImagePage() {
  return (
    <ToolPageLayout
      title="Watermark Image"
      description="Overlay custom text on any image."
      icon={Droplets}
      accent="from-amber-500 to-yellow-500"
    >
      <WatermarkImagePanel />
    </ToolPageLayout>
  );
}
