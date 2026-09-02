import { createFileRoute } from "@tanstack/react-router";
import { Crop, Maximize2, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CropImagePanel from "@/components/tools/CropImagePanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/crop-image")({
  head: () => ({
    meta: [
      { title: "Crop Image Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Drag a box or pick 1:1, 16:9 or 4:3. The region is taken from the full-resolution original rather than the preview, and saved as a PNG.",
      },
      { property: "og:title", content: "Crop Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Drag a box or pick 1:1, 16:9 or 4:3. The region is taken from the full-resolution original rather than the preview, and saved as a PNG.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/crop-image" }],
  }),
  component: CropImagePage,
});

const cropSteps = [
  {
    title: "Load an image",
    description:
      "Add a JPEG, PNG or WebP by dropping it in or browsing for it. It appears at whatever size fits the panel, with no selection made yet — the Crop button stays greyed out until there is one.",
  },
  {
    title: "Make a selection",
    description:
      "Drag across the image to draw a box in Free mode, or click 1:1, 16:9 or 4:3 to have one placed for you at that ratio, centred and covering about 90% of the frame. Either way the button becomes available once a selection exists, and you can keep adjusting the handles afterwards.",
  },
  {
    title: "Apply and download",
    description:
      'Click "Apply Crop". Your selection is translated from preview coordinates into the image\'s real pixel coordinates, the region is copied out at full resolution, and the result downloads as a PNG with -cropped appended.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Cropping Does",
    paragraphs: [
      "Cropping removes everything outside a rectangle and keeps what is inside it, unchanged. That makes it the least destructive of the three size-related operations here: resizing recalculates every pixel, compressing re-encodes them, and cropping simply copies a region across untouched.",
      "The mechanics matter because of one common worry. The image on screen is scaled to fit the panel — often a good deal smaller than the file itself — so it would be reasonable to assume the crop happens at that reduced size. It does not. When you apply the crop, the selection is converted from the preview's coordinate space into the source image's real pixel coordinates, and the region is extracted from the full-resolution original.",
      "The consequence is that a crop taken from a large photograph is still a large image. Selecting a quarter of a 4000-pixel-wide photo gives you a 1000-pixel-wide result with all of its original detail intact — not a blurry enlargement of a thumbnail. No scaling or resampling happens at any point.",
    ],
  },
  {
    kind: "steps",
    heading: "Cropping an Image",
    steps: cropSteps,
  },
  {
    kind: "checklist",
    heading: "When Cropping Is the Right Move",
    intro:
      "Cropping changes what the image is about. Reach for it whenever the problem is the framing rather than the file:",
    items: [
      {
        label: "Fitting a required aspect ratio",
        description:
          "Profile pictures want square, video thumbnails want 16:9. Cropping to the ratio keeps everything undistorted, where resizing to those proportions would stretch faces and text out of shape.",
      },
      {
        label: "Tightening a loose composition",
        description:
          "Removing empty sky, a cluttered edge or an unwanted passer-by draws attention to the subject and, as a side effect, cuts the file size along with the discarded pixels.",
      },
      {
        label: "Pulling a headshot from a group photo",
        description:
          "Free mode is ideal here. Because extraction happens at full resolution, a tight crop from a high-megapixel photo is still perfectly usable on its own.",
      },
      {
        label: "Removing something before sharing",
        description:
          "A document edge, a screen reflection, a name badge. Cropping deletes those pixels from the file rather than covering them, so they cannot be recovered from the result.",
      },
      {
        label: "When to reach for a different tool",
        description:
          "If the framing is fine and the file is merely too large, cropping is the wrong lever — resize or compress instead. And if the image is sideways, rotate it first, since the crop box works against the image as it currently sits.",
      },
    ],
  },
  {
    kind: "comparison",
    heading: "What You See and What You Get",
    intro:
      "The single most common question about any browser-based cropper is whether the preview size limits the output. It does not, and this is where the two differ:",
    columns: ["The preview on screen", "The exported file"],
    rows: [
      {
        aspect: "Image size",
        a: "Scaled down to fit the panel — frequently far smaller than the source.",
        b: "Full original resolution. The preview's scale is never applied to the result.",
      },
      {
        aspect: "Your crop rectangle",
        a: "Drawn and measured in preview coordinates.",
        b: "Converted to the image's true pixel coordinates before anything is extracted.",
      },
      {
        aspect: "Detail",
        a: "Limited by how large the preview is drawn on your screen.",
        b: "Every pixel of the selected region, exactly as it was in the source.",
      },
      {
        aspect: "Resampling",
        a: "The browser scales the whole image down to display it.",
        b: "None. Pixels are copied, never recomputed.",
      },
      {
        aspect: "Format",
        a: "Whatever you uploaded.",
        b: "Always PNG, so nothing is lost in the export.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Image Cropping",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Cropping happens entirely on your device. The image is decoded into memory, the selected region is copied onto an off-screen canvas, and a PNG is exported — all in local JavaScript. Your image is never uploaded, and no third-party service sees it.",
      "That matters more here than for most operations, because cropping is so often used to remove something sensitive before sharing: an address on an envelope, a face at the edge of a photo, an account number on a statement. Those pixels are discarded locally and never reach the output file. The canvas step also drops EXIF metadata, so capture time and any embedded GPS coordinates go with them.",
    ],
  },
  {
    kind: "faq",
    heading: "Crop Image: Questions and Answers",
    faqs: [
      {
        question: "Does cropping reduce the image quality?",
        answer:
          "No. The selected region is copied out of the full-resolution source without any scaling or resampling, and saved as a lossless PNG. The pixels you keep are identical to the ones in the original — you simply have fewer of them.",
      },
      {
        question: "The preview looks small — will my crop be low resolution?",
        answer:
          "No. The preview is scaled to fit the panel, but your selection is translated into the source image's real pixel coordinates before extraction. Cropping a quarter of a 4000-pixel-wide photograph gives a 1000-pixel-wide result at full detail, not a blown-up thumbnail.",
      },
      {
        question: "Why is the Crop button greyed out?",
        answer:
          "Because nothing is selected yet. Free mode starts with no box on the image, so the button stays disabled until you drag one out. Clicking one of the ratio presets also satisfies this — it places a centred selection for you, which is often the quickest way to get started.",
      },
      {
        question: "Can I crop to an exact pixel size?",
        answer:
          "Not directly — the box is dragged rather than typed, with optional ratio constraints. To hit exact dimensions, crop to the right aspect ratio here and then set the precise pixel size with the Resize Image tool.",
      },
      {
        question: "What do the aspect presets do?",
        answer:
          "They constrain the box to 1:1, 16:9 or 4:3 and re-centre a fresh selection at that ratio, covering about 90% of the image to start. You can still move and resize it; it just stays at those proportions. Free mode removes the constraint entirely.",
      },
      {
        question: "Why is the output a PNG when I uploaded a JPEG?",
        answer:
          "So the crop is not compounded by a second round of lossy compression. Re-encoding a JPEG always costs a little quality; exporting as PNG keeps the extracted region exactly as it was. If you need a smaller JPEG afterwards, run the result through Compress Image.",
      },
      {
        question: "What can I load into the cropper?",
        answer:
          "JPEG, PNG and WebP. The check looks at the opening bytes of the file, not the name on it, which is why a GIF or BMP is refused up front instead of breaking partway through. Re-save those in one of the three supported formats first.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Natural Next Steps",
    tools: [
      {
        name: "Resize Image",
        href: "/resize-image",
        description: "Set the exact pixel dimensions once the framing is right.",
        icon: Maximize2,
        accent: "from-rose-500 to-pink-500",
      },
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Shrink the cropped PNG into a lighter JPEG for sharing.",
        icon: Minimize2,
        accent: "from-lime-500 to-green-500",
      },
      {
        name: "Rotate / Flip Image",
        href: "/rotate-image",
        description: "Straighten a sideways photo first — the crop box works on it as it sits.",
        icon: RotateCw,
        accent: "from-purple-500 to-fuchsia-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Framing and Ratios",
    slugs: ["image-aspect-ratio-cropping-guide"],
  },
];

const howToSteps = cropSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function CropImagePage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Crop an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Crop Image"
        description="Drag a box, keep what is inside it — extracted at full resolution, never rescaled."
        icon={Crop}
        accent="from-sky-500 to-blue-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <CropImagePanel />
      </ToolPageLayout>
    </>
  );
}
