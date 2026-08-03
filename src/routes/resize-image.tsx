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
      "Image resizing changes the pixel dimensions of a photograph or graphic — making it wider, taller, smaller, or proportionally different in scale — while keeping the visual content itself intact. Resizing is fundamentally different from cropping: cropping removes part of the image, while resizing scales the entire image to new dimensions. A 4000×3000 camera photo, for example, can be scaled down to 1200×900 for a blog post header without cutting anything out.",
      "**How it works technically:** This tool performs resizing using the browser's Canvas API. When you set new target dimensions, the browser creates a hidden canvas at exactly that size and draws the full original image onto it using the drawImage method. The browser applies its built-in interpolation algorithm to map the original pixels to the new pixel grid — averaging and blending values to produce a smooth result. The output is saved as a PNG, which avoids introducing any additional lossy compression on top of the resize operation itself.",
    ],
  },
  howTo: {
    heading: "How to Resize an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. The tool reads the file into browser memory and automatically detects the original width and height.",
      },
      {
        title: "Set the new dimensions",
        description:
          "Enter a target width and height in pixels, or use the percentage slider to scale proportionally. Enable the aspect-ratio lock to ensure the image is not stretched or squashed when you change one dimension.",
      },
      {
        title: "Resize and download",
        description:
          'Click "Resize Image" to generate the new file. The resized image is exported as a PNG and downloaded directly to your device — no server involved.',
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
          "All resizing runs inside your browser via the Canvas API. The original image never leaves your device — no upload occurs at any point.",
      },
      {
        icon: Ruler,
        title: "Exact pixel dimensions",
        description:
          "Enter a precise target width and height in pixels, or scale by percentage. Useful when a platform or submission form requires specific dimensions.",
      },
      {
        icon: Lock,
        title: "Aspect-ratio lock",
        description:
          "A single checkbox keeps the original width-to-height ratio intact. Change one dimension and the other recalculates automatically, preventing distortion.",
      },
      {
        icon: Zap,
        title: "Instant canvas rendering",
        description:
          "The browser's native drawImage function handles pixel resampling directly. Most resizes complete in well under a second, regardless of image complexity.",
      },
      {
        icon: Cloud,
        title: "No account required",
        description: "Free, open, and unlimited. No signup, no email, no usage cap.",
      },
      {
        icon: Smartphone,
        title: "Works on any device",
        description:
          "Resize images from your phone, tablet, or desktop — the interface adapts to your screen size.",
      },
    ],
  },
  useCases: {
    heading: "When to Resize Images",
    intro:
      "Changing pixel dimensions is one of the most common image preparation tasks, with distinct needs depending on whether you are scaling down or scaling up:",
    items: [
      {
        label: "Preparing a blog hero image (Workflow Example)",
        description:
          "A photographer exports a 4000×3000px portrait from their camera. Their blog template renders the hero image at 1200px wide. Resizing to 1200×900px reduces the file from a large raw export to a much more browser-friendly size, cutting page load time without any visible quality difference at that display size.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not use this tool to enlarge a low-resolution image in the hope of improving its quality. Upscaling adds pixels that did not exist in the original — the browser interpolates estimated values — resulting in a softer, blurrier image. If you need a genuinely higher-resolution version, you need AI upscaling software, not a basic canvas resize.",
      },
      {
        label: "Meeting exact dimension requirements",
        description:
          "Visa applications, university portals, and job boards commonly specify exact pixel dimensions for profile photos. Enter the required width and height directly and the tool produces a file that matches the specification.",
      },
      {
        label: "Optimising images for web display",
        description:
          "Serving a 4000px-wide image in a layout that only renders it at 800px wastes bandwidth and slows page loads. Resize to the actual display size before uploading to your website or CMS.",
      },
      {
        label: "Creating thumbnails from high-resolution originals",
        description:
          "Generate small preview versions of product photos, portfolio images, or video thumbnails. Downscaling from a full-resolution source produces a sharper, cleaner thumbnail than upscaling a small image.",
      },
    ],
  },
  privacy: {
    heading: "Private Image Resizing",
    paragraphs: [
      "When you resize an image here, the file is loaded directly into your browser's memory using the File API. A hidden HTML canvas element is created at your target dimensions, and the original image is drawn onto it using the Canvas API's drawImage method — all within the browser's sandboxed JavaScript environment. The resized result is exported as a PNG blob and downloaded to your device without any network request.",
      "Your image data does not leave your machine at any point. There are no server-side processing queues, no temporary cloud storage, and no analytics on your file content. Once the tab is closed, the browser's garbage collector releases all in-memory pixel data immediately.",
    ],
  },
  faqs: [
    {
      question: "What is the difference between downscaling and upscaling?",
      answer:
        "Downscaling reduces the pixel count — the browser averages and blends nearby pixels to produce a smaller, typically clean result. Upscaling increases the pixel count — the browser must invent values for pixels that did not exist, estimating them from neighbouring pixels. The result is a larger file that looks softer or blurrier, not sharper, because no new real detail is added.",
    },
    {
      question: "What image formats can I resize?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The resized output is saved as a PNG file, which preserves quality without introducing additional lossy compression on top of the resize.",
    },
    {
      question: "What does the aspect-ratio lock do?",
      answer:
        "When enabled, changing the width automatically recalculates the height to maintain the original proportions, and vice versa. For example, if you enter 1200 as the width for a 4000×3000 image, the height automatically updates to 900 (1200 × 3000 / 4000 = 900). This prevents the image from appearing stretched or squashed.",
    },
    {
      question: "Why is the output a PNG instead of JPEG?",
      answer:
        "PNG is a lossless format, so saving as PNG avoids adding JPEG compression artefacts on top of the resize operation. If you need a smaller JPEG file after resizing, you can compress the resulting PNG using our Compress Image tool.",
    },
    {
      question: "Does resizing affect image quality?",
      answer:
        "Downscaling generally preserves visual quality well — reducing pixel count averages out noise and detail. Upscaling introduces softness because the browser estimates new pixel values. The output is saved as a lossless PNG, so no quality is lost during the file export step itself.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. All processing happens locally in your browser using the Canvas API. Your images are read from disk, drawn onto an off-screen canvas at the new dimensions, and exported as a file — entirely without network requests.",
    },
    {
      question: "Can I resize multiple images at once?",
      answer:
        "The tool currently processes one image at a time. For multiple files, resize each one individually. This keeps the interface simple and allows you to verify each result before moving on.",
    },
  ],
  relatedTools: [
    {
      name: "Compress Image",
      href: "/compress-image",
      description:
        "After resizing, if the PNG is still larger than your upload limit allows, compress it to a smaller JPEG with a quality setting you control.",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
    {
      name: "Crop Image",
      href: "/crop-image",
      description:
        "If the composition of your image needs adjusting before you resize — removing unwanted edges or centering the subject — crop it first, then resize to your target dimensions.",
      icon: Crop,
      accent: "from-sky-500 to-blue-500",
    },
    {
      name: "Rotate / Flip Image",
      href: "/rotate-image",
      description:
        "If your image is in the wrong orientation — portrait when it should be landscape — correct the rotation before resizing so the dimensions apply to the right axis.",
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
