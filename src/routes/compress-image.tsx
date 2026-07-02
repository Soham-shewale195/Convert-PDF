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
      "Image compression reduces the file size of a photograph or graphic so that it takes up less storage, loads faster on web pages, and fits within upload limits on forms and social platforms. Most images captured by cameras or exported from design tools contain far more pixel data than is needed for everyday viewing.",
      "Our compressor works by re-encoding your image as a JPEG at the quality level you choose. The browser's Canvas API draws the original image onto an off-screen canvas, then exports it with the canvas.toBlob method using your selected quality parameter. Lower quality values apply stronger lossy compression, resulting in a smaller file. Higher values preserve more detail at the cost of a larger file. The entire operation happens in your browser — no pixels leave your device.",
    ],
  },
  howTo: {
    heading: "How to Compress an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. The file is read into your browser's memory using the File API.",
      },
      {
        title: "Adjust the quality slider",
        description:
          "Move the quality slider to balance file size against visual detail. The estimated output size updates in real time so you can find the right trade-off before committing.",
      },
      {
        title: "Compress and download",
        description:
          'Click "Compress Image" to re-encode the file at your chosen quality. Once finished, download the compressed JPEG directly to your device.',
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
          "All compression runs inside your browser using the Canvas API. Your images are never uploaded to any server.",
      },
      {
        icon: SlidersHorizontal,
        title: "Adjustable quality",
        description:
          "A quality slider lets you dial in exactly how much compression to apply — from maximum reduction to near-lossless output.",
      },
      {
        icon: Eye,
        title: "Live size preview",
        description:
          "See the estimated output file size and percentage reduction update in real time as you adjust the quality slider.",
      },
      {
        icon: Zap,
        title: "Fast processing",
        description:
          "Canvas re-encoding is handled natively by the browser engine. Most images compress in under a second.",
      },
      {
        icon: Cloud,
        title: "No signup needed",
        description: "The tool is free and open. No account, no email, no hidden charges.",
      },
      {
        icon: Smartphone,
        title: "Works on any device",
        description:
          "Compress images on your phone, tablet, or desktop — the interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Compress Images",
    intro: "Reducing image file size is useful in many everyday and professional workflows:",
    items: [
      {
        label: "Speeding up web pages",
        description:
          "Smaller images load faster, improving page performance and visitor experience on blogs, portfolios, and e-commerce sites.",
      },
      {
        label: "Meeting upload limits",
        description:
          "Job portals, government forms, and social media platforms often cap image uploads at a few megabytes. Compression gets you under the limit.",
      },
      {
        label: "Reducing email size",
        description:
          "Compress photos before attaching them to emails so recipients can download them quickly, even on mobile connections.",
      },
      {
        label: "Saving device storage",
        description:
          "Batch-compress holiday photos or screenshots to free up space on your phone or laptop without deleting files.",
      },
      {
        label: "Preparing social media posts",
        description:
          "Platforms re-compress images on upload, often reducing quality unpredictably. Pre-compressing to a controlled quality gives you a cleaner result.",
      },
    ],
  },
  privacy: {
    heading: "Private Image Compression",
    paragraphs: [
      "When you compress an image on ConvertPDF, the file is read directly into your browser's memory using the File API. The browser's Canvas API draws the image onto a hidden canvas element and re-encodes it as a JPEG at your chosen quality level — all within the browser's sandboxed JavaScript environment.",
      "No image data is sent over the internet. There are no background uploads, no cloud queues, and no server-side processing. Once you close the tab, all in-memory pixel data is released. Whether you are compressing personal photos, client assets, or confidential documents, your images stay on your device.",
    ],
  },
  faqs: [
    {
      question: "What image formats can I compress?",
      answer:
        "You can upload any image format supported by your browser, including JPEG, PNG, WebP, GIF, and BMP. The output is always saved as a JPEG, which provides efficient lossy compression for photographic content.",
    },
    {
      question: "How does the quality slider affect the result?",
      answer:
        "The slider controls the quality parameter passed to the browser's canvas.toBlob method. Lower values (for example 30–50) produce smaller files with visible compression artefacts. Higher values (70–90) keep most visual detail while still reducing size. A setting of 100 retains maximum quality with minimal compression.",
    },
    {
      question: "Will compression change the dimensions of my image?",
      answer:
        "No. The compressor preserves the original pixel dimensions. Only the encoding quality changes, which affects file size but not the width or height of the image.",
    },
    {
      question: "Why is the output a JPEG even if I upload a PNG?",
      answer:
        "JPEG compression is specifically designed for photographic images and achieves much smaller file sizes than PNG through lossy encoding. If you need to keep PNG format with transparency, consider using our Resize tool or format converter instead.",
    },
    {
      question: "Is the estimated size shown before compression accurate?",
      answer:
        "The estimate is generated by performing a trial compression at your current quality setting. The final file size will match the estimate because the same quality parameter is used for the actual compression.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. ConvertPDF processes everything inside your web browser using the Canvas API. Your images are read from disk into browser memory, re-encoded locally, and then downloaded. No network requests are made with your image data.",
    },
  ],
  relatedTools: [
    {
      name: "Resize Image",
      href: "/resize-image",
      description: "Scale images to custom dimensions",
      icon: Maximize2,
      accent: "from-rose-500 to-pink-500",
    },
    {
      name: "Crop Image",
      href: "/crop-image",
      description: "Trim images to any area",
      icon: Crop,
      accent: "from-sky-500 to-blue-500",
    },
    {
      name: "JPG to PNG",
      href: "/jpg-to-png",
      description: "Convert to lossless PNG format",
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
