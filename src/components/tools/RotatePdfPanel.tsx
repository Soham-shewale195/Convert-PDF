import { useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";

export default function RotatePdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      for (const p of src.getPages()) {
        const cur = p.getRotation().angle;
        p.setRotation(degrees((cur + angle) % 360));
      }
      const bytes = await src.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + `-rotated-${angle}.pdf`);
      setState("success");
      toast.success("Rotated");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <div className="flex gap-2 mt-4">
          {[90, 180, 270].map((a) => (
            <button key={a} onClick={() => setAngle(a as any)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${angle === a ? "btn-gradient" : "glass hover:bg-white/10"}`}>{a}°</button>
          ))}
        </div>
      )}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Rotate pages</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
