import { useState, useEffect } from "react";
import { toast } from "sonner";
import { rotateFlipImage } from "@/lib/image-utils";
import { ImageDropzone, ImagePreview, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ProcessState = "idle" | "processing" | "success";

export default function RotateFlipImagePanel() {
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
