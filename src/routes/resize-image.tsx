import { createFileRoute } from "@tanstack/react-router";
import { Maximize2, Crop, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import ResizeImagePanel from "@/components/tools/ResizeImagePanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/resize-image")({
  head: () => ({
    meta: [
      { title: "Resize Image Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Set exact pixel dimensions or scale from 10% to 200%, with an aspect-ratio lock. Saved as a lossless PNG, with no cap on the output size.",
      },
      { property: "og:title", content: "Resize Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Set exact pixel dimensions or scale from 10% to 200%, with an aspect-ratio lock. Saved as a lossless PNG, with no cap on the output size.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/resize-image" }],
  }),
  component: ResizeImagePage,
});

const resizeSteps = [
  {
    title: "Load an image",
    description:
      "Drop a JPEG, PNG or WebP onto the upload area. The width and height boxes fill in with the image's real pixel dimensions, so you always start from where the file actually is rather than a guess.",
  },
  {
    title: "Set the target size",
    description:
      "Type exact pixel values, or drag the percentage slider between 10% and 200% to scale relative to the original. With the aspect-ratio lock on — it is on by default — editing one dimension recalculates the other so the image cannot be stretched out of shape.",
  },
  {
    title: "Apply and download",
    description:
      'Click "Apply Resize". The image is redrawn onto a canvas at the target size and saved as a PNG, named after the original with the new dimensions appended — photo-1280x720.png.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Resizing Actually Does",
    paragraphs: [
      "Resizing changes how many pixels an image is made of. That is a different operation from compression, which keeps the pixel count and encodes it more aggressively, and different again from cropping, which keeps the pixels but discards the ones outside a chosen rectangle.",
      "The work happens on a canvas. The image is decoded, a canvas is created at exactly the width and height you asked for, and the image is drawn into it. Where the target is smaller than the source, the browser averages neighbouring pixels together and the result is usually excellent — detail and sensor noise average out cleanly. Where the target is larger, the browser has to invent pixel values it was never given, and the result is softer than the original no matter how it is done.",
      "Because resizing is the only operation that changes pixel count, it is also the most effective way to make a file dramatically smaller. Halving both dimensions quarters the number of pixels, and no amount of re-encoding at the original size will match that. If a file is too large, resizing first and compressing second almost always beats compressing alone.",
    ],
  },
  {
    kind: "specTable",
    heading: "Output, Limits and Defaults",
    intro:
      "What you get back, and the one place this tool deliberately differs from the other image tools here:",
    columns: ["Property", "Value"],
    rows: [
      {
        label: "Format written out",
        value: "PNG, always — whatever you put in.",
        note: "Lossless, so the resize is not compounded by fresh compression artefacts.",
      },
      {
        label: "Upper size limit",
        value: "None. Whatever you type into the boxes is what you get.",
        note: "Compress Image caps at 4096 pixels; this tool does not, so it is the right choice for large output.",
      },
      { label: "Smallest allowed", value: "1 pixel on each side." },
      { label: "Percentage range", value: "10% to 200% of the original, via the slider." },
      {
        label: "Aspect ratio",
        value: "Locked by default. Unlock it to set width and height independently.",
        note: "With the lock off, the image will stretch — that is the point of the option.",
      },
      { label: "Alpha channel", value: "Preserved. PNG output carries the alpha channel through." },
      { label: "EXIF data", value: "Dropped. Only pixels survive the canvas step." },
      { label: "Images per run", value: "One. Selecting another image replaces the current one." },
      {
        label: "Name of the download",
        value: "Original name with the new dimensions appended — photo-1280x720.png.",
      },
    ],
  },
  {
    kind: "steps",
    heading: "Resizing an Image",
    variant: "timeline",
    steps: resizeSteps,
  },
  {
    kind: "checklist",
    heading: "Where Exact Dimensions Matter",
    intro:
      "Most resizing is driven by something downstream demanding a specific size rather than by taste:",
    items: [
      {
        label: "Meeting a platform's stated dimensions",
        description:
          "Profile photos, banners, thumbnails and ad slots usually publish exact pixel requirements. Hitting them yourself avoids whatever automatic cropping the platform would otherwise apply for you.",
      },
      {
        label: "Getting under an upload limit",
        description:
          "When a form rejects a file for size, reducing the dimensions is far more effective than re-encoding. Halving width and height removes three quarters of the pixels before compression is even considered.",
      },
      {
        label: "Making pages load faster",
        description:
          "Serving a 4000px image into a 800px slot wastes most of the bytes the visitor downloads. Resizing to roughly the display size is one of the largest wins available on image-heavy pages.",
      },
      {
        label: "Standardising a set of images",
        description:
          "Product grids and galleries look wrong when the images differ in size. Running each through at the same target dimensions gives a consistent set — the aspect lock keeps each one undistorted.",
      },
      {
        label: "When resizing is the wrong tool",
        description:
          "If the image already fits its purpose and the file is simply heavy, resizing throws away detail you did not need to lose. Compress instead. And if the framing is the problem, crop — stretching to a new ratio will distort faces and text.",
      },
    ],
  },
  {
    kind: "decision",
    heading: "Resize, Compress, or Crop?",
    intro:
      "These three tools are easy to confuse because all of them make a file smaller. They do it in completely different ways, and picking the wrong one is the usual reason a result disappoints:",
    branches: [
      {
        condition: "The image has more pixels than you need — a 6000px photo for a 1200px slot.",
        recommendation:
          "Resize. This is the case this tool exists for, and it gives the largest size reduction of the three.",
      },
      {
        condition: "The dimensions are right but the file is still too heavy.",
        recommendation: "Leave the pixels alone and re-encode more aggressively with",
        href: "/compress-image",
        linkLabel: "Compress Image",
      },
      {
        condition: "You want to change what is in the frame, not how big it is.",
        recommendation:
          "That is a different operation entirely — remove the parts you do not want with",
        href: "/crop-image",
        linkLabel: "Crop Image",
      },
      {
        condition: "You need a specific aspect ratio, like square for a profile photo.",
        recommendation:
          "Resizing to a different ratio stretches the image. Crop to the ratio first, then resize the result to the exact pixel size you need.",
        href: "/crop-image",
        linkLabel: "Crop Image",
      },
      {
        condition: "The image is small and you want it bigger.",
        recommendation:
          "You can, up to 200%, but manage expectations — enlarging invents pixels and the result is always softer than a genuinely larger original.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Image Resizing",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Resizing happens on your device. The browser decodes the file into memory, draws it onto an off-screen canvas at the size you set, and exports a PNG — all in local JavaScript. The image is never uploaded, and no third-party service receives it.",
      "One consequence worth knowing: because only pixels survive the canvas step, EXIF metadata does not come through. Camera model, capture time and any embedded GPS coordinates are dropped from the resized file, which is usually welcome before publishing a photo and inconvenient if you were relying on it.",
    ],
  },
  {
    kind: "faq",
    heading: "Resize Image: Questions and Answers",
    faqs: [
      {
        question: "Why is the output always a PNG?",
        answer:
          "Because PNG is lossless, so the resize is not compounded by a fresh round of compression artefacts. If you need a smaller JPEG afterwards, run the result through the Compress Image tool — resizing first and compressing second gives a better result than doing either alone.",
      },
      {
        question: "Will enlarging an image improve its quality?",
        answer:
          "No. Enlarging asks the browser to invent pixel values between the ones you have. The image gets bigger in dimensions but softer in appearance, and no detail is added — the information simply is not in the file. Downscaling, by contrast, usually looks very good.",
      },
      {
        question: "What does the aspect-ratio lock do?",
        answer:
          "With the lock on, which is the default, changing width recalculates height and vice versa, so proportions are preserved. Turn it off and you can set both independently — useful when you deliberately need a specific box, but it will stretch the image, which looks obviously wrong on faces and text.",
      },
      {
        question: "Is there a maximum size I can resize to?",
        answer:
          "No cap is applied here — whatever dimensions you enter are what gets produced. That is deliberately different from the Compress Image tool, which limits output to 4096 pixels on the longest side. Very large targets are limited only by your device's memory.",
      },
      {
        question: "Which image formats can I upload?",
        answer:
          "JPEG, PNG and WebP. The tool checks the file's leading bytes rather than trusting its extension, so a GIF or BMP is rejected with a message rather than failing partway through. Convert those to a supported format first.",
      },
      {
        question: "Does resizing preserve transparency?",
        answer:
          "Yes. The output is a PNG, which carries an alpha channel, so a transparent background survives the resize intact. That is another reason the output format is fixed rather than matching the input.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "The Other Two Ways to Shrink a File",
    tools: [
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Keep the pixels, encode them harder. The natural second step after resizing.",
        icon: Minimize2,
        accent: "from-lime-500 to-green-500",
      },
      {
        name: "Crop Image",
        href: "/crop-image",
        description: "Change what is in the frame rather than how large it is.",
        icon: Crop,
        accent: "from-sky-500 to-blue-500",
      },
      {
        name: "Rotate / Flip Image",
        href: "/rotate-image",
        description: "Fix orientation before resizing, so the aspect lock works on the right axis.",
        icon: RotateCw,
        accent: "from-purple-500 to-fuchsia-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Sizing Guides",
    slugs: ["how-to-resize-images-social-media"],
  },
];

const howToSteps = resizeSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function ResizeImagePage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Resize an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Resize Image"
        description="Set exact pixel dimensions, or scale by percentage — saved as a lossless PNG."
        icon={Maximize2}
        accent="from-rose-500 to-pink-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <ResizeImagePanel />
      </ToolPageLayout>
    </>
  );
}
