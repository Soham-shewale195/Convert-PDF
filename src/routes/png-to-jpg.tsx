import { createFileRoute } from "@tanstack/react-router";
import {
  FileImage,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  HardDrive,
  Paintbrush,
} from "lucide-react";
import { ArrowLeftRight, Image as ImageLucide, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/png-to-jpg")({
  head: () => ({
    meta: [
      { title: "PNG to JPG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert PNG images to compact JPG format online for free." },
      { property: "og:title", content: "PNG to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Convert PNG images to compact JPG format online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/png-to-jpg" }],
  }),
  component: PngToJpgPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PNG to JPG Conversion?",
    paragraphs: [
      "PNG to JPG conversion re-encodes a PNG image into the JPEG format. PNG files use lossless compression and can be quite large, especially for photographs. JPEG applies lossy compression to achieve dramatically smaller file sizes while retaining visual quality that is more than adequate for most photographic content.",
      "Our converter uses the browser's Canvas API. The PNG is decoded and drawn onto an off-screen canvas element. Because JPEG does not support transparency, the converter first fills the canvas with a white background before drawing the image on top. The canvas then exports the composited result as a JPEG at 92% quality using the toBlob method — a level that preserves strong visual fidelity while delivering meaningful file size reduction.",
    ],
  },
  howTo: {
    heading: "How to Convert PNG to JPG in 3 Steps",
    steps: [
      {
        title: "Upload your PNG file",
        description:
          "Drag and drop a PNG file onto the upload area, or click to browse. The image is loaded into your browser's memory using the File API.",
      },
      {
        title: "Preview",
        description:
          "A preview of your image appears so you can confirm you have selected the correct file before converting.",
      },
      {
        title: "Convert and download",
        description:
          'Click "Convert to JPG" to re-encode the image. The new JPEG file is generated in your browser and downloaded directly to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Convert PNG to JPG",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "The conversion runs entirely in your browser via the Canvas API. Your images never leave your device.",
      },
      {
        icon: HardDrive,
        title: "Smaller file sizes",
        description:
          "JPEG's lossy compression typically produces files several times smaller than the PNG source, especially for photographic images.",
      },
      {
        icon: Paintbrush,
        title: "Clean transparency handling",
        description:
          "Transparent PNG areas are automatically filled with a white background before conversion, so you get a clean, predictable result.",
      },
      {
        icon: Zap,
        title: "Instant conversion",
        description:
          "Canvas re-encoding is handled natively by the browser. Most PNG files convert in well under a second.",
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
    heading: "When to Convert PNG to JPG",
    intro: "Switching from PNG to JPEG is the right choice in several common situations:",
    items: [
      {
        label: "Reducing photo file sizes",
        description:
          "Photographs exported as PNG can be many megabytes. Converting to JPEG shrinks them substantially, making them faster to share and upload.",
      },
      {
        label: "Uploading to web platforms",
        description:
          "Many CMS platforms, social media sites, and forums handle JPEG more efficiently than PNG. Converting before uploading can speed up the process.",
      },
      {
        label: "Meeting email attachment limits",
        description:
          "Large PNG screenshots or photos may exceed email size limits. JPEG conversion brings the file size down without significantly affecting visual quality.",
      },
      {
        label: "Saving storage space",
        description:
          "If you have a collection of PNG photos from a camera or screenshot tool, converting them to JPEG frees up storage on your device.",
      },
      {
        label: "Preparing images for print services",
        description:
          "Some print-on-demand services and photo labs prefer JPEG uploads. Converting your PNG ensures compatibility with their workflow.",
      },
    ],
  },
  privacy: {
    heading: "Private Format Conversion",
    paragraphs: [
      "When you convert a PNG to JPG on ConvertPDF, the file is read into your browser's memory using the File API. A hidden Canvas element is created, filled with a white background, and your PNG is drawn on top. The canvas then exports the composited image as a JPEG blob — all within the browser's sandboxed JavaScript environment.",
      "No image data is transmitted over the internet. There are no cloud processing queues, no temporary uploads, and no server-side rendering. When you close the tab, all pixel data in memory is released by the browser.",
    ],
  },
  faqs: [
    {
      question: "Will I lose image quality when converting PNG to JPG?",
      answer:
        "There is a small amount of quality reduction because JPEG uses lossy compression. However, the converter uses a quality setting of 92%, which preserves strong visual fidelity. For photographs, the difference is virtually imperceptible to the human eye.",
    },
    {
      question: "What happens to transparent areas in my PNG?",
      answer:
        "Transparent regions are filled with a white background before the JPEG is generated. JPEG does not support transparency, so this step ensures the output looks clean and predictable rather than showing black or corrupted areas.",
    },
    {
      question: "Will the image dimensions change during conversion?",
      answer:
        "No. The pixel width and height remain identical to the original PNG. Only the encoding format and compression method change.",
    },
    {
      question: "How much smaller will the JPG file be?",
      answer:
        "The reduction depends on the image content. Photographs typically see a large reduction — often 50% to 80% smaller. Images with large flat colour areas or text may see smaller gains because PNG compresses those patterns efficiently.",
    },
    {
      question: "Can I adjust the JPEG quality level?",
      answer:
        "The converter uses a fixed quality of 92% for the best balance of size and fidelity. If you need more aggressive compression, use our Compress Image tool after conversion to dial in a specific quality level.",
    },
    {
      question: "Can I convert multiple PNGs at once?",
      answer:
        "The tool processes one image at a time. For multiple files, convert each one individually. This ensures you can verify each result before proceeding.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. All processing happens locally in your browser using the Canvas API. Your PNG is decoded, drawn onto a canvas with a white background, exported as JPEG, and downloaded — without any network requests.",
    },
  ],
  relatedTools: [
    {
      name: "JPG to PNG",
      href: "/jpg-to-png",
      description: "Convert JPG to lossless PNG",
      icon: ArrowLeftRight,
      accent: "from-teal-500 to-cyan-500",
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
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function PngToJpgPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert PNG to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="PNG to JPG"
        description="Convert PNG images to compact JPG format."
        icon={FileImage}
        accent="from-orange-500 to-amber-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <FormatConvertPanel from="png" to="jpg" />
      </ToolPageLayout>
    </>
  );
}
