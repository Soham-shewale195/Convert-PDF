import { createFileRoute } from "@tanstack/react-router";
import { Maximize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ResizeImagePanel from "@/components/tools/ResizeImagePanel";

export const Route = createFileRoute("/resize-image")({
  head: () => ({
    meta: [
      { title: "Resize Image Online Free | ConvertPDF" },
      { name: "description", content: "Scale and resize images to custom dimensions online for free." },
      { property: "og:title", content: "Resize Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Scale and resize images to custom dimensions online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/resize-image" },
    ],
  }),
  component: ResizeImagePage,
});

function ResizeImagePage() {
  return (
    <ToolPageLayout
      title="Resize Image"
      description="Scale images to custom dimensions."
      icon={Maximize2}
      accent="from-rose-500 to-pink-500"
    >
      <ResizeImagePanel />
    </ToolPageLayout>
  );
}
