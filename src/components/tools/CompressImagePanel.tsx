import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import { compressImage } from "@/lib/image-utils";
import { ImageDropzone, ImagePreview, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ProcessState = "idle" | "processing" | "success";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024,
    sizes = ["B", "KB", "MB", "GB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function CompressImagePanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const [quality, setQuality] = useState(70);
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  const [estSize, setEstSize] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const estimate = async (q: number, file: File) => {
    setCalculating(true);
    try {
      const blob = await compressImage(file, q);
      setEstSize(blob.size);
    } catch (e) {
      console.error("Estimation failed", e);
    } finally {
      setCalculating(false);
    }
  };

  // Initial estimate when a new file is uploaded
  useEffect(() => {
    if (files.length) {
      setState("idle");
      setEstSize(null);
      estimate(quality, files[0]);
    }
  }, [files]);

  const handleQualityChange = (q: number) => {
    setQuality(q);
    if (!files[0]) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setCalculating(true);
    timeoutRef.current = setTimeout(() => {
      estimate(q, files[0]);
    }, 400); // 400ms debounce
  };

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const blob = await compressImage(files[0], quality);
      const newName = files[0].name.replace(/\.[^.]+$/, "") + `-compressed.jpg`;
      await prepareDownload(blob, newName);

      setState("success");
      toast.success(`Compressed successfully!`);
    } catch (e) {
      setState("idle");
      toast.error("Compression failed");
    }
  };

  const savedPct =
    files[0] && estSize ? Math.max(0, Math.round((1 - estSize / files[0].size) * 100)) : 0;

  return (
    <>
      <ImageDropzone files={files} setFiles={setFiles} />
      {files[0] && (
        <>
          <ImagePreview file={files[0]} />

          <div className="mt-5 p-5 glass rounded-2xl border border-white/5 space-y-6">
            {/* Comparison UI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center z-10 text-muted-foreground">
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </div>

              <div className="glass-strong rounded-xl p-4 text-center border border-white/5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
                  Original Size
                </p>
                <p className="text-lg font-bold">{formatBytes(files[0].size)}</p>
              </div>

              <div
                className={`glass-strong rounded-xl p-4 text-center border transition-colors duration-300 ${savedPct > 20 ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/5"}`}
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold flex items-center justify-center gap-1.5">
                  Estimated Size
                  {calculating && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <p
                    className={`text-lg font-bold transition-opacity ${calculating ? "opacity-50" : "opacity-100"}`}
                  >
                    {estSize ? formatBytes(estSize) : "--"}
                  </p>
                  {savedPct > 0 && !calculating && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">
                      -{savedPct}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <label className="font-medium">Compression Quality</label>
                <span className="text-primary font-semibold">{quality}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="w-full accent-primary h-2 rounded-full appearance-none bg-white/10 cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.2)]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
                <span>Smallest file</span>
                <span>Best quality</span>
              </div>
            </div>
          </div>
        </>
      )}
      {state === "success" ? (
        renderStatusCard()
      ) : (
        <ActionButton onClick={run} state={state} disabled={!files.length || calculating}>
          Compress Image
        </ActionButton>
      )}
      {renderModal()}
    </>
  );
}
