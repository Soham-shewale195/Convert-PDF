import { useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import {
  useDropFiles,
  FileList,
  ActionButton,
  LoadingState,
  loadPdfJs,
} from "@/components/PdfToolsUI";

export default function PdfToJpgPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const pdfjs = await loadPdfJs();
      const pdf = await pdfjs.getDocument({ data: await files[0].arrayBuffer() }).promise;

      // Calculate total height and max width for the combined canvas
      let totalHeight = 0;
      let maxWidth = 0;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        totalHeight += viewport.height;
        maxWidth = Math.max(maxWidth, viewport.width);
        pages.push({ page, viewport });
      }

      // Create a single canvas to hold all stitched pages
      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = totalHeight;
      const ctx = canvas.getContext("2d")!;
      // Fill with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let currentY = 0;
      for (let i = 0; i < pages.length; i++) {
        const { page, viewport } = pages[i];
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = viewport.width;
        tempCanvas.height = viewport.height;
        const tempCtx = tempCanvas.getContext("2d")!;

        await page.render({ canvasContext: tempCtx, viewport, canvas: tempCanvas }).promise;
        // Draw the rendered page onto the main canvas
        // Center the page if it's narrower than the max width
        const xOffset = (maxWidth - viewport.width) / 2;
        ctx.drawImage(tempCanvas, xOffset, currentY);
        currentY += viewport.height;
      }

      const rawBlob: Blob = await new Promise(
        (r) => canvas.toBlob((b) => r(b!), "image/jpeg", 0.9)!,
      );
      const blob = new Blob([rawBlob], { type: "image/jpeg" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + ".jpg");
      setState("success");
      toast.success("Image ready");
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error("Conversion failed");
    }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Convert to JPG
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
