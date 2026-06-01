import { useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { ActionButton, LoadingState } from "@/components/PdfToolsUI";

export default function TextToPdfPanel() {
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!text.trim()) return toast.error("Enter some text");
    setState("processing");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const margin = 48; const w = pdf.internal.pageSize.getWidth() - margin * 2;
      const h = pdf.internal.pageSize.getHeight();
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(text, w);
      let y = margin;
      for (const l of lines) {
        if (y + 16 > h - margin) { pdf.addPage(); y = margin; }
        pdf.text(l, margin, y); y += 16;
      }
      const rawBlob = pdf.output("blob");
      const blob = new Blob([rawBlob], { type: "application/pdf" });
      await prepareDownload(blob, "text.pdf");
      setState("success");
      toast.success("PDF generated");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && (
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10}
          placeholder="Paste or write your text here…"
          className="w-full glass rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-4" />
      )}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!text.trim()}>Generate PDF</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
