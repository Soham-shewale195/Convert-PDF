import { createFileRoute } from "@tanstack/react-router";
import { RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import RotatePdfPanel from "@/components/tools/RotatePdfPanel";

export const Route = createFileRoute("/rotate-pdf")({
  head: () => ({
    meta: [
      { title: "Rotate PDF Pages Online Free | ConvertPDF" },
      { name: "description", content: "Rotate individual PDF pages or entire documents online for free." },
      { property: "og:title", content: "Rotate PDF Pages Online Free | ConvertPDF" },
      { property: "og:description", content: "Rotate individual PDF pages or entire documents online for free." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/rotate-pdf" },
    ],
  }),
  component: RotatePdfPage,
});

function RotatePdfPage() {
  return (
    <ToolPageLayout
      title="Rotate PDF"
      description="Rotate individual pages or entire documents."
      icon={RotateCw}
      accent="from-amber-500 to-orange-500"
    >
      <RotatePdfPanel />
    </ToolPageLayout>
  );
}
