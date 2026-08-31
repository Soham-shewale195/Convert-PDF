import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";
import { loadPdf, pdfErrorMessage } from "@/lib/pdf-load";

export default function SplitPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Picking a new file after a finished run returns the panel to idle, so the
  // tool can be used again without reloading. Matches the image tool panels.
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const JSZip = (await import("jszip")).default;
      const src = await loadPdf(await files[0].arrayBuffer(), files[0].name);
      const zip = new JSZip();
      for (let i = 0; i < src.getPageCount(); i++) {
        const doc = await PDFDocument.create();
        const [p] = await doc.copyPages(src, [i]);
        doc.addPage(p);
        zip.file(`page-${i + 1}.pdf`, await doc.save());
      }
      const blob = await zip.generateAsync({ type: "blob" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-pages.zip");
      setState("success");
      toast.success("Split into pages successfully!");
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error(pdfErrorMessage(e, "Split failed"));
    }
  };
  return (
    <>
      {state !== "processing" && Dropzone}
      {state !== "processing" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Split into pages
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
