import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ReactCrop, {
  type Crop as ReactCropType,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { cropImage } from "@/lib/image-utils";
import { ImageDropzone, ActionButton } from "@/components/ImageToolsUI";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ProcessState = "idle" | "processing" | "success";

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

export default function CropImagePanel() {
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

  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

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
      setCrop({ ...crop, unit: "%" });
    }
  };

  const run = async () => {
    if (!files[0] || !imgRef.current || !crop || !crop.width || !crop.height) return;
    setState("processing");
    try {
      let x, y, w, h;
      if (crop.unit === "%") {
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
    } catch (e) {
      setState("idle");
      toast.error("Crop failed");
    }
  };

  return (
    <>
      <ImageDropzone files={files} setFiles={setFiles} />
      {files[0] && src && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl glass p-3 overflow-hidden border border-white/10"
          >
            <div className="bg-black/20 rounded-xl overflow-hidden flex items-center justify-center min-h-[150px]">
              <ReactCrop
                crop={crop}
                onChange={(_, pc) => setCrop(pc)}
                aspect={aspect}
                className="max-h-96"
              >
                <img
                  ref={imgRef}
                  src={src}
                  onLoad={onImageLoad}
                  alt="Crop preview"
                  className="max-h-96 w-auto object-contain"
                />
              </ReactCrop>
            </div>
          </motion.div>

          <div className="mt-5 p-5 glass rounded-2xl border border-white/5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2.5 font-semibold">
              Aspect Ratio
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Free", value: undefined },
                { label: "1:1", value: 1 },
                { label: "16:9", value: 16 / 9 },
                { label: "4:3", value: 4 / 3 },
              ].map((a) => (
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
      {state === "success" ? (
        renderStatusCard()
      ) : (
        <ActionButton onClick={run} state={state} disabled={!files.length || !crop?.width}>
          Crop Image
        </ActionButton>
      )}
      {renderModal()}
    </>
  );
}
