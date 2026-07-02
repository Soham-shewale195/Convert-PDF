import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  FileImage,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  Crop,
  RotateCw,
  Droplets,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & tool definitions                                           */
/* ------------------------------------------------------------------ */
type ImageToolId =
  | "jpg2png"
  | "png2jpg"
  | "webp2jpg"
  | "resize"
  | "compress"
  | "crop"
  | "rotate-flip"
  | "watermark";

const IMAGE_TOOLS: {
  id: ImageToolId;
  title: string;
  desc: string;
  icon: any;
  accent: string;
  path: string;
}[] = [
  {
    id: "jpg2png",
    title: "JPG to PNG",
    desc: "Convert JPG images to lossless PNG format.",
    icon: ArrowLeftRight,
    accent: "from-teal-500 to-cyan-500",
    path: "/jpg-to-png",
  },
  {
    id: "png2jpg",
    title: "PNG to JPG",
    desc: "Convert PNG images to compact JPG format.",
    icon: FileImage,
    accent: "from-orange-500 to-amber-500",
    path: "/png-to-jpg",
  },
  {
    id: "webp2jpg",
    title: "WEBP to JPG",
    desc: "Convert modern WEBP images to JPG.",
    icon: ImageIcon,
    accent: "from-indigo-500 to-violet-500",
    path: "/webp-to-jpg",
  },
  {
    id: "resize",
    title: "Resize Image",
    desc: "Scale images to custom dimensions.",
    icon: Maximize2,
    accent: "from-rose-500 to-pink-500",
    path: "/resize-image",
  },
  {
    id: "compress",
    title: "Compress Image",
    desc: "Reduce image file size with quality control.",
    icon: Minimize2,
    accent: "from-lime-500 to-green-500",
    path: "/compress-image",
  },
  {
    id: "crop",
    title: "Crop Image",
    desc: "Trim images to any area you need.",
    icon: Crop,
    accent: "from-sky-500 to-blue-500",
    path: "/crop-image",
  },
  {
    id: "rotate-flip",
    title: "Rotate / Flip Image",
    desc: "Rotate 90°–270° or mirror horizontally.",
    icon: RotateCw,
    accent: "from-purple-500 to-fuchsia-500",
    path: "/rotate-image",
  },
  {
    id: "watermark",
    title: "Watermark Image",
    desc: "Overlay custom text on any image.",
    icon: Droplets,
    accent: "from-amber-500 to-yellow-500",
    path: "/watermark-image",
  },
];

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
export default function ImageTools() {
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

        {/* ---- Grid ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {IMAGE_TOOLS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <Link
                to={t.path}
                className="block text-left glass rounded-2xl p-5 sm:p-6 hover:bg-white/[0.09] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.25)] transition-all duration-300 group h-full"
              >
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-300`}
                >
                  <t.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base mb-1.5">{t.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
