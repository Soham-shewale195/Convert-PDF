import { createFileRoute } from "@tanstack/react-router";
import {
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Globe,
  FileCheck,
} from "lucide-react";
import { ArrowLeftRight, FileImage, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/webp-to-jpg")({
  head: () => ({
    meta: [
      { title: "WEBP to JPG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert modern WEBP images to JPG format online for free." },
      { property: "og:title", content: "WEBP to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Convert modern WEBP images to JPG format online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/webp-to-jpg" }],
  }),
  component: WebpToJpgPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is WEBP to JPG Conversion?",
    paragraphs: [
      "WEBP to JPG conversion re-encodes a WebP image into the JPEG format. WebP is a modern image format developed by Google that offers excellent compression but is not universally supported by all applications, older image editors, and some print services. JPEG, by contrast, is the most widely accepted image format across devices, platforms, and software.",
      "Our converter uses the browser's Canvas API to perform the transformation. The WebP file is decoded natively by the browser (all modern browsers support WebP) and drawn onto an off-screen canvas element. Because JPEG does not support transparency, the canvas is pre-filled with a white background before the image is drawn. The canvas then exports the result as a JPEG at 92% quality using the toBlob method, balancing good visual fidelity with reasonable file size.",
    ],
  },
  howTo: {
    heading: "How to Convert WEBP to JPG in 3 Steps",
    steps: [
      {
        title: "Upload your WEBP file",
        description:
          "Drag and drop a WEBP file onto the upload area, or click to browse your device. The file is loaded into browser memory using the File API.",
      },
      {
        title: "Preview",
        description:
          "A preview of the decoded image is displayed so you can confirm you have selected the correct file.",
      },
      {
        title: "Convert and download",
        description:
          'Click "Convert to JPG" to re-encode the image. The JPEG file is generated in your browser and downloaded directly to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Convert WEBP to JPG",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "The conversion runs entirely in your browser via the Canvas API. Your images never leave your device.",
      },
      {
        icon: Globe,
        title: "Universal compatibility",
        description:
          "JPEG is supported by virtually every image viewer, editor, social platform, and print service. Converting from WebP eliminates compatibility issues.",
      },
      {
        icon: FileCheck,
        title: "Clean transparency handling",
        description:
          "Transparent WebP areas are automatically filled with a white background. The output is a clean, predictable JPEG.",
      },
      {
        icon: Zap,
        title: "Instant conversion",
        description:
          "Canvas re-encoding is handled natively by the browser engine. Most WebP files convert in well under a second.",
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
    heading: "When to Convert WEBP to JPG",
    intro:
      "Switching from WebP to JPEG is useful whenever you encounter compatibility limitations:",
    items: [
      {
        label: "Opening images in older software",
        description:
          "Many legacy applications and older versions of image editors do not recognise the WebP format. Converting to JPEG makes the file accessible in any software.",
      },
      {
        label: "Sharing on platforms that reject WEBP",
        description:
          "Some forums, messaging apps, and document management systems do not accept WebP uploads. JPEG conversion satisfies the requirement instantly.",
      },
      {
        label: "Printing images",
        description:
          "Most photo printing services accept JPEG but not WebP. Convert before uploading to a print lab or on-demand service.",
      },
      {
        label: "Saving images downloaded from websites",
        description:
          "Many modern websites serve images in WebP format. If you save one and need to use it elsewhere, converting to JPEG ensures broad compatibility.",
      },
      {
        label: "Embedding in office documents",
        description:
          "Microsoft Office, Google Docs, and some presentation tools handle JPEG more reliably than WebP. Converting before inserting avoids rendering issues.",
      },
    ],
  },
  privacy: {
    heading: "Private Format Conversion",
    paragraphs: [
      "When you convert a WebP to JPG on ConvertPDF, the file is read into your browser's memory using the File API. The browser decodes the WebP natively and draws it onto a hidden Canvas element pre-filled with a white background. The canvas exports the composited result as a JPEG blob — all within the browser's sandboxed JavaScript environment.",
      "No image data is transmitted to any server. There are no upload queues, no cloud processing, and no temporary storage. When you close the tab, all in-memory pixel data is released by the browser's garbage collector.",
    ],
  },
  faqs: [
    {
      question: "Will I lose quality converting WEBP to JPG?",
      answer:
        "There is a minor quality difference because JPEG uses lossy compression. The converter exports at 92% quality, which preserves strong visual fidelity. For photographic content, the difference is not perceptible in normal viewing conditions.",
    },
    {
      question: "What happens to transparency in a WEBP file?",
      answer:
        "Transparent areas are composited onto a white background before the JPEG is generated. JPEG does not support transparency, so this step ensures the output appears clean and consistent.",
    },
    {
      question: "Does my browser support WEBP input?",
      answer:
        "All modern browsers — Chrome, Firefox, Safari, Edge, and Opera — support WebP decoding natively. If your browser can display the WebP file, it can convert it using this tool.",
    },
    {
      question: "Will the image dimensions change during conversion?",
      answer:
        "No. The pixel width and height remain identical to the original WebP image. Only the encoding format changes.",
    },
    {
      question: "Can I convert animated WEBP files?",
      answer:
        "Animated WebP files contain multiple frames, similar to a GIF. This tool converts only the first frame of an animated WebP to a static JPEG image.",
    },
    {
      question: "Can I convert multiple WEBP files at once?",
      answer:
        "The tool processes one file at a time. For multiple conversions, process each file individually. This keeps the interface simple and allows you to verify each result.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. All processing happens locally in your browser using the Canvas API. Your WebP file is decoded, drawn onto a canvas, exported as JPEG, and downloaded — entirely without network requests.",
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
      name: "PNG to JPG",
      href: "/png-to-jpg",
      description: "Convert PNG to compact JPG",
      icon: FileImage,
      accent: "from-orange-500 to-amber-500",
    },
    {
      name: "Compress Image",
      href: "/compress-image",
      description: "Reduce image file size",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "browser-pdf-converter-privacy"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function WebpToJpgPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert WEBP to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="WEBP to JPG"
        description="Convert modern WEBP images to JPG format."
        icon={ImageIcon}
        accent="from-indigo-500 to-violet-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <FormatConvertPanel from="webp" to="jpg" />
      </ToolPageLayout>
    </>
  );
}
