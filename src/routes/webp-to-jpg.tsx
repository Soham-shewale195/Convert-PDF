import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";

export const Route = createFileRoute("/webp-to-jpg")({
  head: () => ({
    meta: [
      { title: "WEBP to JPG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert modern WEBP images to JPG format online for free." },
      { property: "og:title", content: "WEBP to JPG Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert modern WEBP images to JPG format online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/webp-to-jpg" },
    ],
  }),
  component: WebpToJpgPage,
});

function WebpToJpgPage() {
  return (
    <ToolPageLayout
      title="WEBP to JPG"
      description="Convert modern WEBP images to JPG format."
      icon={ImageIcon}
      accent="from-indigo-500 to-violet-500"
    >
      <FormatConvertPanel from="webp" to="jpg" />
    </ToolPageLayout>
  );
}
