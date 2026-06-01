import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  FileStack, Scissors, Minimize2, Image as ImageIcon, FileImage, Type, Droplets,
  FileSpreadsheet, RotateCw, Plus,
} from "lucide-react";

type ToolId =
  | "merge" | "split" | "compress" | "pdf2img" | "img2pdf" | "text2pdf"
  | "watermark" | "excel2pdf" | "rotate";

const TOOLS: { id: ToolId; title: string; desc: string; icon: any; accent: string; path: string }[] = [
  { id: "merge",     title: "Merge PDFs",      desc: "Combine multiple PDFs into one.",      icon: FileStack,       accent: "from-blue-500 to-cyan-500",    path: "/merge-pdf" },
  { id: "split",     title: "Split PDF",       desc: "Extract pages into separate files.",   icon: Scissors,        accent: "from-pink-500 to-rose-500",    path: "/split-pdf" },
  { id: "compress",  title: "Compress PDF",    desc: "Reduce PDF file size.",                icon: Minimize2,       accent: "from-emerald-500 to-teal-500", path: "/compress-pdf" },
  { id: "pdf2img",   title: "PDF to JPG",      desc: "Convert each page to an image.",       icon: ImageIcon,       accent: "from-violet-500 to-purple-500",path: "/pdf-to-jpg" },
  { id: "img2pdf",   title: "JPG/PNG to PDF",  desc: "Bundle images into a single PDF.",     icon: FileImage,       accent: "from-amber-500 to-orange-500", path: "/jpg-to-pdf" },
  { id: "text2pdf",  title: "Text to PDF",     desc: "Paste any text → instant PDF.",        icon: Type,            accent: "from-sky-500 to-indigo-500",   path: "/text-to-pdf" },
  { id: "watermark", title: "Watermark PDF",   desc: "Add custom text watermark.",           icon: Droplets,        accent: "from-cyan-500 to-blue-500",    path: "/watermark-pdf" },
  { id: "excel2pdf", title: "Excel to PDF",    desc: "Convert .xlsx sheets to PDF.",         icon: FileSpreadsheet, accent: "from-green-500 to-emerald-500",path: "/excel-to-pdf" },
  { id: "rotate",    title: "Rotate PDF",      desc: "Rotate every page 90/180/270°.",       icon: RotateCw,        accent: "from-fuchsia-500 to-pink-500", path: "/rotate-pdf" },
];

export default function Tools() {
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={t.path}
                className="block text-left glass rounded-2xl p-4 sm:p-5 hover:bg-white/[0.09] transition group h-full"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                  <t.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base mb-1">{t.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{t.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
