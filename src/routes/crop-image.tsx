import { createFileRoute } from "@tanstack/react-router";
import {
  Crop,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  RectangleHorizontal,
  Focus,
} from "lucide-react";
import { Maximize2, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CropImagePanel from "@/components/tools/CropImagePanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/crop-image")({
  head: () => ({
    meta: [
      { title: "Crop Image Online Free | ConvertPDF" },
      { name: "description", content: "Trim images to any area you need online for free." },
      { property: "og:title", content: "Crop Image Online Free | ConvertPDF" },
      { property: "og:description", content: "Trim images to any area you need online for free." },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/crop-image" }],
  }),
  component: CropImagePage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Image Cropping?",
    paragraphs: [
      "Image cropping removes the outer areas of a photograph or graphic that you do not want to keep, leaving only the rectangular region you select. Unlike resizing — which scales the entire image to new dimensions — cropping is a selection operation: you choose a sub-rectangle of the original, and everything outside it is discarded. The pixel dimensions of the output are determined by the size of the crop region, not by scaling.",
      "**How it works technically:** This tool uses react-image-crop to render an interactive crop overlay directly on your image preview. When you drag the crop handles, you are defining the source rectangle. On confirmation, the browser's Canvas API uses the drawImage method with source-coordinate parameters (sx, sy, sWidth, sHeight) to extract exactly that region from the full-resolution image. The extraction happens at the original naturalWidth and naturalHeight of the source file, not at the scaled preview size — so what you crop is always at full original quality, saved as a lossless PNG.",
    ],
  },
  howTo: {
    heading: "How to Crop an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. A full-size preview appears with the interactive crop overlay ready to use.",
      },
      {
        title: "Select the crop area",
        description:
          "Drag the crop handles to frame the region you want to keep. Choose a preset aspect ratio (1:1, 16:9, 4:3) or leave it in Free mode to define any custom rectangle.",
      },
      {
        title: "Crop and download",
        description:
          'Click "Crop Image" to extract the selected area. The cropped image is exported as a PNG at the original source resolution and downloaded to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Image Cropper",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "All cropping runs inside your browser via the Canvas API. Your images are never transmitted to any server — the file stays on your device throughout.",
      },
      {
        icon: Focus,
        title: "Visual drag-and-drop selection",
        description:
          "The crop rectangle is positioned by dragging directly on your image preview. The handles snap and resize visually, so what you see in the overlay is precisely what gets extracted.",
      },
      {
        icon: RectangleHorizontal,
        title: "Preset aspect ratios",
        description:
          "Choose Free, 1:1, 16:9, or 4:3 to lock the selection to a specific shape. The rectangle auto-centres and constrains itself to the chosen ratio so you do not have to calculate dimensions manually.",
      },
      {
        icon: Zap,
        title: "Full-resolution extraction",
        description:
          "The crop is applied to the original pixel data, not the scaled preview. The output reflects the actual dimensions of the selected region at full source resolution.",
      },
      {
        icon: Cloud,
        title: "No account required",
        description: "Free and open with no usage limits. No signup, no email, no hidden charges.",
      },
      {
        icon: Smartphone,
        title: "Works on any device",
        description:
          "The drag-and-drop crop interface adapts to touch screens on mobile and trackpad interactions on desktop.",
      },
    ],
  },
  useCases: {
    heading: "When to Crop Images",
    intro:
      "Cropping is the right tool when you want to change the composition or shape of an image without scaling the content — these are the most common situations:",
    items: [
      {
        label: "Preparing a 1:1 social media post from a landscape photo (Workflow Example)",
        description:
          "A travel blogger wants to post a wide 16:9 landscape photograph to Instagram, which displays feed posts in a square format. Using the 1:1 crop preset, they drag the selection to centre on the most interesting part of the scene — the mountain peak — discarding the sky on the left and road on the right. The result is a square crop that focuses the viewer's attention without any scaling or distortion.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not crop if your goal is to change the size of the image while preserving the full composition. Cropping removes parts of the image permanently. If you need the whole image at a different pixel size, use the Resize tool instead. Also, do not crop if you need the output at a specific pixel dimension — cropping controls shape, not final size. Resize after cropping if an exact output dimension is required.",
      },
      {
        label: "Removing distracting background elements",
        description:
          "A product shot has too much empty table visible around the item. Cropping tightly around the product removes the dead space and produces a cleaner image for an online store listing.",
      },
      {
        label: "Matching a specific aspect ratio requirement",
        description:
          "E-commerce platforms, print services, and presentation templates often require images at a defined aspect ratio. Use the preset crop ratios to extract the correctly shaped region from a source image before uploading.",
      },
      {
        label: "Isolating a subject from a group photo",
        description:
          "A headshot is needed from a group photograph. Use free-form crop to frame tightly around the individual, producing a portrait-style crop from a wider shot.",
      },
    ],
  },
  privacy: {
    heading: "Private Image Cropping",
    paragraphs: [
      "When you crop an image here, the file is loaded into your browser's memory using the File API. The interactive crop overlay is rendered in the DOM as a visual guide — this process involves no data transfer. When you apply the crop, the Canvas API's drawImage method extracts the selected pixel region from the full-resolution source and exports it as a PNG blob, entirely within the browser's sandboxed JavaScript environment.",
      "At no point is your image data sent over the internet. The original file remains untouched on your device — the tool works on an in-memory copy. If you close the tab or navigate away, all in-memory image data is immediately released. There are no server-side processing queues, no temporary storage, and no analytics on your file content.",
    ],
  },
  faqs: [
    {
      question: "Why does my aspect ratio preset matter?",
      answer:
        "The aspect ratio defines the shape of your crop — the relationship between width and height. A 1:1 ratio produces a square, which is commonly used for profile photos and social media feed posts. A 16:9 ratio produces a widescreen rectangle, which suits YouTube thumbnails, website headers, and presentation slides. A 4:3 ratio is a standard photographic format used in many print sizes. Choosing the right preset ensures your cropped image fits its destination without additional letterboxing or distortion.",
    },
    {
      question: "What image formats can I crop?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The cropped output is saved as a PNG file to preserve the extracted region at full quality and to support transparency.",
    },
    {
      question: "Is the crop applied at the original full resolution?",
      answer:
        "Yes. The interactive overlay is displayed on a scaled preview for usability, but the actual crop operation uses the naturalWidth and naturalHeight of the source image. The pixel coordinates are scaled back to the original dimensions before extraction, so the output reflects the true resolution of the selected area.",
    },
    {
      question: "Does cropping reduce image quality?",
      answer:
        "No. The crop is extracted pixel-for-pixel from the original image data and saved as a lossless PNG. No encoding quality is reduced during the operation. The output will be smaller in pixel dimensions than the original, but the pixels that remain are identical to those in the source.",
    },
    {
      question: "Can I undo a crop after downloading?",
      answer:
        "The tool does not modify your original file. Your source image remains untouched on your device. If you are not satisfied with a crop, upload the original again and select a different area — there is no permanent change to your file.",
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. ConvertPDF processes everything inside your web browser using the Canvas API. Your images are read from disk, cropped locally in memory, and exported as a file — entirely without network requests.",
    },
  ],
  relatedTools: [
    {
      name: "Resize Image",
      href: "/resize-image",
      description:
        "After cropping to the right composition, resize the cropped image to a specific pixel dimension required by your platform or submission form.",
      icon: Maximize2,
      accent: "from-rose-500 to-pink-500",
    },
    {
      name: "Compress Image",
      href: "/compress-image",
      description:
        "After cropping out unnecessary areas, compress the result to reduce file size further before uploading to a website or sending by email.",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
    {
      name: "Rotate / Flip Image",
      href: "/rotate-image",
      description:
        "If your image is rotated incorrectly, fix the orientation first — then crop to the final composition you want.",
      icon: RotateCw,
      accent: "from-purple-500 to-fuchsia-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "browser-pdf-converter-privacy"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function CropImagePage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Crop an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Crop Image"
        description="Trim images to any area you need."
        icon={Crop}
        accent="from-sky-500 to-blue-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <CropImagePanel />
      </ToolPageLayout>
    </>
  );
}
