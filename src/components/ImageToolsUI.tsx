import { useCallback, useRef, useState, useEffect } from "react";
import { Upload, X, Loader2, Download, ShieldCheck, FileImage, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WarningBadge } from "@/components/ads/MonetizationBadges";
import { checkRequiresWarning } from "@/utils/monetization";
import { validateMagicNumbers } from "@/utils/validation";
import { toast } from "sonner";

export function useDropFiles(multiple: boolean, accept: string, setFiles: (f: File[]) => void) {
  const [over, setOver] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  
  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault(); setOver(false);
    const fs = Array.from(e.dataTransfer.files || []);
    if (!fs.length) return;
    
    const validFs: File[] = [];
    for (const f of fs) {
      if (await validateMagicNumbers(f, ["image"])) {
        validFs.push(f);
      } else {
        toast.error(`Invalid file signature for ${f.name}. File does not appear to be a real image.`);
      }
    }
    
    if (validFs.length > 0) {
      setFiles(multiple ? validFs : [validFs[0]]);
    }
  }, [multiple, setFiles]);

  return { over, setOver, ref, onDrop };
}

export function ImageDropzone({ 
  multiple = false, 
  accept = "image/*", 
  files, 
  setFiles 
}: { 
  multiple?: boolean; 
  accept?: string; 
  files: File[]; 
  setFiles: (f: File[]) => void;
}) {
  const { over, setOver, ref, onDrop } = useDropFiles(multiple, accept, setFiles);

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fs = Array.from(e.target.files || []);
    if (!fs.length) return;
    
    const validFs: File[] = [];
    for (const f of fs) {
      if (await validateMagicNumbers(f, ["image"])) {
        validFs.push(f);
      } else {
        toast.error(`Invalid file signature for ${f.name}. File does not appear to be a real image.`);
      }
    }
    
    if (validFs.length > 0) {
      setFiles(multiple ? validFs : [validFs[0]]);
    }
  }, [multiple, setFiles]);

  // Check if any uploaded file triggers the large file warning
  const hasLargeFile = files.some(f => checkRequiresWarning(f.size));

  return (
    <div className="space-y-4">
      {hasLargeFile && (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <WarningBadge />
          </motion.div>
        </AnimatePresence>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        onClick={() => ref.current?.click()}
        className={`relative overflow-hidden cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-10 text-center transition-all duration-300 ${over ? "border-primary bg-primary/10 scale-[1.02] shadow-[0_0_30px_rgba(139,92,246,0.15)]" : "border-white/15 hover:border-primary/50 hover:bg-white/[0.03]"}`}
      >
        <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden" onChange={handleChange} />
        
        <motion.div 
          animate={over ? { y: -5, scale: 1.1 } : { y: [0, -6, 0] }} 
          transition={over ? { duration: 0.2 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${over ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]" : "btn-gradient pulse-glow"}`}
        >
          <Upload className="w-6 h-6" />
        </motion.div>
        
        <h3 className="font-semibold text-lg mb-1">
          Drop {multiple ? "images" : "an image"} or click to browse
        </h3>
        <p className="text-xs text-muted-foreground mt-1 mb-4">Supported: JPG, PNG, WEBP, etc.</p>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[10px] sm:text-xs font-medium text-emerald-400 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Processing happens locally. Your files never leave your device.</span>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
            {files.map((f, i) => (
              <motion.li key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3 p-3 rounded-xl glass border border-white/10 group hover:bg-white/[0.04] transition-colors">
                <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shrink-0 shadow-sm">
                  <FileImage className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="p-1.5 rounded-lg text-muted-foreground hover:bg-destructive/20 hover:text-red-400 transition-colors" aria-label="Remove">
                  <X className="w-4 h-4" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ImagePreview({ file, imgStyle, children }: { file: File; imgStyle?: React.CSSProperties; children?: React.ReactNode }) {
  const [src, setSrc] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    setLoading(true);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!src) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl glass p-3 overflow-hidden border border-white/10 relative shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="bg-black/20 rounded-xl overflow-hidden flex items-center justify-center min-h-[150px] relative">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-black/10 z-10">
            <Loader2 className="w-6 h-6 animate-spin mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-widest opacity-50">Loading preview...</span>
          </div>
        )}
        <img 
          src={src} 
          alt="Preview" 
          onLoad={() => setLoading(false)}
          className={`w-full max-h-64 object-contain transition-all duration-500 ease-out ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
          style={imgStyle} 
        />
        {!loading && children}
      </div>
    </motion.div>
  );
}

export function ActionButton({ 
  onClick, 
  state, 
  children, 
  disabled 
}: { 
  onClick: () => void; 
  state: "idle" | "processing" | "success"; 
  children: React.ReactNode; 
  disabled?: boolean 
}) {
  return (
    <button 
      onClick={onClick} 
      disabled={state === "processing" || disabled}
      className={`relative w-full mt-6 rounded-2xl py-3.5 sm:py-4 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-500 overflow-hidden ${
        state === "success" 
          ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-400/50" 
          : "glass-strong hover:bg-white/10 border border-white/10 hover:border-primary/50 text-foreground"
      } disabled:opacity-50 disabled:cursor-not-allowed group`}
    >
      {/* Background hover gradient for idle state */}
      {state === "idle" && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Progress animation overlay */}
      <AnimatePresence>
        {state === "processing" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 btn-gradient"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[progress_1s_linear_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center gap-2">
        {state === "processing" ? (
          <><Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> Processing...</>
        ) : state === "success" ? (
          <><Check className="w-4 h-4 sm:w-5 sm:h-5" /> Downloaded Successfully</>
        ) : (
          <><Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" /> {children}</>
        )}
      </span>
    </button>
  );
}
