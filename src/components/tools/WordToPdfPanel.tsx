import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";
import { validateMagicNumbers } from "@/utils/validation";
import { convertDocxToPdf } from "@/lib/docx-to-pdf";

export default function WordToPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".docx");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Picking a new file after a finished run returns the panel to idle, so the
  // tool can be used again without reloading. Matches the other tool panels.
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    const file = files[0];
    if (!file) return;

    // A .docx is a ZIP package; check the bytes rather than trusting the name,
    // so a renamed file is refused up front instead of failing inside mammoth.
    if (!(await validateMagicNumbers(file, ["docx"]))) {
      toast.error("That does not look like a .docx file. Older .doc files are not supported.");
      return;
    }

    setState("processing");
    try {
      const { blob, stats } = await convertDocxToPdf(await file.arrayBuffer());
      await prepareDownload(blob, file.name.replace(/\.docx$/i, "") + ".pdf");
      setState("success");

      const parts: string[] = [];
      if (stats.tables) parts.push(`${stats.tables} table${stats.tables === 1 ? "" : "s"}`);
      if (stats.imagesEmbedded)
        parts.push(`${stats.imagesEmbedded} image${stats.imagesEmbedded === 1 ? "" : "s"}`);
      toast.success(parts.length ? `Converted — kept ${parts.join(" and ")}.` : "Converted");

      if (stats.imagesSkipped) {
        toast.warning(
          `${stats.imagesSkipped} image${stats.imagesSkipped === 1 ? "" : "s"} could not be embedded and ${stats.imagesSkipped === 1 ? "was" : "were"} left out.`,
        );
      }
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error("Could not read that document. Make sure it is a valid .docx file.");
    }
  };

  return (
    <>
      {state !== "processing" && Dropzone}
      {state !== "processing" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Convert to PDF
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
