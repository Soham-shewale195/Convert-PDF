import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileStack, Scissors, Minimize2, Image as ImageIcon, FileImage, Type, Droplets,
  FileSpreadsheet, RotateCw, ArrowLeft, Upload, Download, Loader2, X, Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";

type ToolId =
  | "merge" | "split" | "compress" | "pdf2img" | "img2pdf" | "text2pdf"
  | "watermark" | "excel2pdf" | "rotate";

const TOOLS: { id: ToolId; title: string; desc: string; icon: any; accent: string }[] = [
  { id: "merge",     title: "Merge PDFs",      desc: "Combine multiple PDFs into one.",      icon: FileStack,       accent: "from-blue-500 to-cyan-500" },
  { id: "split",     title: "Split PDF",       desc: "Extract pages into separate files.",   icon: Scissors,        accent: "from-pink-500 to-rose-500" },
  { id: "compress",  title: "Compress PDF",    desc: "Reduce PDF file size.",                icon: Minimize2,       accent: "from-emerald-500 to-teal-500" },
  { id: "pdf2img",   title: "PDF to JPG",      desc: "Convert each page to an image.",       icon: ImageIcon,       accent: "from-violet-500 to-purple-500" },
  { id: "img2pdf",   title: "JPG/PNG to PDF",  desc: "Bundle images into a single PDF.",     icon: FileImage,       accent: "from-amber-500 to-orange-500" },
  { id: "text2pdf",  title: "Text to PDF",     desc: "Paste any text → instant PDF.",        icon: Type,            accent: "from-sky-500 to-indigo-500" },
  { id: "watermark", title: "Watermark PDF",   desc: "Add custom text watermark.",           icon: Droplets,        accent: "from-cyan-500 to-blue-500" },
  { id: "excel2pdf", title: "Excel to PDF",    desc: "Convert .xlsx sheets to PDF.",         icon: FileSpreadsheet, accent: "from-green-500 to-emerald-500" },
  { id: "rotate",    title: "Rotate PDF",      desc: "Rotate every page 90/180/270°.",       icon: RotateCw,        accent: "from-fuchsia-500 to-pink-500" },
];

