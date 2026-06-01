import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";

export const Route = createFileRoute("/jpg-to-png")({
  head: () => ({
    meta: [
      { title: "JPG to PNG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert JPG images to lossless PNG format online for free." },
      { property: "og:title", content: "JPG to PNG Converter Online Free | ConvertPDF" },
      { property: "og:description", content: "Convert JPG images to lossless PNG format online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/jpg-to-png" },
    ],
  }),
  component: JpgToPngPage,
});

function JpgToPngPage() {
  return (
    <ToolPageLayout
      title="JPG to PNG"
      description="Convert JPG images to lossless PNG format."
      icon={ArrowLeftRight}
      accent="from-teal-500 to-cyan-500"
    >
      <FormatConvertPanel from="jpg" to="png" />
    </ToolPageLayout>
  );
}
