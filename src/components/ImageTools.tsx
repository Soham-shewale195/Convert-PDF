import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight, FileImage, Image as ImageIcon, Maximize2, Minimize2, Crop,
  RotateCw, Droplets, ArrowLeft, Sparkles, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import ReactCrop, { type Crop as ReactCropType, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Import from our new modular architecture
import { 
  convertFormat, resizeImage, compressImage, 
  cropImage, rotateFlipImage, watermarkImage, loadImage
} from "@/lib/image-utils";
import { ImageDropzone, ImagePreview, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

/* ------------------------------------------------------------------ */
/*  Types & tool definitions                                           */
/* ------------------------------------------------------------------ */
type ImageToolId =
  | "jpg2png" | "png2jpg" | "webp2jpg"
  | "resize" | "compress" | "crop" | "rotate-flip" | "watermark";

const IMAGE_TOOLS: { id: ImageToolId; title: string; desc: string; icon: any; accent: string }[] = [
  { id: "jpg2png",      title: "JPG to PNG",          desc: "Convert JPG images to lossless PNG format.",   icon: ArrowLeftRight, accent: "from-teal-500 to-cyan-500" },
  { id: "png2jpg",      title: "PNG to JPG",          desc: "Convert PNG images to compact JPG format.",    icon: FileImage,      accent: "from-orange-500 to-amber-500" },
  { id: "webp2jpg",     title: "WEBP to JPG",         desc: "Convert modern WEBP images to JPG.",          icon: ImageIcon,      accent: "from-indigo-500 to-violet-500" },
  { id: "resize",       title: "Resize Image",        desc: "Scale images to custom dimensions.",           icon: Maximize2,      accent: "from-rose-500 to-pink-500" },
  { id: "compress",     title: "Compress Image",      desc: "Reduce image file size with quality control.", icon: Minimize2,      accent: "from-lime-500 to-green-500" },
  { id: "crop",         title: "Crop Image",          desc: "Trim images to any area you need.",            icon: Crop,           accent: "from-sky-500 to-blue-500" },
  { id: "rotate-flip",  title: "Rotate / Flip Image", desc: "Rotate 90°–270° or mirror horizontally.",      icon: RotateCw,       accent: "from-purple-500 to-fuchsia-500" },
  { id: "watermark",    title: "Watermark Image",     desc: "Overlay custom text on any image.",            icon: Droplets,       accent: "from-amber-500 to-yellow-500" },
];

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
export default function ImageTools() {
  const [active, setActive] = useState<ImageToolId | null>(null);
  const tool = IMAGE_TOOLS.find((t) => t.id === active);

  return (
    <section id="image-tools" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* ---- Section header ---- */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Image toolkit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Powerful <span className="gradient-text">Image Tools</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base"
          >
            Convert, compress, resize, and edit images directly in your browser.
          </motion.p>
        </div>

        {/* ---- Grid / Active panel ---- */}
        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div
              key="img-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            >
              {IMAGE_TOOLS.map((t, i) => (
                <motion.button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="text-left glass rounded-2xl p-5 sm:p-6 hover:bg-white/[0.09] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.25)] transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-300`}>
                    <t.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1.5">{t.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-4xl mx-auto"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 blur-[100px] opacity-50 pointer-events-none rounded-[50%]" />
              
              <div className="relative glass-strong rounded-3xl p-5 sm:p-8 glow-ring">
                <div className="flex items-center justify-between mb-6 gap-3">
                  <button onClick={() => setActive(null)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>All Tools</span>
                  </button>
                  <div className="text-right min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg truncate">{tool?.title}</h3>
                    <p className="text-xs text-muted-foreground hidden sm:block truncate">{tool?.desc}</p>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageToolPanel id={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Tool panel router                                                  */
/* ------------------------------------------------------------------ */
function ImageToolPanel({ id }: { id: ImageToolId }) {
  switch (id) {
    case "jpg2png":     return <FormatConvertPanel from="jpg" to="png" />;
    case "png2jpg":     return <FormatConvertPanel from="png" to="jpg" />;
    case "webp2jpg":    return <FormatConvertPanel from="webp" to="jpg" />;
    case "resize":      return <ResizePanel />;
    case "compress":    return <CompressPanel />;
    case "crop":        return <CropPanel />;
    case "rotate-flip": return <RotateFlipPanel />;
    case "watermark":   return <WatermarkPanel />;
  }
}

/* ================================================================== */
/*  TOOL PANELS (Using the new modular architecture)                   */
/* ================================================================== */

type ProcessState = "idle" | "processing" | "success";

function FormatConvertPanel({ from, to }: { from: "jpg"|"png"|"webp"; to: "jpg"|"png" }) {
  const acceptMap: Record<string, string> = { jpg: ".jpg,.jpeg", png: ".png", webp: ".webp" };
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Reset state when new file is added
  useEffect(() => { if (files.length) setState("idle"); }, [files]);

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

  return (<>
    <ImageDropzone accept={acceptMap[from] || "image/*"} files={files} setFiles={setFiles} />
    {files[0] && <ImagePreview file={files[0]} />}
    {state === "success" ? renderStatusCard() : (
      <ActionButton onClick={run} state={state} disabled={!files.length}>
        Convert to {to.toUpperCase()}
      </ActionButton>
    )}
    {renderModal()}
  </>);
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024, sizes = ["B", "KB", "MB", "GB"], i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function ResizePanel() {
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

function CompressPanel() {
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
    } catch(e) { console.error("Estimation failed", e); }
    finally { setCalculating(false); }
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
    } catch (e) { setState("idle"); toast.error("Compression failed"); }
  };

  const savedPct = files[0] && estSize ? Math.max(0, Math.round((1 - estSize / files[0].size) * 100)) : 0;

  return (<>
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
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Original Size</p>
              <p className="text-lg font-bold">{formatBytes(files[0].size)}</p>
            </div>
            
            <div className={`glass-strong rounded-xl p-4 text-center border transition-colors duration-300 ${savedPct > 20 ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5'}`}>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold flex items-center justify-center gap-1.5">
                Estimated Size
                {calculating && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className={`text-lg font-bold transition-opacity ${calculating ? 'opacity-50' : 'opacity-100'}`}>
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
            <input type="range" min={1} max={100} step={1} value={quality} onChange={(e) => handleQualityChange(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full appearance-none bg-white/10 cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
              <span>Smallest file</span>
              <span>Best quality</span>
            </div>
          </div>
        </div>
      </>
    )}
    {state === "success" ? renderStatusCard() : (
      <ActionButton onClick={run} state={state} disabled={!files.length || calculating}>Compress Image</ActionButton>
    )}
    {renderModal()}
  </>);
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth, mediaHeight
  );
}

function CropPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const [crop, setCrop] = useState<ReactCropType>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const imgRef = useRef<HTMLImageElement>(null);

  const [src, setSrc] = useState("");
  useEffect(() => {
    if (files[0]) {
      const u = URL.createObjectURL(files[0]);
      setSrc(u);
      return () => URL.revokeObjectURL(u);
    } else {
      setSrc("");
    }
  }, [files]);

  useEffect(() => { if (files.length) setState("idle"); }, [files]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleAspectChange = (newAspect?: number) => {
    setAspect(newAspect);
    if (newAspect && imgRef.current) {
      setCrop(centerAspectCrop(imgRef.current.width, imgRef.current.height, newAspect));
    } else if (!newAspect && crop) {
      setCrop({ ...crop, unit: '%' });
    }
  };

  const run = async () => {
    if (!files[0] || !imgRef.current || !crop || !crop.width || !crop.height) return;
    setState("processing");
    try {
      let x, y, w, h;
      if (crop.unit === '%') {
        x = Math.round((crop.x / 100) * imgRef.current.naturalWidth);
        y = Math.round((crop.y / 100) * imgRef.current.naturalHeight);
        w = Math.round((crop.width / 100) * imgRef.current.naturalWidth);
        h = Math.round((crop.height / 100) * imgRef.current.naturalHeight);
      } else {
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        x = Math.round(crop.x * scaleX);
        y = Math.round(crop.y * scaleY);
        w = Math.round(crop.width * scaleX);
        h = Math.round(crop.height * scaleY);
      }
      
      const blob = await cropImage(files[0], x, y, w, h);
      const newName = files[0].name.replace(/\.[^.]+$/, "") + "-cropped.png";
      await prepareDownload(blob, newName);
      
      setState("success");
      toast.success("Cropped!");
    } catch (e) { setState("idle"); toast.error("Crop failed"); }
  };

  return (<>
    <ImageDropzone files={files} setFiles={setFiles} />
    {files[0] && src && (
      <>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl glass p-3 overflow-hidden border border-white/10">
          <div className="bg-black/20 rounded-xl overflow-hidden flex items-center justify-center min-h-[150px]">
            <ReactCrop crop={crop} onChange={(_, pc) => setCrop(pc)} aspect={aspect} className="max-h-96">
              <img ref={imgRef} src={src} onLoad={onImageLoad} alt="Crop preview" className="max-h-96 w-auto object-contain" />
            </ReactCrop>
          </div>
        </motion.div>
        
        <div className="mt-5 p-5 glass rounded-2xl border border-white/5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2.5 font-semibold">Aspect Ratio</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Free", value: undefined },
              { label: "1:1", value: 1 },
              { label: "16:9", value: 16/9 },
              { label: "4:3", value: 4/3 }
            ].map(a => (
              <button 
                key={a.label} 
                onClick={() => handleAspectChange(a.value)}
                className={`py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${aspect === a.value ? "btn-gradient shadow-[0_0_15px_rgba(139,92,246,0.2)]" : "glass hover:bg-white/10"}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </>
    )}
    {state === "success" ? renderStatusCard() : (
      <ActionButton onClick={run} state={state} disabled={!files.length || !crop?.width}>Crop Image</ActionButton>
    )}
    {renderModal()}
  </>);
}

function RotateFlipPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  useEffect(() => { 
    if (files.length) {
      setState("idle");
      setAngle(0); setFlipH(false); setFlipV(false);
    }
  }, [files]);

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const blob = await rotateFlipImage(files[0], angle, flipH, flipV);
      const newName = files[0].name.replace(/\.[^.]+$/, "") + `-modified.png`;
      await prepareDownload(blob, newName);
      
      setState("success");
      toast.success("Done!");
    } catch (e) { setState("idle"); toast.error("Operation failed"); }
  };

  return (<>
    <ImageDropzone files={files} setFiles={setFiles} />
    {files[0] && (
      <>
        <ImagePreview 
          file={files[0]} 
          imgStyle={{ 
            transform: `rotate(${angle}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`
          }} 
        />
        <div className="mt-5 p-5 glass rounded-2xl border border-white/5 space-y-5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2.5 font-semibold">Rotate</p>
            <div className="flex gap-2">
              <button onClick={() => setAngle(a => a - 90)} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all glass hover:bg-white/10">↺ Left</button>
              <button onClick={() => setAngle(0)} className="flex-[0.5] py-2.5 rounded-xl text-sm font-medium transition-all glass hover:bg-white/10 text-muted-foreground">Reset</button>
              <button onClick={() => setAngle(a => a + 90)} className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all glass hover:bg-white/10">Right ↻</button>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2.5 font-semibold">Flip</p>
            <div className="flex gap-2">
              <button onClick={() => setFlipH(f => !f)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${flipH ? "btn-gradient shadow-[0_0_15px_rgba(139,92,246,0.2)]" : "glass hover:bg-white/10"}`}>↔ Horizontal</button>
              <button onClick={() => setFlipV(f => !f)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${flipV ? "btn-gradient shadow-[0_0_15px_rgba(139,92,246,0.2)]" : "glass hover:bg-white/10"}`}>↕ Vertical</button>
            </div>
          </div>
        </div>
      </>
    )}
    {state === "success" ? renderStatusCard() : (
      <ActionButton onClick={run} state={state} disabled={!files.length}>Apply Modifications</ActionButton>
    )}
    {renderModal()}
  </>);
}

function WatermarkPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<ProcessState>("idle");
  const [text, setText] = useState("CONFIDENTIAL");
  const [color, setColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(15);
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState("center");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  useEffect(() => { if (files.length) setState("idle"); }, [files]);

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const blob = await watermarkImage(files[0], { text, color, fontSize, opacity, position });
      const newName = files[0].name.replace(/\.[^.]+$/, "") + "-watermarked.png";
      await prepareDownload(blob, newName);
      
      setState("success");
      toast.success("Watermark added!");
    } catch (e) { setState("idle"); toast.error("Watermark failed"); }
  };

  const getPosStyle = () => {
    const s: React.CSSProperties = { position: "absolute", margin: "5%" };
    if (position.includes("top")) s.top = 0;
    else if (position.includes("bottom")) s.bottom = 0;
    else { s.top = "50%"; s.transform = s.transform ? s.transform + " translateY(-50%)" : "translateY(-50%)"; }

    if (position.includes("left")) s.left = 0;
    else if (position.includes("right")) s.right = 0;
    else { s.left = "50%"; s.transform = s.transform ? s.transform + " translateX(-50%)" : "translateX(-50%)"; }
    
    return s;
  };

  return (<>
    <ImageDropzone files={files} setFiles={setFiles} />
    {files[0] && (
      <>
        <ImagePreview file={files[0]}>
           <div style={{
             ...getPosStyle(),
             color,
             opacity: opacity / 100,
             fontSize: `${fontSize * 0.25}vw`,
             fontWeight: "bold",
             pointerEvents: "none",
             whiteSpace: "nowrap",
             textShadow: "0 2px 10px rgba(0,0,0,0.5)"
           }}>
             {text}
           </div>
        </ImagePreview>
        <div className="mt-5 p-5 glass rounded-2xl border border-white/5 space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Watermark Text</label>
            <input value={text} onChange={(e) => setText(e.target.value)} className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Size ({fontSize}%)</label>
              <input type="range" min={2} max={40} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-primary h-2 rounded-full appearance-none bg-white/10 shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Opacity ({opacity}%)</label>
              <input type="range" min={10} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-primary h-2 rounded-full appearance-none bg-white/10 shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
             <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-sm font-medium uppercase">{color}</span>
                </div>
             </div>
             <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-semibold">Position</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)} className="w-full glass rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 [&>option]:bg-zinc-900">
                  <option value="top-left">Top Left</option>
                  <option value="top">Top Center</option>
                  <option value="top-right">Top Right</option>
                  <option value="left">Middle Left</option>
                  <option value="center">Center</option>
                  <option value="right">Middle Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom">Bottom Center</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
             </div>
          </div>
        </div>
      </>
    )}
    {state === "success" ? renderStatusCard() : (
      <ActionButton onClick={run} state={state} disabled={!files.length || !text.trim()}>Add Watermark</ActionButton>
    )}
    {renderModal()}
  </>);
}
