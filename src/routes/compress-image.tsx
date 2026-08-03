import { createFileRoute } from "@tanstack/react-router";
import {
  Minimize2,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import { Maximize2, Crop, ArrowLeftRight } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CompressImagePanel from "@/components/tools/CompressImagePanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/compress-image")({
  head: () => ({
    meta: [
      { title: "Compress Image Online Free | ConvertPDF" },
      {
        name: "description",
        content: "Reduce image file size with quality control online for free.",
      },
      { property: "og:title", content: "Compress Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Reduce image file size with quality control online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/compress-image" }],
  }),
  component: CompressImagePage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Image Compression?",
    paragraphs: [
      "Image compression reduces the file size of a photograph or graphic so it loads faster on web pages, fits within upload limits on forms and social platforms, and occupies less storage on your device. The critical distinction is between the two families of compression: lossless, which preserves every pixel exactly, and lossy, which permanently discards some image data to achieve much smaller file sizes.",
      "**How it works technically:** This tool applies lossy JPEG compression, implemented through the browser's Canvas API. When you upload an image, the browser decodes it into raw pixel data and draws it onto a hidden canvas. At the moment of export, the canvas.toBlob method re-encodes those pixels as a JPEG using the quality parameter you set on the slider — a value from 1 (maximum compression, smallest file) to 100 (minimum compression, highest fidelity). Lower quality values instruct the JPEG encoder to discard finer colour gradients and high-frequency detail. Higher values retain more of that detail at the cost of a larger file. The live size estimate updates every time you move the slider by running a trial compression at the current setting — so what you see before you click is what you actually get.",
    ],
  },
  howTo: {
    heading: "How to Compress an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. The file is read into your browser's memory using the File API — it never leaves your device.",
      },
      {
        title: "Set the quality level",
        description:
          "Move the quality slider to find your target balance between file size and visual detail. Watch the estimated output size update in real time. A setting around 70 typically offers a strong reduction with very little visible difference from the original.",
      },
      {
        title: "Compress and download",
        description:
          'Click "Compress Image" to re-encode the file at your chosen quality. The compressed JPEG downloads directly to your device — no upload, no waiting, no cloud queue.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Image Compressor",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "Compression runs entirely inside your browser's sandboxed JavaScript environment. Your image data never travels over the network — not even a temporary upload.",
      },
      {
        icon: SlidersHorizontal,
        title: "Adjustable quality slider",
        description:
          "A 1–100 quality range lets you choose exactly how aggressively to compress. You are not locked into a preset — find the setting that works for your specific image.",
      },
      {
        icon: Eye,
        title: "Live estimated output size",
        description:
          "The tool runs a real trial compression at your current slider position, so the size shown before you click is the actual size of the file you will download.",
      },
      {
        icon: Zap,
        title: "Fast, native processing",
        description:
          "The browser's built-in canvas encoder handles compression without plugins or server round-trips. Most images re-encode in under a second on any modern device.",
      },
      {
        icon: Cloud,
        title: "No account or limits",
        description:
          "Compress as many images as you like. No signup, no usage cap, no watermark added to your output, no hidden charges.",
      },
      {
        icon: Smartphone,
        title: "Works on any device",
        description:
          "The quality slider and size preview work on phone, tablet, and desktop equally. No app installation required.",
      },
    ],
  },
  useCases: {
    heading: "When to Compress Images",
    intro:
      "Lossy JPEG compression is the right choice when file size matters more than preserving every pixel exactly — which covers the majority of everyday image-sharing scenarios:",
    items: [
      {
        label: "Reducing a product photo for an e-commerce listing (Workflow Example)",
        description:
          "A retailer exports a product photograph from their camera at roughly 8 MB. At quality 75, the compressor produces an estimate around 600–800 KB — a plausible reduction for a typical photographic image — keeping fine fabric texture readable in the browser without inflating page load time or failing platform upload validators.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not use lossy JPEG compression on images that contain crisp text, thin lines, logos, or transparent backgrounds. JPEG encoding introduces visible artefacts around sharp edges and colour boundaries, and it flattens any transparency to solid white. For those assets, use a lossless format like PNG instead.",
      },
      {
        label: "Meeting upload size caps",
        description:
          "Job portals, government applications, and social platforms frequently cap image uploads at 1–5 MB. Compress a large photograph to stay under the limit without cropping or resizing.",
      },
      {
        label: "Pre-compressing before platform re-encoding",
        description:
          "Social platforms apply their own compression on upload, which can introduce unpredictable artefacts. Pre-compressing to a controlled quality setting gives you a known starting point and often produces a cleaner final result on-platform.",
      },
      {
        label: "Reducing email attachment size",
        description:
          "Compressing photos before attaching them to an email ensures recipients can open them quickly on slow mobile connections, and avoids hitting mailbox attachment limits.",
      },
    ],
  },
  privacy: {
    heading: "Private, Browser-Only Compression",
    paragraphs: [
      "When you compress an image here, the file is read from your disk into browser memory using the File API. A hidden HTML canvas element renders the image and re-encodes it via canvas.toBlob at your chosen quality level — a process that runs entirely inside the browser's sandboxed JavaScript environment. No pixel data is transmitted to any server, not even for the live size estimate, which is computed by a local trial compression.",
      "There are no background uploads, no server-side processing queues, and no file retention of any kind. Whether the image is a personal photo, a client asset, or a confidential internal document, it stays on your device from the moment you upload it to the moment you download the compressed result. Closing the tab immediately releases all in-memory data.",
    ],
  },
  faqs: [
    {
      question: "How does the quality slider actually affect the file?",
      answer:
        "The slider maps directly to the quality parameter passed to canvas.toBlob, which controls how aggressively the JPEG encoder discards image data. Lower values tell the encoder to merge colour blocks more coarsely, removing subtle gradients and fine detail to shrink the file. Higher values preserve more of that detail at the cost of a larger output file. The relationship is not perfectly linear — the reduction at a given setting depends heavily on the content of your specific image.",
    },
    {
      question: "What image formats can I compress?",
      answer:
        "You can upload any format your browser supports as an image source, including JPEG, PNG, WebP, GIF, and BMP. Regardless of input format, the output is always saved as a JPEG file, because JPEG's lossy encoding achieves far smaller file sizes than PNG for photographic content.",
    },
    {
      question: "Why does my PNG get saved as a JPEG?",
      answer:
        "JPEG's lossy compression algorithm was designed for photographic images with smooth colour gradients, where small pixel-level approximations are imperceptible. PNG uses lossless compression, which preserves every pixel but produces much larger files. This tool re-encodes in JPEG because lossy compression is what actually shrinks file size. If you need to retain PNG format — for example, to preserve transparency — use a dedicated PNG optimiser or our JPG to PNG converter instead.",
    },
    {
      question: "Will compression change the pixel dimensions of my image?",
      answer:
        "No. The compressor preserves the original width and height in pixels exactly. Only the encoding quality changes, which reduces file size without altering how large the image appears or how many pixels it contains.",
    },
    {
      question: "Is the estimated size shown before I compress accurate?",
      answer:
        "Yes. The estimate is produced by performing a real trial compression at your current quality setting. Because the actual compression run uses the same quality parameter, the downloaded file will match the estimated size shown in the interface.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. ConvertPDF processes everything inside your web browser using the Canvas API. Your images are read from disk into browser memory, re-encoded locally, and downloaded. No network requests are made with your image data at any point — including during the live size estimation.",
    },
  ],
  relatedTools: [
    {
      name: "Resize Image",
      href: "/resize-image",
      description:
        "If your image is larger than it needs to be in pixel dimensions, resize it first — fewer pixels means a smaller file even before compression.",
      icon: Maximize2,
      accent: "from-rose-500 to-pink-500",
    },
    {
      name: "Crop Image",
      href: "/crop-image",
      description:
        "Remove unwanted edges or background before compressing — a tighter composition means fewer pixels to encode and a smaller output file.",
      icon: Crop,
      accent: "from-sky-500 to-blue-500",
    },
    {
      name: "JPG to PNG",
      href: "/jpg-to-png",
      description:
        "If your image requires a transparent background or lossless quality, convert to PNG instead of compressing as a JPEG.",
      icon: ArrowLeftRight,
      accent: "from-teal-500 to-cyan-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function CompressImagePage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Compress an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Compress Image"
        description="Reduce image file size with quality control."
        icon={Minimize2}
        accent="from-lime-500 to-green-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <CompressImagePanel />
      </ToolPageLayout>
    </>
  );
}
