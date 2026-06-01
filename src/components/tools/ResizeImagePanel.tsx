import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { resizeImage, loadImage } from "@/lib/image-utils";
import { ImageDropzone, ImagePreview, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ProcessState = "idle" | "processing" | "success";

export default function ResizeImagePanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [scalePct, setScalePct] = useState(100);
  const [lock, setLock] = useState(true);
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  
  const origAspect = useRef(1);
  const origDims = useRef({ w: 800, h: 600 });
  const initialized = useRef(false);

  // Reset state when new file is added
  useEffect(() => { 
    if (files.length) {
      setState("idle");
      initialized.current = false;
    }
  }, [files]);

  const loadDims = async (file: File) => {
    try {
      const img = await loadImage(file);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      origDims.current = { w, h };
      origAspect.current = w / h;
      setWidth(w);
      setHeight(h);
      setScalePct(100);
      initialized.current = true;
    } catch(e) { console.error("Failed to load dims", e); }
  };

  useEffect(() => {
    if (files[0] && !initialized.current) { loadDims(files[0]); }
  }, [files]);

  const handlePctChange = (pct: number) => {
    setScalePct(pct);
    setWidth(Math.max(1, Math.round(origDims.current.w * (pct / 100))));
    setHeight(Math.max(1, Math.round(origDims.current.h * (pct / 100))));
  };

  const handleWidthChange = (w: number) => {
    setWidth(w);
    if (lock) {
      const newH = Math.max(1, Math.round(w / origAspect.current));
      setHeight(newH);
    }
    setScalePct(Math.round((w / origDims.current.w) * 100) || 100);
  };

  const handleHeightChange = (h: number) => {
    setHeight(h);
    if (lock) {
      const newW = Math.max(1, Math.round(h * origAspect.current));
      setWidth(newW);
      setScalePct(Math.round((newW / origDims.current.w) * 100) || 100);
    } else {
      setScalePct(Math.round((h / origDims.current.h) * 100) || 100);
    }
  };

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const blob = await resizeImage(files[0], width, height);
      const newName = files[0].name.replace(/\.[^.]+$/, "") + `-${width}x${height}.png`;
      await prepareDownload(blob, newName);
      
      setState("success");
      toast.success("Resized!");
    } catch (e) { setState("idle"); toast.error("Resize failed"); }
  };

  return (<>
    <ImageDropzone files={files} setFiles={setFiles} />
    {files[0] && (
      <>
        <div className="relative mt-4">
          <ImagePreview file={files[0]} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-strong border border-white/20 text-sm font-semibold flex items-center gap-2 shadow-xl backdrop-blur-md"
          >
            <Maximize2 className="w-4 h-4 text-primary" />
            {width} <span className="text-muted-foreground font-normal">×</span> {height} px
          </motion.div>
        </div>

        <div className="mt-6 space-y-5 p-5 glass rounded-2xl border border-white/5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="font-medium">Scale Percentage</label>
              <span className="text-primary font-semibold">{scalePct}%</span>
            </div>
            <input type="range" min={10} max={200} step={1} value={scalePct} onChange={(e) => handlePctChange(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full appearance-none bg-white/10 cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Width (px)</label>
              <input type="number" value={width} min={1} onChange={(e) => handleWidthChange(Number(e.target.value) || 1)}
                className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Height (px)</label>
              <input type="number" value={height} min={1} onChange={(e) => handleHeightChange(Number(e.target.value) || 1)}
                className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer w-max pt-1 hover:text-foreground transition-colors">
            <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} className="accent-primary w-4 h-4 cursor-pointer" />
            Maintain aspect ratio
          </label>
        </div>
      </>
    )}
    {state === "success" ? renderStatusCard() : (
      <ActionButton onClick={run} state={state} disabled={!files.length}>Resize Image</ActionButton>
    )}
    {renderModal()}
  </>);
}
