import { createFileRoute } from "@tanstack/react-router";
import { Droplets, ShieldCheck, Zap, Smartphone, Cloud, Palette, Move } from "lucide-react";
import { Maximize2, Crop, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WatermarkImagePanel from "@/components/tools/WatermarkImagePanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/watermark-image")({
  head: () => ({
    meta: [
      { title: "Watermark Image Online Free | ConvertPDF" },
      { name: "description", content: "Overlay custom text on any image online for free." },
      { property: "og:title", content: "Watermark Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Overlay custom text on any image online for free." },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/watermark-image" }],
  }),
  component: WatermarkImagePage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Image Watermarking?",
    paragraphs: [
      'Image watermarking overlays a text label on top of a photograph or graphic to indicate ownership, confidentiality, or status. Photographers use watermarks to deter unauthorised use of their work, businesses stamp internal documents as "CONFIDENTIAL" or "DRAFT", and content creators add their brand name to images shared on social media.',
      "Our watermark tool uses the browser's Canvas API to composite text onto your image. After drawing the original image onto an off-screen canvas, the tool configures the canvas context's font, fill colour, and globalAlpha properties to your chosen settings, then renders the watermark text at the specified position using the fillText method. The final image is exported as a PNG with the watermark permanently embedded in the pixel data.",
    ],
  },
  howTo: {
    heading: "How to Add a Watermark in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. A preview appears with a live overlay showing where the watermark will be placed.",
      },
      {
        title: "Customise the watermark",
        description:
          "Type your watermark text, then adjust the font size, opacity, colour, and position. The preview updates in real time so you can fine-tune the appearance before applying.",
      },
      {
        title: "Apply and download",
        description:
          'Click "Add Watermark" to render the text onto the image. The watermarked result is exported as a PNG and downloaded directly to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Watermark Tool",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "All watermarking runs inside your browser via the Canvas API. Your images are never sent to any external server.",
      },
      {
        icon: Palette,
        title: "Full styling control",
        description:
          "Set the watermark text, choose a custom colour, adjust font size, and control opacity from subtle to bold.",
      },
      {
        icon: Move,
        title: "Flexible positioning",
        description:
          "Place the watermark at any of nine positions: corners, edges, or dead centre. Choose the placement that best suits your image.",
      },
      {
        icon: Zap,
        title: "Instant rendering",
        description:
          "Canvas text rendering is handled natively by the browser engine. Watermarks are applied in a fraction of a second.",
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
          "Add watermarks from your phone, tablet, or desktop. The responsive interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Watermark Images",
    intro: "Overlaying text on images is useful for protection, branding, and organisation:",
    items: [
      {
        label: "Protecting photography",
        description:
          "Add your name or studio logo to preview images shared with clients, discouraging unauthorised use while still showcasing your work.",
      },
      {
        label: "Marking drafts",
        description:
          'Stamp mockups, design proofs, or layout screenshots as "DRAFT" so reviewers know the content is not yet final.',
      },
      {
        label: "Branding social media posts",
        description:
          "Overlay your brand name, website URL, or handle on images before posting, so viewers can easily identify the source.",
      },
      {
        label: "Labelling confidential material",
        description:
          'Mark internal documents, screenshots, or data visualisations as "CONFIDENTIAL" or "INTERNAL ONLY" before distributing them within a team.',
      },
      {
        label: "Adding copyright notices",
        description:
          'Place a copyright line such as "© 2025 Your Name" on images published on the web to assert ownership in a visible way.',
      },
    ],
  },
  privacy: {
    heading: "Private Image Watermarking",
    paragraphs: [
      "When you watermark an image on ConvertPDF, the file is loaded into browser memory using the File API. The Canvas API draws the original image onto a hidden canvas, then renders the watermark text on top using the context's fillText method with your chosen font, colour, opacity, and position. The composited result is exported as a PNG blob — all within the browser's sandboxed JavaScript environment.",
      "No image data or watermark text is transmitted over the internet. The live preview is rendered using CSS overlays in the DOM, and the final canvas composition is performed entirely in local memory. Once you close the tab, all data is discarded by the browser.",
    ],
  },
  faqs: [
    {
      question: "What image formats can I watermark?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The watermarked output is saved as a PNG to preserve quality and support transparency.",
    },
    {
      question: "Can I change the watermark font?",
      answer:
        "The tool uses the browser's default sans-serif font rendered in bold. The font size and colour are fully adjustable using the controls provided.",
    },
    {
      question: "Can I remove a watermark after it is applied?",
      answer:
        "Once applied, the watermark is permanently rendered into the pixel data of the output PNG. Your original file remains untouched on your device, so you can always start over with the unwatermarked source image.",
    },
    {
      question: "How does the opacity setting work?",
      answer:
        "The opacity slider controls the transparency of the watermark text. A lower value makes the text more transparent and subtle, while a higher value makes it fully opaque. This is implemented using the Canvas API's globalAlpha property.",
    },
    {
      question: "Where can I position the watermark?",
      answer:
        "You can place the watermark at nine positions: the four corners, the four edge midpoints, or the exact centre of the image. Select your preferred position from the dropdown menu.",
    },
    {
      question: "Will the watermark scale with the image?",
      answer:
        "Yes. The font size is set as a percentage of the image width, so the watermark scales proportionally with images of different sizes. A size value of 15% on a 2000-pixel-wide image produces a visibly larger text than the same percentage on a 500-pixel-wide image.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. All processing happens locally in your browser using the Canvas API. Your images and watermark text stay on your device at all times. No network requests are made with your image data.",
    },
  ],
  relatedTools: [
    {
      name: "Compress Image",
      href: "/compress-image",
      description: "Reduce image file size",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
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
  ],
  relatedArticleSlugs: ["browser-pdf-converter-privacy", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function WatermarkImagePage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Watermark an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Watermark Image"
        description="Overlay custom text on any image."
        icon={Droplets}
        accent="from-amber-500 to-yellow-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <WatermarkImagePanel />
      </ToolPageLayout>
    </>
  );
}
