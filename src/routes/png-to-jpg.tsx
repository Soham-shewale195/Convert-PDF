import { createFileRoute } from "@tanstack/react-router";
import { FileImage } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";

export const Route = createFileRoute("/png-to-jpg")({
  head: () => ({
    meta: [
      { title: "PNG to JPG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert PNG images to compact JPG format online for free." },
      { property: "og:title", content: "PNG to JPG Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert PNG images to compact JPG format online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/png-to-jpg" },
    ],
  }),
  component: PngToJpgPage,
});

function PngToJpgPage() {
  return (
    <ToolPageLayout
      title="PNG to JPG"
      description="Convert PNG images to compact JPG format."
      icon={FileImage}
      accent="from-orange-500 to-amber-500"
    >
      <FormatConvertPanel from="png" to="jpg" />
    </ToolPageLayout>
  );
}
