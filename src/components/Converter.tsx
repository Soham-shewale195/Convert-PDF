import { useCallback, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  Loader2,
  CheckCircle2,
  X,
  FileUp,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { validateMagicNumbers } from "@/utils/validation";

/**
 * Only PDF to Word runs inline on the homepage. Word to PDF moved to its own
 * page at /word-to-pdf, which offers a Fast/Faithful choice this switcher
 * cannot express, so the inline word2pdf path was removed rather than left
 * unreachable behind a link.
 */
export type Mode = "pdf2word";
type Status = "idle" | "ready" | "converting" | "done";

/** How PDF to Word should treat the source: rebuild it, or capture it. */
type PdfMode = "fast" | "faithful";

const PDF_MODES: { id: PdfMode; name: string; desc: string }[] = [
  {
    id: "fast",
    name: "Fast — editable text",
    desc: "Rebuilds your document as clean, selectable text. Smaller file, searchable — but colours, tables and exact layout aren't kept.",
  },
  {
    id: "faithful",
    name: "Faithful — visual match",
    desc: "Matches your PDF's colours, images, tables and layout exactly — each page is captured as it appears. Trade-off: the text isn't selectable, editable, or searchable, and the file is larger.",
  },
];

const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

interface ConverterProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function Converter({ mode, setMode }: ConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const [resultName, setResultName] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [pdfMode, setPdfMode] = useState<PdfMode>("fast");
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = ".pdf,application/pdf";

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setResultName("");
    setResultName("");
  };

  const validate = async (f: File): Promise<boolean> => {
    if (f.size > MAX_SIZE) {
      toast.error("File too large (max 25 MB)");
      return false;
    }

    // Check the bytes, not the name, so a renamed file is refused up front.
    if (!(await validateMagicNumbers(f, ["pdf"]))) {
      toast.error("Invalid file signature. File does not appear to be a real PDF.");
      return false;
    }

    if (!(f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"))) {
      toast.error("Please upload a PDF file");
      return false;
    }
    return true;
  };

  const onPick = (f: File) => {
    if (!validate(f)) return;
    setFile(f);
    setStatus("ready");
    setProgress(0);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onPick(f);
    },
    [mode],
  );

  const convert = async () => {
    if (!file) return;
    setStatus("converting");
    setProgress(5);

    try {
      const buffer = await file.arrayBuffer();
      const name = file.name.replace(/\.pdf$/i, "") + ".docx";
      // Two genuinely different pipelines: Fast reconstructs the text,
      // Faithful captures each page as an image. Each is loaded only when
      // chosen, so neither weighs on the other.
      const { blob } =
        pdfMode === "faithful"
          ? await (
              await import("@/lib/pdf-to-docx-faithful")
            ).convertPdfToDocxFaithful(buffer, (pct) => setProgress(pct))
          : await (
              await import("@/lib/pdf-to-docx")
            ).convertPdfToDocx(buffer, (pct) => setProgress(pct));
      setResultName(name);
      await prepareDownload(blob, name);

      setProgress(100);
      setStatus("done");
      toast.success("Conversion complete!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Conversion failed. Try a different file.");
      setStatus("ready");
      setProgress(0);
    }
  };

  return (
    <div id="converter" className="relative">
      <div className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 glow-ring">
        {/* Mode switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="inline-flex p-1 rounded-full glass w-full sm:w-auto">
            <button
              onClick={() => {
                setMode("pdf2word");
                reset();
              }}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all btn-gradient`}
            >
              PDF → Word
            </button>
            {/* Word to PDF is a dedicated page rather than an inline mode: it
                offers a Fast/Faithful choice that does not fit this switcher. */}
            <Link
              to="/word-to-pdf"
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all text-center text-muted-foreground hover:text-foreground"
            >
              Word → PDF
            </Link>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            100% private · runs in your browser
          </p>
        </div>

        {/* Drop zone */}
        <AnimatePresence mode="wait">
          {!file && (
            <motion.div
              key="drop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 ease-out group p-6 sm:p-12 lg:p-16 text-center ${
                dragOver
                  ? "border-primary bg-primary/10 scale-[1.02] shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                  : "border-white/15 hover:border-primary/50 hover:bg-white/[0.03] hover:scale-[1.01]"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPick(f);
                }}
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl btn-gradient flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-transform duration-300 pulse-glow"
              >
                <Upload className="w-7 h-7 sm:w-9 sm:h-9" />
              </motion.div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                Drop your PDF file here
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                or click to browse · max 25 MB
              </p>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium">
                <FileUp className="w-4 h-4" /> Choose file
              </span>
            </motion.div>
          )}

          {file && (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl glass">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {status !== "converting" && (
                  <button
                    onClick={reset}
                    className="p-2 rounded-full hover:bg-white/10 transition shrink-0"
                    aria-label="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {status === "converting" && (
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full btn-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Converting… {progress}%
                  </p>
                </div>
              )}

              {status === "ready" && (
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Conversion Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PDF_MODES.map((m) => {
                      const isSelected = pdfMode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setPdfMode(m.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-primary"
                              : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className="font-semibold text-sm mb-1">{m.name}</span>
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {m.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {status === "ready" && (
                <button
                  onClick={convert}
                  className="w-full btn-gradient rounded-2xl py-3.5 sm:py-4 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  Convert now{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {status === "done" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  {renderStatusCard()}
                  <button
                    onClick={reset}
                    className="w-full glass rounded-2xl py-2.5 sm:py-3 text-sm hover:bg-white/10 transition mt-2"
                  >
                    Convert another file
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {renderModal()}
    </div>
  );
}
