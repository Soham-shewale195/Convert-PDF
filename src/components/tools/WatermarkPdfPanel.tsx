import { useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";

export default function WatermarkPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [text, setText] = useState("CONFIDENTIAL");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const font = await src.embedFont(StandardFonts.HelveticaBold);
      for (const page of src.getPages()) {
        const { width, height } = page.getSize();
        const size = Math.min(width, height) / 8;
        page.drawText(text, {
          x: width / 2 - (text.length * size) / 4, y: height / 2,
          size, font, color: rgb(0.85, 0.1, 0.1), opacity: 0.25, rotate: degrees(-35),
        });
      }
      const bytes = await src.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-watermarked.pdf");
      setState("success");
      toast.success("Watermark added");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <>
          <label className="block text-xs text-muted-foreground mt-4 mb-1.5">Watermark text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
        </>
      )}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length || !text.trim()}>Add watermark</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
