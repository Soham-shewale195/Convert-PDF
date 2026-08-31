import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";

export default function JpgToPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(true, "image/*");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Picking new files after a finished run returns the panel to idle, so the
  // tool can be used again without reloading. Matches the image tool panels.
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    if (!files.length) return;
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const img = /png$/i.test(f.name) ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, "images.pdf");
      setState("success");
      toast.success("PDF ready");
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error("Failed");
    }
  };
  return (
    <>
      {state !== "processing" && Dropzone}
      {state !== "processing" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Create PDF
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
