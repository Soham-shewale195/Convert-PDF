import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Download, Loader2, X } from "lucide-react";

/* -------------------------- shared dropzone hook -------------------------- */
export function useDropFiles(multiple: boolean, accept: string) {
  const [files, setFiles] = useState<File[]>([]);
  const [over, setOver] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setOver(false);
      const fs = Array.from(e.dataTransfer.files || []);
      if (!fs.length) return;
      setFiles(multiple ? [...fs] : [fs[0]]);
    },
    [multiple],
  );
  const Dropzone = (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-10 text-center transition-all duration-300 ease-out group ${
        over
          ? "border-primary bg-primary/10 scale-[1.02] shadow-[0_0_40px_rgba(139,92,246,0.15)]"
          : "border-white/15 hover:border-primary/50 hover:bg-white/[0.03] hover:scale-[1.01]"
      }`}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const fs = Array.from(e.target.files || []);
          if (fs.length) setFiles(multiple ? fs : [fs[0]]);
        }}
      />
      <div className="mx-auto w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300">
        <Upload className="w-6 h-6" />
      </div>
      <p className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
        Drop {multiple ? "files" : "a file"} or click to browse
      </p>
      <p className="text-xs text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-white/60">
        {accept}
      </p>
    </div>
  );
  return { files, setFiles, Dropzone };
}

export function FileList({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) {
  if (!files.length) return null;
  return (
    <ul className="space-y-2 mt-4">
      {files.map((f, i) => (
        <li key={i} className="flex items-center gap-3 p-3 rounded-xl glass">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shrink-0 text-xs">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{f.name}</p>
            <p className="text-xs text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={() => setFiles(files.filter((_, j) => j !== i))}
            className="p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function ActionButton({
  onClick,
  busy,
  children,
  disabled,
}: {
  onClick: () => void;
  busy: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={busy || disabled}
      className="w-full mt-5 btn-gradient rounded-2xl py-3.5 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:-translate-y-0 disabled:hover:shadow-none group"
    >
      {busy ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" /> Processing…
        </>
      ) : (
        <>
          <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />{" "}
          {children}
        </>
      )}
    </button>
  );
}

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 sm:py-16 text-center glass rounded-2xl mt-4 border border-white/5"
    >
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 tracking-tight">Processing Files</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Please wait while we process your documents securely in your browser...
      </p>
    </motion.div>
  );
}

/* ---------- pdfjs worker helper ---------- */
export async function loadPdfJs() {
  const pdfjs: any = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  return pdfjs;
}
