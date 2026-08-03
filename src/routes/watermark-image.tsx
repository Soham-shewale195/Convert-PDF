import { createFileRoute } from "@tanstack/react-router";
import { Droplets, ShieldCheck, Zap, Smartphone, Cloud, Palette, Move } from "lucide-react";
import { Maximize2, Minimize2 } from "lucide-react";
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
      'Image watermarking overlays a text label permanently onto a photograph or graphic to assert ownership, indicate status, or protect the image from being used without attribution. Photographers add their name or studio to preview images shared with clients. Businesses stamp internal screenshots as "CONFIDENTIAL" or design mockups as "DRAFT". Content creators add their handle to images before posting on social media, so the source is visible even when the image is shared or screenshotted by others.',
      "**How it works technically:** This tool composites text onto your image using the browser's Canvas API. After drawing the original image onto an off-screen canvas, the tool applies your chosen font size, colour, opacity, and position settings to the canvas 2D context, then renders the watermark text at the exact location using the fillText method. The font size is defined as a percentage of the image's pixel width, so the text scales proportionally regardless of whether your image is 500px or 5000px wide. The final result is exported as a PNG with the watermark permanently embedded in the pixel data — not stored as a metadata tag or overlay layer, but baked into the image itself.",
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
          'Click "Add Watermark" to render the text into the image pixel data. The watermarked result is exported as a PNG and downloaded directly to your device.',
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
          "All watermarking runs inside your browser via the Canvas API. Your images and watermark text are never sent to any external server.",
      },
      {
        icon: Palette,
        title: "Full styling control",
        description:
          "Set the watermark text, choose a custom colour with the native colour picker, adjust font size as a percentage of image width, and control opacity from barely-there to fully bold.",
      },
      {
        icon: Move,
        title: "Nine placement positions",
        description:
          "Place the watermark at any of nine positions: four corners, four edge midpoints, or dead centre. Each placement suits a different use case and offers a different trade-off between deterrence and aesthetics.",
      },
      {
        icon: Zap,
        title: "Instant canvas rendering",
        description:
          "The browser's Canvas API composites text onto the image natively. The watermark is applied in a fraction of a second, regardless of image size.",
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
          "Add watermarks from your phone, tablet, or desktop. The live preview adapts to your screen so you can see exactly how the watermark will look before downloading.",
      },
    ],
  },
  useCases: {
    heading: "When to Watermark Images",
    intro:
      "Embedding text directly into image pixels is useful for protection, branding, and marking — here is when each scenario calls for a different approach:",
    items: [
      {
        label: "Protecting photography for client preview (Workflow Example)",
        description:
          "A wedding photographer delivers a gallery of 60 preview images before the client has paid the final invoice. Each image is watermarked at the centre with the studio name at 40% opacity — visible enough that the images cannot be used commercially or posted without the mark, but transparent enough that the client can review composition and colour accurately. Once payment is received, the unwatermarked originals are delivered.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not rely on a visible text watermark as a DRM (digital rights management) mechanism for highly valuable assets. A visible watermark can be cropped out from images where the subject does not fill the frame, or digitally removed with image editing software if it is semi-transparent. For maximum deterrence, place the watermark centrally where it overlaps the subject, or consider a specialist DRM service for commercial licensing scenarios.",
      },
      {
        label: "Marking drafts and internal documents",
        description:
          'Stamp design mockups, report screenshots, or presentation slides as "DRAFT" or "INTERNAL ONLY" before circulating them in a team review, so recipients understand the content is not yet approved or cleared for external distribution.',
      },
      {
        label: "Branding social media content",
        description:
          "Add your brand name, website URL, or social handle to images posted online. Even when the image is screenshotted and reshared by others, the attribution travels with it.",
      },
      {
        label: "Asserting copyright on published work",
        description:
          'Place a visible copyright notice such as "© 2025 Your Name" on images published on the web. A visible copyright statement makes it unambiguous that the image is owned and that unauthorised reproduction is not permitted.',
      },
    ],
  },
  privacy: {
    heading: "Private Image Watermarking",
    paragraphs: [
      "When you watermark an image here, the file is loaded into browser memory using the File API. The Canvas API draws the original image onto a hidden canvas, then renders the watermark text on top using the context's fillText method with your chosen font, colour, opacity, and position. The composited result is exported as a PNG blob — all within the browser's sandboxed JavaScript environment. The live preview you see before clicking Apply is a CSS overlay rendered in the DOM; the actual pixel composition happens only when you confirm.",
      "No image data or watermark text is transmitted over the internet at any point. There are no server-side rendering queues, no cloud storage, and no logging of your watermark content. Once you close the tab, all in-memory canvas data and the image pixel buffer are discarded by the browser immediately.",
    ],
  },
  faqs: [
    {
      question: "Where should I position the watermark for maximum deterrence?",
      answer:
        "The centre of the image is the hardest position from which to crop a watermark out, because it directly overlaps the main subject. Corner and edge positions are less intrusive but easier to crop away from images with generous whitespace around the edges. For protection, centre is most effective; for branding without interfering with composition, a corner is more aesthetically neutral.",
    },
    {
      question: "How does the opacity setting affect protection?",
      answer:
        "Lower opacity makes the watermark more transparent and less distracting for legitimate viewers, but also makes it easier to mask or clone out with image editing software. Higher opacity is more visually disruptive but harder to remove digitally. A setting around 40–60% is a common practical balance between readability and deterrence.",
    },
    {
      question: "How does the font size percentage work?",
      answer:
        "The font size control sets the watermark text size as a percentage of the image's pixel width. This means the watermark scales proportionally: a setting of 15% on a 2000px-wide image produces a larger text element than the same percentage on a 500px-wide image. This ensures the watermark is consistently visible regardless of the source image resolution.",
    },
    {
      question: "Can I remove a watermark after it is applied?",
      answer:
        "Once applied, the watermark is permanently rendered into the pixel data of the output PNG. There is no separate layer that can be toggled off. Your original file remains untouched on your device, so you can always start over with the unwatermarked source.",
    },
    {
      question: "What image formats can I watermark?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The watermarked output is saved as a PNG to preserve quality and to support any transparency in the original.",
    },
    {
      question: "Can I change the watermark font?",
      answer:
        "The tool uses the browser's default sans-serif font rendered in bold. The font size and colour are fully adjustable. Custom font family selection is not currently supported.",
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
      description:
        "After watermarking, if the PNG output is larger than your sharing platform allows, compress it to a smaller JPEG while keeping the watermark embedded.",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
    {
      name: "Resize Image",
      href: "/resize-image",
      description:
        "If your platform requires specific pixel dimensions, resize the image to the target size before adding the watermark so the font scale matches the final output.",
      icon: Maximize2,
      accent: "from-rose-500 to-pink-500",
    },
    {
      name: "Watermark PDF",
      href: "/watermark-pdf",
      description:
        "If the asset you want to protect is a PDF document rather than a raster image, use the PDF watermark tool to stamp text across every page.",
      icon: Droplets,
      accent: "from-amber-500 to-yellow-500",
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
