/**
 * Core Image Processing Utilities
 * All functions run entirely in the browser using the Canvas API.
 */

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function pushHistory(entry: { tool: string; name: string; size: number }) {
  try {
    const key = "convertease:history";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.unshift({ ...entry, at: Date.now() });
    localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
    window.dispatchEvent(new Event("convertease:history-updated"));
  } catch {}
}

/**
 * Executes a canvas operation and returns a Blob
 */
async function processImageToBlob(
  file: File,
  drawFn: (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => void,
  mimeType: string = "image/png",
  quality?: number
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  
  drawFn(ctx, img, canvas);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      mimeType,
      quality
    );
  });
}

export async function convertFormat(file: File, format: "png" | "jpeg" | "webp"): Promise<Blob> {
  const mimeMap = { png: "image/png", jpeg: "image/jpeg", webp: "image/webp" } as const;
  return processImageToBlob(
    file,
    (ctx, img, canvas) => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      const MAX_DIM = 4096;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      if (format === "jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.drawImage(img, 0, 0, width, height);
    },
    mimeMap[format],
    format === "jpeg" ? 0.92 : undefined
  );
}

export async function resizeImage(file: File, width: number, height: number): Promise<Blob> {
  return processImageToBlob(file, (ctx, img, canvas) => {
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  });
}

export async function compressImage(file: File, quality: number): Promise<Blob> {
  return processImageToBlob(
    file,
    (ctx, img, canvas) => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      const MAX_DIM = 4096;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width = Math.floor(width * ratio);
        height = Math.floor(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    },
    "image/jpeg",
    quality / 100
  );
}

export async function cropImage(file: File, x: number, y: number, w: number, h: number): Promise<Blob> {
  return processImageToBlob(file, (ctx, img, canvas) => {
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  });
}

export async function rotateFlipImage(
  file: File, 
  angle: number,
  flipH: boolean,
  flipV: boolean
): Promise<Blob> {
  return processImageToBlob(file, (ctx, img, canvas) => {
    const rad = (angle * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    canvas.width = Math.floor(img.naturalWidth * cos + img.naturalHeight * sin);
    canvas.height = Math.floor(img.naturalWidth * sin + img.naturalHeight * cos);
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  });
}

export interface WatermarkOptions {
  text: string;
  color: string;
  fontSize: number;
  opacity: number;
  position: string;
}

export async function watermarkImage(file: File, opts: WatermarkOptions): Promise<Blob> {
  return processImageToBlob(file, (ctx, img, canvas) => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    
    ctx.save();
    const size = Math.floor(canvas.width * (opts.fontSize / 100));
    ctx.font = `bold ${size}px sans-serif`;
    ctx.globalAlpha = opts.opacity / 100;
    ctx.fillStyle = opts.color;
    
    let x = 0, y = 0;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    const margin = size; // Padding
    if (opts.position.includes("left")) { x = margin; ctx.textAlign = "left"; }
    else if (opts.position.includes("right")) { x = canvas.width - margin; ctx.textAlign = "right"; }
    else x = canvas.width / 2;
    
    if (opts.position.includes("top")) { y = margin; }
    else if (opts.position.includes("bottom")) { y = canvas.height - margin; }
    else y = canvas.height / 2;
    
    ctx.fillText(opts.text, x, y);
    ctx.restore();
  });
}
