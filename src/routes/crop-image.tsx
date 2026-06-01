import { createFileRoute } from "@tanstack/react-router";
import { Crop } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CropImagePanel from "@/components/tools/CropImagePanel";

export const Route = createFileRoute("/crop-image")({
  head: () => ({
    meta: [
      { title: "Crop Image Online Free | ConvertPDF" },
      { name: "description", content: "Trim images to any area you need online for free." },
      { property: "og:title", content: "Crop Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Trim images to any area you need online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/crop-image" },
    ],
  }),
  component: CropImagePage,
});

function CropImagePage() {
  return (
    <ToolPageLayout
      title="Crop Image"
      description="Trim images to any area you need."
      icon={Crop}
      accent="from-sky-500 to-blue-500"
    >
      <CropImagePanel />
    </ToolPageLayout>
  );
}
