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
      "Image cropping removes unwanted outer areas from a photograph or graphic, leaving only the region you want to keep. Instead of using the full frame captured by your camera, you select a rectangle that focuses on the subject — cutting out distracting backgrounds, extra whitespace, or elements that do not belong in the final composition.",
      "Our cropper uses a visual selection overlay powered by react-image-crop, which lets you drag and resize a crop rectangle directly on a preview of your image. When you confirm the crop, the browser's Canvas API draws only the selected pixel region onto a new canvas using the drawImage method with source-rectangle parameters. The result is exported as a PNG at the original resolution of the cropped area, so no quality is lost during the operation.",
    ],
  },
  howTo: {
    heading: "How to Crop an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. A full-size preview appears with an interactive crop overlay.",
      },
      {
        title: "Select the crop area",
        description:
          "Drag the crop handles to frame the region you want to keep. Choose a preset aspect ratio (1:1, 16:9, 4:3) or use free-form selection for any shape.",
      },
      {
        title: "Crop and download",
        description:
          'Click "Crop Image" to extract the selected area. The cropped image is exported as a PNG and downloaded directly to your device.',
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
          "All cropping runs inside your browser via the Canvas API. Your images are never transmitted to any server.",
      },
      {
        icon: Focus,
        title: "Visual selection",
        description:
          "Drag and resize the crop rectangle directly on your image preview. What you see is exactly what you get.",
      },
      {
        icon: RectangleHorizontal,
        title: "Preset aspect ratios",
        description:
          "Choose from Free, 1:1, 16:9, or 4:3 presets, or drag freely for a custom crop area.",
      },
      {
        icon: Zap,
        title: "Fast extraction",
        description:
          "Canvas pixel extraction is handled natively by the browser. Most crops finish in under a second.",
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
          "Crop images from your phone, tablet, or desktop. The responsive interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Crop Images",
    intro: "Trimming an image to just the area you need is useful in many situations:",
    items: [
      {
        label: "Creating profile photos",
        description:
          "Crop a group photo or landscape shot down to a centred headshot that fits social media profile picture guidelines.",
      },
      {
        label: "Removing distractions",
        description:
          "Cut out background clutter, accidental bystanders, or unwanted objects from the edges of a photo before sharing.",
      },
      {
        label: "Fitting specific dimensions",
        description:
          "E-commerce platforms, marketplaces, and print services often require images at particular aspect ratios. Crop to match the requirement before uploading.",
      },
      {
        label: "Isolating product shots",
        description:
          "Crop product photos to remove excess background and centre the item, creating cleaner listings for online stores.",
      },
      {
        label: "Preparing banners and headers",
        description:
          "Website headers, email banners, and social media covers need wide, narrow images. Use the 16:9 preset to extract the ideal strip from a larger photo.",
      },
    ],
  },
  privacy: {
    heading: "Private Image Cropping",
    paragraphs: [
      "When you crop an image on ConvertPDF, the file is loaded into your browser's memory using the File API. The crop overlay is rendered on top of a standard HTML image element, so the selection process itself involves no data transfer. When you apply the crop, the Canvas API's drawImage method extracts the selected pixel region from the full-resolution source and exports it as a PNG blob.",
      "At no point is your image data sent over the internet. There are no server-side processing queues, no temporary storage, and no analytics on your file content. When you close the tab, all in-memory image data is released by the browser.",
    ],
  },
  faqs: [
    {
      question: "What image formats can I crop?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The cropped output is saved as a PNG file to preserve quality and support transparency.",
    },
    {
      question: "Can I set a custom aspect ratio?",
      answer:
        'Yes. Select "Free" from the aspect-ratio presets and drag the crop handles to any shape you like. If you need a specific ratio such as 1:1 or 16:9, choose the matching preset and the crop rectangle will lock to those proportions.',
    },
    {
      question: "Does cropping reduce image quality?",
      answer:
        "No. The crop is performed at the original pixel resolution of your image. The selected region is extracted pixel-for-pixel and saved as a lossless PNG, so there is no quality degradation.",
    },
    {
      question: "Can I undo a crop after downloading?",
      answer:
        "The tool does not modify your original file. Your source image remains untouched on your device. If you are not satisfied with a crop, upload the original again and select a different area.",
    },
    {
      question: "What happens if I do not select a crop area?",
      answer:
        "The crop button remains disabled until you define a selection. You need to drag on the image preview to create a crop rectangle before the tool will process the image.",
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
      description: "Scale images to custom dimensions",
      icon: Maximize2,
      accent: "from-rose-500 to-pink-500",
    },
    {
      name: "Compress Image",
      href: "/compress-image",
      description: "Reduce image file size",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
    {
      name: "Rotate / Flip Image",
      href: "/rotate-image",
      description: "Fix image orientation",
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
