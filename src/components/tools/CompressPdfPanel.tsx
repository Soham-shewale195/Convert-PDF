import { useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";

export default function CompressPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const bytes = await src.save({ useObjectStreams: true });
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-compressed.pdf");
      setState("success");
      toast.success("Compressed successfully!");
    } catch (e) { console.error(e); setState("idle"); toast.error("Compress failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <p className="text-xs text-muted-foreground mt-3">Lossless re-save using object streams. Best for text-heavy PDFs.</p>}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Compress PDF</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
