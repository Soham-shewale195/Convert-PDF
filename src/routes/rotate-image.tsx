import { createFileRoute } from "@tanstack/react-router";
import { RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import RotateFlipImagePanel from "@/components/tools/RotateFlipImagePanel";

export const Route = createFileRoute("/rotate-image")({
  head: () => ({
    meta: [
      { title: "Rotate or Flip Image Online Free | ConvertPDF" },
      { name: "description", content: "Rotate images 90°-270° or mirror horizontally online for free." },
      { property: "og:title", content: "Rotate or Flip Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Rotate images 90°-270° or mirror horizontally online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/rotate-image" },
    ],
  }),
  component: RotateImagePage,
});

function RotateImagePage() {
  return (
    <ToolPageLayout
      title="Rotate / Flip Image"
      description="Rotate 90°–270° or mirror horizontally."
      icon={RotateCw}
      accent="from-purple-500 to-fuchsia-500"
    >
      <RotateFlipImagePanel />
    </ToolPageLayout>
  );
}
