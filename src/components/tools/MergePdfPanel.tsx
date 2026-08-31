import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";
import { loadPdf, pdfErrorMessage } from "@/lib/pdf-load";

export default function MergePdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(true, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Picking new files after a finished run returns the panel to idle, so the
  // tool can be used again without reloading. Matches the image tool panels.
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    if (files.length < 2) return toast.error("Pick at least 2 PDFs");
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const f of files) {
        const src = await loadPdf(await f.arrayBuffer(), f.name);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, "merged.pdf");
      setState("success");
      toast.success("Merged successfully!");
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error(pdfErrorMessage(e, "Merge failed"));
    }
  };
  return (
    <>
      {state !== "processing" && Dropzone}
      {state !== "processing" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={files.length < 2}>
          Merge & prepare
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
