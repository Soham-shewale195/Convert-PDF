import { createFileRoute } from "@tanstack/react-router";
import { RotateCw, Crop, Maximize2, Droplets } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import RotateFlipImagePanel from "@/components/tools/RotateFlipImagePanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/rotate-image")({
  head: () => ({
    meta: [
      { title: "Rotate or Flip Image Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Rotate in 90° steps or mirror an image, baked into the pixels instead of an EXIF tag, so it looks right in every viewer. Lossless PNG output.",
      },
      { property: "og:title", content: "Rotate or Flip Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Rotate in 90° steps or mirror an image, baked into the pixels instead of an EXIF tag, so it looks right in every viewer. Lossless PNG output.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/rotate-image" }],
  }),
  component: RotateImagePage,
});

const rotateSteps = [
  {
    title: "Load an image",
    description:
      "Pick a JPEG, PNG or WebP from your device. The preview shows its current orientation, and the controls reset to zero rotation with both mirrors off.",
  },
  {
    title: "Turn and mirror it",
    description:
      "Each press of Left or Right turns the image another 90°, and the presses accumulate — three rights is the same as one left. Reset returns to the original orientation. The two mirror buttons flip horizontally or vertically and can be combined with any rotation. The preview updates as you go.",
  },
  {
    title: "Apply and download",
    description:
      'Click "Apply Modifications". The image is redrawn onto a canvas sized to fit its new orientation and saved as a PNG with -modified appended to the original name.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "callout",
    heading: "This Fixes Sideways Photos Permanently",
    tone: "info",
    paragraphs: [
      "A photo that appears upright on your phone but sideways elsewhere is usually not rotated at all. The pixels are on their side and an EXIF orientation tag tells viewers to turn them — a tag plenty of software quietly ignores, which is why the same file looks correct in one app and wrong in another.",
      "This tool rotates the actual pixels and writes them out that way, with no orientation tag involved. The result looks the same everywhere, because there is nothing left for software to disagree about.",
    ],
  },
  {
    kind: "prose",
    heading: "What Rotating and Flipping Do",
    paragraphs: [
      "Rotation turns the image around its centre; flipping mirrors it across an axis. Both are handled by transforming the canvas coordinate system before the image is drawn, so the pixels land in their new positions in a single operation rather than being shuffled about afterwards.",
      "The canvas is sized to fit the result rather than the original. Turning a 4000 × 3000 photograph by 90° produces a 3000 × 4000 canvas, so nothing is cropped off at the corners — the frame is rebuilt to match the new orientation before anything is drawn into it.",
      "At 90° steps this is a lossless rearrangement. The pixel grid lines up exactly with the rotated canvas, so every pixel maps onto exactly one destination pixel with nothing to average or interpolate. Combined with PNG output, the result is pixel-identical to the original, just oriented differently. Mirroring is lossless for the same reason: it reverses the order of pixels without changing their values.",
    ],
  },
  {
    kind: "steps",
    heading: "Reorienting an Image",
    steps: rotateSteps,
  },
  {
    kind: "troubleshooting",
    heading: "When the Result Looks Wrong",
    intro:
      "Most confusion here comes from the controls being cumulative, and from mirroring behaving differently to rotation even though they sit side by side:",
    items: [
      {
        problem: "I clicked rotate too many times and lost track",
        cause:
          "The rotation buttons add to each other rather than jumping to fixed positions. Four presses in the same direction bring you back to where you started.",
        fix: "Press Reset. It returns rotation to zero without clearing the file or the mirror toggles, so you can start the turn again from the original orientation.",
      },
      {
        problem: "Flipping did not fix my mirrored selfie the way I expected",
        cause:
          "Rotation and mirroring are applied in sequence to the same canvas, so a horizontal flip after a 90° turn mirrors along what is now the vertical axis on screen.",
        fix: "Set the rotation first and get that right, then apply the mirror. Judge the result from the live preview rather than reasoning about the order.",
      },
      {
        problem: "The photo still appears sideways in one particular app",
        cause:
          "If it looked correct here before you rotated, the original was probably relying on an EXIF orientation tag that this app honours and others do not.",
        fix: "Run it through this tool without changing anything, or with the rotation you actually want. The output carries no orientation tag, so every viewer treats it the same way.",
      },
      {
        problem: "The output file is much larger than the image I uploaded",
        cause:
          "The result is always saved as PNG, which is lossless. A JPEG photograph re-saved as PNG grows considerably, even though the pixels are unchanged.",
        fix: "That trade keeps the rotation from costing any quality. If you need a smaller file, run the result through Compress Image afterwards.",
      },
      {
        problem: "My camera details are gone from the rotated file",
        cause: "The image is redrawn onto a canvas and only pixel data survives that step.",
        fix: "Expected, and part of why the orientation problem goes away — the EXIF block that carried the orientation tag is dropped along with the rest of the metadata.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "Where This Gets Used",
    intro: "Orientation problems nearly always trace back to how the file was captured or scanned:",
    items: [
      {
        label: "Photos that display sideways in some apps",
        description:
          "The classic EXIF orientation mismatch. Re-saving with the rotation baked into the pixels makes the file look the same in every viewer, uploader and email client.",
      },
      {
        label: "Scans that came out upside down",
        description:
          "Flatbed scanners record whatever way the page was laid down. A 180° turn puts the page the right way up before you file or share it.",
      },
      {
        label: "Correcting a mirrored selfie",
        description:
          "Front cameras often save a mirrored image, which is why text in the background reads backwards. A horizontal flip restores it.",
      },
      {
        label: "Preparing images for a print template",
        description:
          "Print layouts frequently expect a particular orientation. Rotating to portrait or landscape beforehand avoids the printer making that decision for you.",
      },
      {
        label: "Creating a mirrored version deliberately",
        description:
          "Designers use horizontal flips for symmetrical layouts or to make a subject face the other way across a spread. Avoid it on anything containing text, which will read backwards.",
      },
      {
        label: "Straightening before cropping",
        description:
          "The crop box works on the image as it currently sits, so fixing orientation first makes framing far easier than trying to compensate for it.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Often Used Alongside",
    tools: [
      {
        name: "Crop Image",
        href: "/crop-image",
        description: "Frame the shot once it is the right way up.",
        icon: Crop,
        accent: "from-sky-500 to-blue-500",
      },
      {
        name: "Resize Image",
        href: "/resize-image",
        description: "Set the dimensions after a quarter turn has swapped width and height.",
        icon: Maximize2,
        accent: "from-rose-500 to-pink-500",
      },
      {
        name: "Watermark Image",
        href: "/watermark-image",
        description: "Add a caption or credit once the orientation is settled.",
        icon: Droplets,
        accent: "from-amber-500 to-yellow-500",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Image Transformation",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Everything happens on your device. The file is read into memory, the canvas coordinate system is transformed, the image is drawn into it, and a PNG is exported — all in local JavaScript. The image is never uploaded, and no third-party service is involved.",
      "The live preview is not a conversion either: it is the original image displayed with a CSS transform applied, so nothing is processed until you click Apply. Only pixels survive that final step, so EXIF metadata — including the orientation tag that caused the problem in the first place — is dropped from the output.",
    ],
  },
  {
    kind: "faq",
    heading: "Rotate and Flip: Questions and Answers",
    faqs: [
      {
        question: "Does rotating reduce image quality?",
        answer:
          "No. At 90° steps the pixel grid aligns exactly with the rotated canvas, so each pixel maps onto one destination pixel with no interpolation. The output is a lossless PNG, so the result is pixel-identical to the original in its new orientation. Mirroring is lossless for the same reason.",
      },
      {
        question: "What rotation angles are available?",
        answer:
          "90° steps in either direction. The buttons accumulate rather than setting fixed positions, so two presses give 180°, three give 270°, and four bring you back to the start. Reset returns to zero. Arbitrary angles such as 45° are not offered, and they would require interpolation and leave blank corners.",
      },
      {
        question: "Can I rotate and flip at the same time?",
        answer:
          "Yes. They are independent and combine freely. Because both are applied to the same canvas in sequence, a mirror after a rotation acts along the rotated axis — set the rotation first and use the preview to confirm the combination looks right.",
      },
      {
        question: "What happens to the image dimensions?",
        answer:
          "For a quarter turn they swap: a 1920 × 1080 landscape image becomes 1080 × 1920. The canvas is rebuilt to fit the rotated image before drawing, so nothing is cropped off. A 180° turn or a mirror leaves the dimensions unchanged.",
      },
      {
        question: "Why does a JPEG come back as a PNG?",
        answer:
          "So the transformation costs nothing in quality. Re-encoding a JPEG would introduce a fresh round of compression on top of an operation that is otherwise lossless. The trade is a larger file, which the Compress Image tool can bring back down if you need it to.",
      },
      {
        question: "Which image types are accepted?",
        answer:
          "JPEG, PNG and WebP only. Because the tool inspects the file's opening bytes rather than its extension, renaming a GIF or BMP will not sneak it through — it is rejected with a message. You will need to change the format properly before rotating.",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Background Reading",
    slugs: ["what-is-client-side-processing"],
  },
];

const howToSteps = rotateSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function RotateImagePage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Rotate or Flip an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Rotate / Flip Image"
        description="Turn in 90° steps or mirror it — baked into the pixels, so it looks right everywhere."
        icon={RotateCw}
        accent="from-purple-500 to-fuchsia-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <RotateFlipImagePanel />
      </ToolPageLayout>
    </>
  );
}
