import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton } from "@/components/PdfToolsUI";
import {
  compressPdf,
  CompressionPreset,
  CompressionResult,
  isSafariBrowser,
} from "@/lib/pdf-compress-utils";
import { pdfErrorMessage } from "@/lib/pdf-load";

export default function CompressPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const [preset, setPreset] = useState<CompressionPreset>("medium");
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [resultStats, setResultStats] = useState<CompressionResult | null>(null);
  const [isSafari, setIsSafari] = useState<boolean>(false);

  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  useEffect(() => {
    setIsSafari(isSafariBrowser());
  }, []);

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    setProgressMsg("Reading document...");
    try {
      const buffer = await files[0].arrayBuffer();
      const result = await compressPdf(buffer, preset, (msg) => setProgressMsg(msg), files[0].name);

      const blob = new Blob([result.bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-compressed.pdf");

      setResultStats(result);
      setState("success");
      toast.success("PDF compressed successfully!");
    } catch (e) {
      console.error("Compression error:", e);
      setState("idle");
      setProgressMsg("");
      toast.error(pdfErrorMessage(e, "Compression failed. Please try another PDF."));
    }
  };

  const presetsInfo: {
    id: CompressionPreset;
    name: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: "low",
      name: "Low",
      desc: "Lossless structural optimization only (best for text-heavy PDFs)",
      icon: ShieldCheck,
    },
    {
      id: "medium",
      name: "Medium",
      desc: "Balanced 75% image quality (recommended for most PDFs)",
      icon: Zap,
    },
    {
      id: "high",
      name: "High",
      desc: "Max compression (50% image quality, smallest file size)",
      icon: Sparkles,
    },
  ];

  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}

      {state === "idle" && files.length > 0 && (
        <div className="mt-5 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Compression Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {presetsInfo.map((p) => {
              const Icon = p.icon;
              const isSelected = preset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPreset(p.id)}
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
                    <span className="font-semibold text-sm">{p.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">{p.desc}</span>
                </button>
              );
            })}
          </div>

          {isSafari && preset !== "low" && (
            <p className="text-[11px] text-muted-foreground italic mt-1">
              Note: On Safari, canvas image re-encoding parameters may operate according to system
              graphics defaults.
            </p>
          )}
        </div>
      )}

      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Compress PDF
        </ActionButton>
      )}

      {state === "processing" && (
        <div className="py-12 sm:py-16 text-center glass rounded-2xl mt-4 border border-white/5">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">Compressing PDF</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {progressMsg || "Please wait while we process your document..."}
          </p>
        </div>
      )}

      {state === "success" && resultStats && (
        <div className="mt-4 p-4 rounded-xl glass border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-muted-foreground">Original:</span>
            <span className="font-medium">
              {(resultStats.originalSize / (1024 * 1024)).toFixed(2)} MB
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="text-primary font-semibold">Compressed:</span>
            <span className="font-bold text-emerald-400">
              {(resultStats.compressedSize / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
          {resultStats.originalSize > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 shrink-0">
              ↓
              {Math.max(
                0,
                Math.round((1 - resultStats.compressedSize / resultStats.originalSize) * 100),
              )}
              % reduction
            </span>
          )}
        </div>
      )}

      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
