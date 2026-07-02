import { useState, useEffect } from "react";
import { toast } from "sonner";
import { convertFormat } from "@/lib/image-utils";
import { ImageDropzone, ImagePreview, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ProcessState = "idle" | "processing" | "success";

export default function FormatConvertPanel({
  from,
  to,
}: {
  from: "jpg" | "png" | "webp";
  to: "jpg" | "png";
}) {
  const acceptMap: Record<string, string> = { jpg: ".jpg,.jpeg", png: ".png", webp: ".webp" };
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Reset state when new file is added
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const formatToPass = to === "jpg" ? "jpeg" : to;
      const blob = await convertFormat(files[0], formatToPass as "png" | "jpeg" | "webp");
      const ext = to === "png" ? ".png" : ".jpg";
      const newName = files[0].name.replace(/\.[^.]+$/, "") + ext;
      await prepareDownload(blob, newName);

      setState("success");
      toast.success(`Converted to ${to.toUpperCase()}!`);
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error("Conversion failed");
    }
  };

  return (
    <>
      <ImageDropzone accept={acceptMap[from] || "image/*"} files={files} setFiles={setFiles} />
      {files[0] && <ImagePreview file={files[0]} />}
      {state === "success" ? (
        renderStatusCard()
      ) : (
        <ActionButton onClick={run} state={state} disabled={!files.length}>
          Convert to {to.toUpperCase()}
        </ActionButton>
      )}
      {renderModal()}
    </>
  );
}
