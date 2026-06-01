import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import SplitPdfPanel from "@/components/tools/SplitPdfPanel";

export const Route = createFileRoute("/split-pdf")({
  head: () => ({
    meta: [
      { title: "Split PDF Online Free | ConvertPDF" },
      { name: "description", content: "Split PDF pages online for free. Secure browser-based PDF splitter." },
      { property: "og:title", content: "Split PDF Online Free | ConvertPDF" },
      { property: "og:description", content: "Split PDF pages online for free. Secure browser-based PDF splitter." },
    ],
    links: [
      { rel: "canonical", href: "https://converttpdf.com/split-pdf" },
    ],
  }),
  component: SplitPdfPage,
});

function SplitPdfPage() {
  return (
    <ToolPageLayout
      title="Split PDF"
      description="Extract pages into separate PDF files."
      icon={Scissors}
      accent="from-pink-500 to-rose-500"
    >
      <SplitPdfPanel />
    </ToolPageLayout>
  );
}
