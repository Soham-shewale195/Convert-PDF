import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Type, Image as ImageIcon } from "lucide-react";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";
import { validateMagicNumbers } from "@/utils/validation";

type ConvertMode = "fast" | "faithful";

const MODES: {
  id: ConvertMode;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "fast",
    name: "Fast — editable text",
    desc: "Rebuilds your document as clean, selectable text in one typeface. Smaller file, searchable — but original fonts, colours, and exact layout aren't kept.",
    icon: Type,
  },
  {
    id: "faithful",
    name: "Faithful — visual match",
    desc: "Matches fonts, colours, and layout — using your document's own embedded fonts when it has them, or your device's closest match when it doesn't. Trade-off: each page becomes an image, so the text isn't selectable or searchable, and the file is larger.",
    icon: ImageIcon,
  },
];

export default function WordToPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".docx");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const [mode, setMode] = useState<ConvertMode>("fast");
  const [progressMsg, setProgressMsg] = useState("");
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
    // so a renamed file is refused up front instead of failing inside the parser.
    if (!(await validateMagicNumbers(file, ["docx"]))) {
      toast.error("That does not look like a .docx file. Older .doc files are not supported.");
      return;
    }

    setState("processing");
    setProgressMsg("");
    try {
      const buffer = await file.arrayBuffer();
      const name = file.name.replace(/\.docx$/i, "") + ".pdf";

      if (mode === "faithful") {
        const { convertDocxToPdfFaithful } = await import("@/lib/docx-to-pdf-faithful");
        const { blob, stats } = await convertDocxToPdfFaithful(buffer, (_pct, msg) =>
          setProgressMsg(msg),
        );
        await prepareDownload(blob, name);
        setState("success");
        toast.success(
          `Converted ${stats.pages} page${stats.pages === 1 ? "" : "s"} as a visual match.`,
        );
        if (stats.fonts.length && !stats.embeddedFonts.length) {
          // Only fonts embedded in the file itself are guaranteed; anything else
          // depends on this device having it, so say so rather than imply a match.
          toast.info(
            "This document does not embed its fonts, so any font your device lacks was substituted.",
          );
        }
      } else {
        const { convertDocxToPdf } = await import("@/lib/docx-to-pdf");
        const { blob, stats } = await convertDocxToPdf(buffer);
        await prepareDownload(blob, name);
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

      {state === "idle" && files.length > 0 && (
        <div className="mt-5 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Conversion Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setMode(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-primary"
                      : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span className="font-semibold text-sm">{m.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">{m.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Convert to PDF
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "processing" && progressMsg && (
        <p className="mt-3 text-center text-xs text-muted-foreground">{progressMsg}</p>
      )}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