export default function Tools() {
  const [active, setActive] = useState<ToolId | null>(null);
  const tool = TOOLS.find((t) => t.id === active);

  return (
    <section id="tools" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-3">
            <Plus className="w-3.5 h-3.5 text-primary" /> All-in-one toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Every <span className="gradient-text">PDF tool</span> you need
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Merge, split, compress, convert and more — every tool runs locally in your browser.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              {TOOLS.map((t, i) => (
                <motion.button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="text-left glass rounded-2xl p-4 sm:p-5 hover:bg-white/[0.09] transition group"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                    <t.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{t.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.desc}</p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-strong rounded-3xl p-5 sm:p-8 glow-ring"
            >
              <div className="flex items-center justify-between mb-6 gap-3">
                <button onClick={() => setActive(null)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-foreground hover:bg-white/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>All Tools</span>
                </button>
                <div className="text-right min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg truncate">{tool?.title}</h3>
                  <p className="text-xs text-muted-foreground hidden sm:block truncate">{tool?.desc}</p>
                </div>
              </div>
              <ToolPanel id={active} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* -------------------------- shared dropzone hook -------------------------- */
function useDropFiles(multiple: boolean, accept: string) {
  const [files, setFiles] = useState<File[]>([]);
  const [over, setOver] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setOver(false);
    const fs = Array.from(e.dataTransfer.files || []);
    if (!fs.length) return;
    setFiles(multiple ? [...fs] : [fs[0]]);
  }, [multiple]);
  const Dropzone = (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-10 text-center transition-all duration-300 ease-out group ${
        over ? "border-primary bg-primary/10 scale-[1.02] shadow-[0_0_40px_rgba(139,92,246,0.15)]" : "border-white/15 hover:border-primary/50 hover:bg-white/[0.03] hover:scale-[1.01]"
      }`}
    >
      <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden"
        onChange={(e) => { const fs = Array.from(e.target.files || []); if (fs.length) setFiles(multiple ? fs : [fs[0]]); }} />
      <div className="mx-auto w-14 h-14 rounded-2xl btn-gradient flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300">
        <Upload className="w-6 h-6" />
      </div>
      <p className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors duration-300">Drop {multiple ? "files" : "a file"} or click to browse</p>
      <p className="text-xs text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-white/60">{accept}</p>
    </div>
  );
  return { files, setFiles, Dropzone };
}

function FileList({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) {
  if (!files.length) return null;
  return (
    <ul className="space-y-2 mt-4">
      {files.map((f, i) => (
        <li key={i} className="flex items-center gap-3 p-3 rounded-xl glass">
          <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shrink-0 text-xs">{i + 1}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{f.name}</p>
            <p className="text-xs text-muted-foreground">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="Remove">
            <X className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function ActionButton({ onClick, busy, children, disabled }: { onClick: () => void; busy: boolean; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={busy || disabled}
      className="w-full mt-5 btn-gradient rounded-2xl py-3.5 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:-translate-y-0 disabled:hover:shadow-none group">
      {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</> : <><Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" /> {children}</>}
    </button>
  );
}

function LoadingState() {
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
async function loadPdfJs() {
  const pdfjs: any = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  return pdfjs;
}

/* ---------------- per-tool panels ---------------- */
function ToolPanel({ id }: { id: ToolId }) {
  switch (id) {
    case "merge":     return <MergePanel />;
    case "split":     return <SplitPanel />;
    case "compress":  return <CompressPanel />;
    case "pdf2img":   return <Pdf2ImgPanel />;
    case "img2pdf":   return <Img2PdfPanel />;
    case "text2pdf":  return <Text2PdfPanel />;
    case "watermark": return <WatermarkPanel />;
    case "excel2pdf": return <Excel2PdfPanel />;
    case "rotate":    return <RotatePanel />;
  }
}

function MergePanel() {
  const { files, setFiles, Dropzone } = useDropFiles(true, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (files.length < 2) return toast.error("Pick at least 2 PDFs");
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer());
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, "merged.pdf");
      setState("success");
      toast.success("Merged successfully!");
    } catch (e) { console.error(e); setState("idle"); toast.error("Merge failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={files.length < 2}>Merge & prepare</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function SplitPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const JSZip = (await import("jszip")).default;
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const zip = new JSZip();
      for (let i = 0; i < src.getPageCount(); i++) {
        const doc = await PDFDocument.create();
        const [p] = await doc.copyPages(src, [i]);
        doc.addPage(p);
        zip.file(`page-${i + 1}.pdf`, await doc.save());
      }
      const blob = await zip.generateAsync({ type: "blob" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-pages.zip");
      setState("success");
      toast.success("Split into pages successfully!");
    } catch (e) { console.error(e); setState("idle"); toast.error("Split failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Split into pages</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function CompressPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const bytes = await src.save({ useObjectStreams: true });
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-compressed.pdf");
      setState("success");
      toast.success("Compressed successfully!");
    } catch (e) { console.error(e); setState("idle"); toast.error("Compress failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <p className="text-xs text-muted-foreground mt-3">Lossless re-save using object streams. Best for text-heavy PDFs.</p>}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Compress PDF</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function Pdf2ImgPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const pdfjs = await loadPdfJs();
      const pdf = await pdfjs.getDocument({ data: await files[0].arrayBuffer() }).promise;
      
      // Calculate total height and max width for the combined canvas
      let totalHeight = 0;
      let maxWidth = 0;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        totalHeight += viewport.height;
        maxWidth = Math.max(maxWidth, viewport.width);
        pages.push({ page, viewport });
      }

      // Create a single canvas to hold all stitched pages
      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = totalHeight;
      const ctx = canvas.getContext("2d")!;
      // Fill with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let currentY = 0;
      for (let i = 0; i < pages.length; i++) {
        const { page, viewport } = pages[i];
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = viewport.width;
        tempCanvas.height = viewport.height;
        const tempCtx = tempCanvas.getContext("2d")!;
        
        await page.render({ canvasContext: tempCtx, viewport, canvas: tempCanvas }).promise;
        // Draw the rendered page onto the main canvas
        // Center the page if it's narrower than the max width
        const xOffset = (maxWidth - viewport.width) / 2;
        ctx.drawImage(tempCanvas, xOffset, currentY);
        currentY += viewport.height;
      }

      const rawBlob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), "image/jpeg", 0.9)!);
      const blob = new Blob([rawBlob], { type: "image/jpeg" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + ".jpg");
      setState("success");
      toast.success("Image ready");
    } catch (e) { console.error(e); setState("idle"); toast.error("Conversion failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Convert to JPG</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function Img2PdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(true, "image/*");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files.length) return;
    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const img = /png$/i.test(f.name) ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, "images.pdf");
      setState("success");
      toast.success("PDF ready");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Create PDF</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function Text2PdfPanel() {
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!text.trim()) return toast.error("Enter some text");
    setState("processing");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const margin = 48; const w = pdf.internal.pageSize.getWidth() - margin * 2;
      const h = pdf.internal.pageSize.getHeight();
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(text, w);
      let y = margin;
      for (const l of lines) {
        if (y + 16 > h - margin) { pdf.addPage(); y = margin; }
        pdf.text(l, margin, y); y += 16;
      }
      const rawBlob = pdf.output("blob");
      const blob = new Blob([rawBlob], { type: "application/pdf" });
      await prepareDownload(blob, "text.pdf");
      setState("success");
      toast.success("PDF generated");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && (
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10}
          placeholder="Paste or write your text here…"
          className="w-full glass rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-4" />
      )}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!text.trim()}>Generate PDF</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function WatermarkPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [text, setText] = useState("CONFIDENTIAL");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument, StandardFonts, degrees, rgb } = await import("pdf-lib");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      const font = await src.embedFont(StandardFonts.HelveticaBold);
      for (const page of src.getPages()) {
        const { width, height } = page.getSize();
        const size = Math.min(width, height) / 8;
        page.drawText(text, {
          x: width / 2 - (text.length * size) / 4, y: height / 2,
          size, font, color: rgb(0.85, 0.1, 0.1), opacity: 0.25, rotate: degrees(-35),
        });
      }
      const bytes = await src.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-watermarked.pdf");
      setState("success");
      toast.success("Watermark added");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <>
          <label className="block text-xs text-muted-foreground mt-4 mb-1.5">Watermark text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
        </>
      )}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length || !text.trim()}>Add watermark</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function Excel2PdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".xlsx,.xls,.csv");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const XLSX = await import("xlsx");
      const { jsPDF } = await import("jspdf");
      const wb = XLSX.read(await files[0].arrayBuffer(), { type: "array" });
      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
      const margin = 32; const pageW = pdf.internal.pageSize.getWidth(); const pageH = pdf.internal.pageSize.getHeight();
      let first = true;
      for (const name of wb.SheetNames) {
        const rows: any[][] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
        if (!first) pdf.addPage(); first = false;
        pdf.setFontSize(14); pdf.text(name, margin, margin);
        pdf.setFontSize(9);
        const cols = Math.max(1, ...rows.map((r) => r.length));
        const colW = (pageW - margin * 2) / cols;
        let y = margin + 24;
        for (const row of rows) {
          for (let c = 0; c < cols; c++) {
            const v = row[c] == null ? "" : String(row[c]);
            const text = v.length > 30 ? v.slice(0, 28) + "…" : v;
            pdf.text(text, margin + c * colW, y);
          }
          y += 14;
          if (y > pageH - margin) { pdf.addPage(); y = margin; }
        }
      }
      const rawBlob = pdf.output("blob");
      const blob = new Blob([rawBlob], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.(xlsx|xls|csv)$/i, "") + ".pdf");
      setState("success");
      toast.success("Converted");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Convert to PDF</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}

function RotatePanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();
  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const src = await PDFDocument.load(await files[0].arrayBuffer());
      for (const p of src.getPages()) {
        const cur = p.getRotation().angle;
        p.setRotation(degrees((cur + angle) % 360));
      }
      const bytes = await src.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + `-rotated-${angle}.pdf`);
      setState("success");
      toast.success("Rotated");
    } catch (e) { console.error(e); setState("idle"); toast.error("Failed"); }
  };
  return (
    <>
      {state === "idle" && Dropzone}
      {state === "idle" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <div className="flex gap-2 mt-4">
          {[90, 180, 270].map((a) => (
            <button key={a} onClick={() => setAngle(a as any)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${angle === a ? "btn-gradient" : "glass hover:bg-white/10"}`}>{a}°</button>
          ))}
        </div>
      )}
      {state === "idle" && <ActionButton onClick={run} busy={false} disabled={!files.length}>Rotate pages</ActionButton>}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
