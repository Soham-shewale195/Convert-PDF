import { createFileRoute } from "@tanstack/react-router";
import { Maximize2, ShieldCheck, Zap, Smartphone, Cloud, Lock, Ruler } from "lucide-react";
import { Minimize2, Crop, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ResizeImagePanel from "@/components/tools/ResizeImagePanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/resize-image")({
  head: () => ({
    meta: [
      { title: "Resize Image Online Free | ConvertPDF" },
      {
        name: "description",
        content: "Scale and resize images to custom dimensions online for free.",
      },
      { property: "og:title", content: "Resize Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Scale and resize images to custom dimensions online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/resize-image" }],
  }),
  component: ResizeImagePage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Image Resizing?",
    paragraphs: [
      "Image resizing changes the pixel dimensions of a photograph or graphic — making it larger or smaller — while keeping the visual content intact. A 4000×3000 camera photo, for example, can be scaled down to 1200×900 for a blog header, or a small icon can be scaled up to fill a presentation slide.",
      "Our resizer uses the browser's Canvas API to perform the transformation. When you set new dimensions, the tool creates an off-screen canvas at exactly that size and draws the original image onto it using the drawImage method. The browser's built-in interpolation algorithm handles the pixel resampling, and the result is exported as a PNG so no additional quality loss is introduced during the resize.",
    ],
  },
  howTo: {
    heading: "How to Resize an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. The tool reads the file into browser memory and detects its original width and height automatically.",
      },
      {
        title: "Set the new dimensions",
        description:
          "Enter a target width and height in pixels, or use the scale percentage slider to resize proportionally. Toggle the aspect-ratio lock to prevent distortion.",
      },
      {
        title: "Resize and download",
        description:
          'Click "Resize Image" to generate the new file. The resized image is exported as a PNG and downloaded directly to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Image Resizer",
    items: [
      {
        icon: ShieldCheck,
        title: "Fully private",
        description:
          "All resizing runs inside your browser via the Canvas API. Your images are never sent to any external server.",
      },
      {
        icon: Ruler,
        title: "Precise control",
        description:
          "Enter exact pixel dimensions or use the percentage slider. Switch between proportional and free-form scaling as needed.",
      },
      {
        icon: Lock,
        title: "Aspect-ratio lock",
        description:
          "A single checkbox maintains the original proportions, preventing stretched or squashed results when you change one dimension.",
      },
      {
        icon: Zap,
        title: "Instant rendering",
        description:
          "The browser's native drawImage function handles the resampling. Most resizes complete in well under a second.",
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
          "Resize images from your phone, tablet, or desktop. The responsive interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Resize Images",
    intro: "Adjusting image dimensions is one of the most common everyday image tasks:",
    items: [
      {
        label: "Preparing profile pictures",
        description:
          "Social platforms recommend specific dimensions for profile and cover images. Resize to the exact size before uploading for a crisp, well-framed result.",
      },
      {
        label: "Optimising for the web",
        description:
          "Large camera photos slow down web pages. Resize to the display size your layout actually needs — for example, 1200 pixels wide for a blog hero image.",
      },
      {
        label: "Meeting submission requirements",
        description:
          "Visa applications, university portals, and job boards often require images at specific pixel dimensions. Resize to match the stated requirements exactly.",
      },
      {
        label: "Creating thumbnails",
        description:
          "Generate small preview versions of product photos, portfolio pieces, or video thumbnails from full-resolution originals.",
      },
      {
        label: "Fitting presentation slides",
        description:
          "Resize images to fill a slide without distortion by entering the slide's pixel dimensions and keeping aspect ratio locked.",
      },
    ],
  },
  privacy: {
    heading: "Private Image Resizing",
    paragraphs: [
      "When you resize an image on ConvertPDF, the file is loaded directly into your browser's memory using the File API. A hidden HTML Canvas element is created at your target dimensions, and the original image is drawn onto it using the Canvas API's drawImage method. The resized result is then exported as a PNG blob — all within the browser's sandboxed JavaScript environment.",
      "No image data leaves your device at any point. There are no server uploads, no cloud processing queues, and no analytics on your file content. Once you close the tab, the in-memory canvas and all pixel data are released by the browser's garbage collector.",
    ],
  },
  faqs: [
    {
      question: "What image formats can I resize?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The resized output is saved as a PNG file, which preserves quality without additional lossy compression.",
    },
    {
      question: "What does the aspect-ratio lock do?",
      answer:
        "When the lock is enabled, changing the width automatically recalculates the height (and vice versa) to maintain the original proportions. This prevents the image from appearing stretched or squashed.",
    },
    {
      question: "Can I make an image larger than the original?",
      answer:
        "Yes. You can set dimensions larger than the original or use a scale percentage above 100%. However, enlarging a raster image beyond its original resolution will introduce softness because the browser must interpolate new pixel data that did not exist in the source.",
    },
    {
      question: "Does resizing affect image quality?",
      answer:
        "Downscaling generally preserves visual quality well. Upscaling can introduce blur because the browser estimates pixel values for the added resolution. The output is saved as a lossless PNG, so no additional quality loss occurs during the file export step.",
    },
    {
      question: "Why is the output a PNG instead of JPEG?",
      answer:
        "PNG is a lossless format, so exporting as PNG avoids introducing compression artefacts on top of the resize. If you need a JPEG, you can convert the resized PNG using our JPG converter or compress it with our Compress Image tool.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. All processing happens locally in your browser using the Canvas API. Your images are read from disk, drawn onto an off-screen canvas at the new dimensions, and exported as a file — entirely without network requests.",
    },
    {
      question: "Can I resize multiple images at once?",
      answer:
        "The tool currently processes one image at a time. For multiple files, resize each one individually. This keeps the interface simple and ensures you can verify each result before moving on.",
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
      name: "Crop Image",
      href: "/crop-image",
      description: "Trim images to any area",
      icon: Crop,
      accent: "from-sky-500 to-blue-500",
    },
    {
      name: "Rotate / Flip Image",
      href: "/rotate-image",
      description: "Fix image orientation",
      icon: RotateCw,
      accent: "from-purple-500 to-fuchsia-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function ResizeImagePage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Resize an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Resize Image"
        description="Scale images to custom dimensions."
        icon={Maximize2}
        accent="from-rose-500 to-pink-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <ResizeImagePanel />
      </ToolPageLayout>
    </>
  );
}
