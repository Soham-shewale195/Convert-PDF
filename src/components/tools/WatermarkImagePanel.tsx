import { useState, useEffect } from "react";
import { toast } from "sonner";
import { watermarkImage } from "@/lib/image-utils";
import { ImageDropzone, ImagePreview, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ProcessState = "idle" | "processing" | "success";

export default function WatermarkImagePanel() {
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
