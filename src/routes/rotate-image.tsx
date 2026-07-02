import { createFileRoute } from "@tanstack/react-router";
import { RotateCw, ShieldCheck, Zap, Smartphone, Cloud, FlipHorizontal, Undo2 } from "lucide-react";
import { Maximize2, Crop, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import RotateFlipImagePanel from "@/components/tools/RotateFlipImagePanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/rotate-image")({
  head: () => ({
    meta: [
      { title: "Rotate or Flip Image Online Free | ConvertPDF" },
      {
        name: "description",
        content: "Rotate images 90°-270° or mirror horizontally online for free.",
      },
      { property: "og:title", content: "Rotate or Flip Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Rotate images 90°-270° or mirror horizontally online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/rotate-image" }],
  }),
  component: RotateImagePage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is Image Rotation and Flipping?",
    paragraphs: [
      "Image rotation turns a photograph or graphic by a specified angle — typically 90°, 180°, or 270° — to correct orientation problems or achieve a creative composition. Flipping mirrors the image along a horizontal or vertical axis, producing a reflection effect. These are among the most fundamental image editing operations.",
      "Our tool combines both capabilities in a single interface. Behind the scenes, the browser's Canvas API handles the transformation. When you apply a rotation, the canvas context's rotate method turns the coordinate system by the chosen angle in radians, then draws the image centred on the rotated canvas. For flips, the context's scale method is called with a negative value on the appropriate axis, reversing the pixel order. The result is exported as a PNG at the transformed dimensions.",
    ],
  },
  howTo: {
    heading: "How to Rotate or Flip an Image in 3 Steps",
    steps: [
      {
        title: "Upload your image",
        description:
          "Drag and drop an image onto the upload area, or click to browse. A preview appears showing the current orientation.",
      },
      {
        title: "Choose your transformation",
        description:
          "Click the rotation buttons to turn the image left or right in 90° increments. Use the flip buttons to mirror the image horizontally or vertically. The preview updates in real time.",
      },
      {
        title: "Apply and download",
        description:
          'Click "Apply Modifications" to render the final result. The transformed image is exported as a PNG and downloaded to your device.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Rotate / Flip Tool",
    items: [
      {
        icon: ShieldCheck,
        title: "Completely private",
        description:
          "All transformations run inside your browser using the Canvas API. Your images never leave your device.",
      },
      {
        icon: RotateCw,
        title: "90° rotation steps",
        description:
          "Rotate left or right in precise 90° increments — the most common angles for correcting sideways or upside-down photos.",
      },
      {
        icon: FlipHorizontal,
        title: "Horizontal and vertical flip",
        description:
          "Mirror your image along either axis with a single click. Both flips can be combined with rotation.",
      },
      {
        icon: Undo2,
        title: "Live preview with reset",
        description:
          "See every rotation and flip applied to the preview instantly. A reset button returns the image to its original orientation.",
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
          "Rotate and flip images from your phone, tablet, or desktop. The interface adapts to your screen.",
      },
    ],
  },
  useCases: {
    heading: "When to Rotate or Flip Images",
    intro: "Correcting orientation and mirroring images is useful across many workflows:",
    items: [
      {
        label: "Fixing sideways photos",
        description:
          "Photos taken with a rotated phone sometimes ignore EXIF orientation data when viewed in certain apps. A 90° rotation corrects the display instantly.",
      },
      {
        label: "Correcting scanned documents",
        description:
          "Scanned pages often come out upside-down or sideways depending on how the paper was placed. Rotate to the correct reading orientation before sharing.",
      },
      {
        label: "Creating mirror-image designs",
        description:
          "Graphic designers use horizontal flips to create symmetrical layouts, mirrored patterns, or to reverse text-free images for compositional balance.",
      },
      {
        label: "Preparing images for printing",
        description:
          "Some print workflows require images in a specific orientation. Rotate landscape photos to portrait (or vice versa) to match the print template.",
      },
      {
        label: "Adjusting selfies",
        description:
          "Front-facing cameras often produce mirrored selfies. A horizontal flip corrects the reversal so text and logos in the background read correctly.",
      },
    ],
  },
  privacy: {
    heading: "Private Image Transformation",
    paragraphs: [
      "When you rotate or flip an image on ConvertPDF, the file is loaded into your browser's memory using the File API. The Canvas API creates a new canvas sized for the rotated dimensions, applies the rotation via the context's rotate and scale methods, and draws the original image onto the transformed coordinate space. The result is exported as a PNG blob — all within the browser's sandboxed JavaScript environment.",
      "No image data is transmitted over the internet. The preview is rendered using a standard HTML image element with CSS transforms, so even the live rotation effect is entirely local. When you close the tab, all in-memory data is discarded.",
    ],
  },
  faqs: [
    {
      question: "What rotation angles are supported?",
      answer:
        "The tool rotates in 90° increments: 90° (quarter turn right), 180° (half turn), and 270° (quarter turn left). You can click the rotation buttons multiple times to reach any of these positions.",
    },
    {
      question: "Can I rotate and flip at the same time?",
      answer:
        "Yes. Rotation and flipping are independent operations. You can apply a 90° rotation and a horizontal flip together — the preview updates to show the combined result before you export.",
    },
    {
      question: "Does rotation affect image quality?",
      answer:
        "No. For 90° increments, the pixel grid aligns perfectly with the rotated canvas. No interpolation or resampling is needed, so the output is visually identical to the original at the rotated orientation. The file is saved as a lossless PNG.",
    },
    {
      question: "What happens to the image dimensions when I rotate 90°?",
      answer:
        "The width and height swap. A 1920×1080 landscape image becomes 1080×1920 in portrait after a 90° rotation. The canvas is automatically resized to accommodate the new dimensions.",
    },
    {
      question: "What image formats can I rotate?",
      answer:
        "You can upload any format your browser supports, including JPEG, PNG, WebP, GIF, and BMP. The output is saved as a PNG file to preserve quality.",
    },
    {
      question: "How do I reset all changes?",
      answer:
        'Click the "Reset" button between the rotation controls to return the image to its original orientation. This clears any applied rotation angle. Flips can be toggled off individually by clicking the active flip button again.',
    },
    {
      question: "Do my images get uploaded to a server?",
      answer:
        "No. All processing happens locally in your browser using the Canvas API. Your images are drawn onto an off-screen canvas with the rotation and flip applied, then exported as a file — without any network requests.",
    },
  ],
  relatedTools: [
    {
      name: "Crop Image",
      href: "/crop-image",
      description: "Trim images to any area",
      icon: Crop,
      accent: "from-sky-500 to-blue-500",
    },
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
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "browser-pdf-converter-privacy"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function RotateImagePage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Rotate or Flip an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Rotate / Flip Image"
        description="Rotate 90°–270° or mirror horizontally."
        icon={RotateCw}
        accent="from-purple-500 to-fuchsia-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <RotateFlipImagePanel />
      </ToolPageLayout>
    </>
  );
}
