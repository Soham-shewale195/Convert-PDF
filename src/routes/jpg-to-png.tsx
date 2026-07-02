import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Layers,
  ImageIcon,
} from "lucide-react";
import { FileImage, Image as ImageLucide } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/jpg-to-png")({
  head: () => ({
    meta: [
      { title: "JPG to PNG Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content: "Convert JPG images to lossless PNG format online for free.",
      },
      { property: "og:title", content: "JPG to PNG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Convert JPG images to lossless PNG format online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/jpg-to-png" }],
  }),
  component: JpgToPngPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is JPG to PNG Conversion?",
    paragraphs: [
      "JPG to PNG conversion re-encodes a JPEG image into the PNG (Portable Network Graphics) format. JPEG uses lossy compression — it discards some pixel data to achieve smaller files. PNG uses lossless compression, preserving every pixel exactly. Converting from JPG to PNG is useful when you need transparency support, sharper edges on text and graphics, or a format that will not degrade further with repeated editing.",
      "Our converter uses the browser's Canvas API to perform the transformation. The JPEG file is decoded by the browser and drawn onto an off-screen canvas element. The canvas then exports the image as a PNG using the toBlob method. Because the canvas holds the fully decoded pixel data, the PNG output captures everything the browser rendered — including any areas that could become transparent if composited with other layers later.",
    ],
  },
  howTo: {
    heading: "How to Convert JPG to PNG in 3 Steps",
    steps: [
      {
        title: "Upload your JPG file",
        description:
          "Drag and drop a JPG or JPEG file onto the upload area, or click to browse. The file is loaded into your browser's memory.",
      },
      {
        title: "Preview",
        description:
          "A preview of your image is displayed so you can verify it is the correct file before converting.",
      },
      {
        title: "Convert and download",
        description:
          'Click "Convert to PNG" to re-encode the image. The new PNG file is generated in your browser and downloaded directly to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Convert JPG to PNG",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "The conversion runs entirely in your browser via the Canvas API. Your images never leave your device.",
      },
      {
        icon: Layers,
        title: "Lossless output",
        description:
          "PNG preserves every pixel without additional compression artefacts. The converted file will not degrade with further edits or re-saves.",
      },
      {
        icon: ImageIcon,
        title: "Transparency-ready",
        description:
          "PNG supports an alpha channel. After conversion, you can add transparency in an image editor — something JPEG cannot do.",
      },
      {
        icon: Zap,
        title: "Instant conversion",
        description:
          "Canvas re-encoding is handled natively by the browser. Most files convert in well under a second.",
      },
      {
        icon: Cloud,
        title: "No account required",
        description: "The tool is free and open. No signup, no email, no hidden charges.",
      },
      {
        icon: Smartphone,
        title: "Works on any device",
        description:
          "Convert images on your phone, tablet, or desktop. The responsive interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Convert JPG to PNG",
    intro: "Switching from JPEG to PNG is the right choice in several common scenarios:",
    items: [
      {
        label: "Editing graphics with sharp edges",
        description:
          "Logos, icons, and screenshots contain hard edges and flat colour areas. PNG preserves these cleanly, whereas JPEG introduces visible artefacts around sharp transitions.",
      },
      {
        label: "Adding transparency later",
        description:
          "If you plan to remove a background or composite the image onto other layers, you need PNG format because JPEG does not support an alpha channel.",
      },
      {
        label: "Preserving quality during editing",
        description:
          "Each time a JPEG is re-saved, it loses a small amount of detail. Converting to PNG before editing prevents this cumulative quality loss.",
      },
      {
        label: "Meeting upload requirements",
        description:
          "Some platforms, forms, and design tools specifically require PNG files. Converting your JPEG satisfies the requirement without needing desktop software.",
      },
      {
        label: "Archiving important images",
        description:
          "Store photographs or scans in lossless PNG format for long-term archiving, ensuring no further quality degradation over time.",
      },
    ],
  },
  privacy: {
    heading: "Private Format Conversion",
    paragraphs: [
      "When you convert a JPG to PNG on ConvertPDF, the JPEG file is read into browser memory using the File API. The browser decodes the image and draws it onto a hidden Canvas element, then exports the pixel data as a PNG blob using canvas.toBlob — all within the browser's sandboxed JavaScript environment.",
      "No image data is transmitted over the internet. There are no upload queues, no cloud rendering, and no server-side storage. Once you close the tab, all in-memory pixel data is released by the browser.",
    ],
  },
  faqs: [
    {
      question: "Does converting JPG to PNG improve image quality?",
      answer:
        "It prevents further quality loss but does not restore detail already discarded by JPEG compression. The PNG output faithfully preserves the pixel data as decoded by the browser, artefacts and all. It will not degrade further on re-saves.",
    },
    {
      question: "Why is the PNG file larger than the original JPG?",
      answer:
        "PNG uses lossless compression, which preserves every pixel. JPEG achieves smaller file sizes by discarding data. The trade-off for PNG's perfect fidelity is a larger file. This is expected behaviour.",
    },
    {
      question: "Will the image dimensions change during conversion?",
      answer:
        "No. The pixel width and height remain identical to the original JPEG. Only the encoding format changes.",
    },
    {
      question: "Can I convert multiple JPGs at once?",
      answer:
        "The tool processes one image at a time. For multiple files, convert each one individually. This keeps the interface simple and ensures you can verify each result.",
    },
    {
      question: "Does the converted PNG have a transparent background?",
      answer:
        "No. The original JPEG has no transparency data, so the PNG output has a fully opaque background. However, the PNG format now supports transparency, so you can add it later using an image editor.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. ConvertPDF processes everything inside your web browser using the Canvas API. Your images are decoded locally, re-encoded as PNG, and downloaded — entirely without network requests.",
    },
  ],
  relatedTools: [
    {
      name: "PNG to JPG",
      href: "/png-to-jpg",
      description: "Convert PNG to compact JPG",
      icon: FileImage,
      accent: "from-orange-500 to-amber-500",
    },
    {
      name: "WEBP to JPG",
      href: "/webp-to-jpg",
      description: "Convert WEBP to JPG format",
      icon: ImageLucide,
      accent: "from-indigo-500 to-violet-500",
    },
    {
      name: "Compress Image",
      href: "/compress-image",
      description: "Reduce image file size",
      icon: ArrowLeftRight,
      accent: "from-lime-500 to-green-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function JpgToPngPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert JPG to PNG Online" steps={howToSteps} />
      <ToolPageLayout
        title="JPG to PNG"
        description="Convert JPG images to lossless PNG format."
        icon={ArrowLeftRight}
        accent="from-teal-500 to-cyan-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <FormatConvertPanel from="jpg" to="png" />
      </ToolPageLayout>
    </>
  );
}
