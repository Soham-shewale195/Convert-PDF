import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, FileImage, Minimize2, Maximize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/jpg-to-png")({
  head: () => ({
    meta: [
      { title: "JPG to PNG Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content: "Convert JPG images to lossless PNG format online for free.",
      },
      { property: "og:title", content: "JPG to PNG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Convert JPG images to lossless PNG format online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/jpg-to-png" }],
  }),
  component: JpgToPngPage,
});

const convertSteps = [
  {
    title: "Choose a JPEG",
    description:
      "Drop a .jpg or .jpeg file onto the upload area, or click to browse. One file at a time. The first few bytes are checked to confirm it really is an image, so a renamed file is rejected rather than producing a broken result.",
  },
  {
    title: "Check the preview",
    description:
      "A thumbnail appears below the upload area. Nothing has been converted yet — this is just the file you selected, so you can confirm you picked the right one.",
  },
  {
    title: "Convert and download",
    description:
      'Click "Convert to PNG". The image is decoded, drawn onto a canvas, and re-encoded as a PNG. The download keeps your original filename with the extension swapped — photo.jpg becomes photo.png.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "callout",
    heading: "What This Will and Will Not Do",
    tone: "warn",
    paragraphs: [
      "Converting a JPEG to PNG does not recover quality. Whatever detail the JPEG discarded when it was first saved is gone for good, and no format change brings it back. What you get is an exact, lossless copy of the pixels as they are right now.",
      "It will almost certainly make the file bigger — often several times bigger. That is not a fault; it is what lossless encoding costs. Converting is worth it when you are about to edit the image, and a poor trade when you just want to share or upload it.",
    ],
  },
  {
    kind: "prose",
    heading: "What Actually Changes",
    paragraphs: [
      "JPEG and PNG solve opposite problems. JPEG was built to make photographs small by permanently throwing away detail the eye is unlikely to miss. PNG was built to store every pixel exactly as given, at whatever size that takes.",
      "The conversion runs entirely through your browser's canvas. The JPEG is decoded into raw pixels, painted onto an off-screen canvas at its original dimensions, and exported as PNG. No quality setting is applied on the way out — PNG encoding is lossless by definition, so the output is a pixel-for-pixel match of the decoded input.",
      "The practical value is that this stops the bleeding. Every time a JPEG is opened, edited and re-saved, it is compressed again and loses a little more. Convert once to PNG and that cycle ends: you can edit, save, and re-save indefinitely without further degradation. It is a foundation for editing, not an improvement to the image you already have.",
    ],
  },
  {
    kind: "comparison",
    heading: "JPEG and PNG, Side by Side",
    intro:
      "Neither format is better in general — they are built for different jobs. This is what you are trading when you convert:",
    columns: ["JPEG (your input)", "PNG (your output)"],
    rows: [
      {
        aspect: "Compression",
        a: "Lossy. Detail is discarded permanently to save space.",
        b: "Lossless. Every pixel is stored exactly as decoded.",
      },
      {
        aspect: "Transparency",
        a: "None. There is no alpha channel at all.",
        b: "Supported, though converting does not create transparency on its own.",
      },
      {
        aspect: "File size on a photograph",
        a: "Small — this is what JPEG is for.",
        b: "Considerably larger, often several times over.",
      },
      {
        aspect: "Repeated editing",
        a: "Degrades a little with every save.",
        b: "Stable. Re-saving costs nothing in quality.",
      },
      {
        aspect: "Sharp text and flat colour",
        a: "Blurs and rings around hard edges.",
        b: "Holds edges cleanly, and often compresses such images well.",
      },
      {
        aspect: "Camera metadata",
        a: "Usually carries EXIF — camera, lens, sometimes GPS.",
        b: "Dropped here, because the canvas round-trip keeps only pixels.",
      },
    ],
  },
  {
    kind: "steps",
    heading: "Converting an Image",
    steps: convertSteps,
  },
  {
    kind: "checklist",
    heading: "When the Trade Is Worth It",
    intro:
      "Converting to PNG earns its extra file size in a fairly narrow set of situations — nearly all of them involving further editing:",
    items: [
      {
        label: "Before you start editing",
        description:
          "If a JPEG is about to go through several rounds of cropping, retouching or annotation, convert it first. Each save after that costs nothing in quality, where a JPEG would degrade a little each time.",
      },
      {
        label: "Preparing an image for background removal",
        description:
          "PNG is the format that can hold transparency once you cut a subject out. The conversion does not remove anything itself — it gives you a file that can store the result when your editor does.",
      },
      {
        label: "Annotating a screenshot",
        description:
          "Screenshots saved as JPEG already have soft, ringing text. Converting before you add arrows and highlights keeps at least the new annotations crisp, even though the original text stays as it was.",
      },
      {
        label: "Meeting a print or manufacturing requirement",
        description:
          "Some print shops and merchandise services reject JPEGs outright because compression artefacts show up badly on physical products. A PNG satisfies the requirement even when the underlying detail is unchanged.",
      },
      {
        label: "When to skip it",
        description:
          "For an ordinary photograph you intend to email, upload or publish, converting to PNG is the wrong move. You will multiply the file size and gain nothing visible, because the detail JPEG removed is already gone.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Client-Side Format Shifting",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "The conversion happens on your device. Your browser reads the file into memory, decodes it, paints it onto a canvas, and exports a PNG — all in local JavaScript on the page's main thread. Your image is never uploaded, and no third-party service ever receives it.",
      "One useful side effect: because only pixels survive the canvas round-trip, EXIF metadata is left behind. Camera model, timestamps and any embedded GPS coordinates do not make it into the PNG, which is worth knowing if you are about to share a photo publicly.",
    ],
  },
  {
    kind: "faq",
    heading: "JPG to PNG: Questions and Answers",
    faqs: [
      {
        question: "Will converting a low-quality JPG to PNG make it look better?",
        answer:
          "No. Converting to PNG prevents future quality loss, but it cannot restore data that was discarded when the JPEG was first saved. You get an exact, lossless copy of the current pixels — artefacts included.",
      },
      {
        question: "Why did my file size go up so much?",
        answer:
          "That is the expected trade. JPEG shrinks photographs by grouping similar colours and discarding fine detail; PNG records every pixel individually. A detailed photograph will nearly always be several times larger as a PNG. Images with flat colour and sharp edges, like screenshots and diagrams, fare much better.",
      },
      {
        question: "Does this remove the background from my image?",
        answer:
          "No. The conversion only changes the file format. The resulting PNG is capable of holding transparency, but you still need an image editor or background-removal tool to actually cut anything out.",
      },
      {
        question: "Is there a size limit on the image I can convert?",
        answer:
          "There is one worth knowing about: if either dimension is larger than 4096 pixels, the image is scaled down proportionally to fit within that limit before it is encoded. A 6000 × 4000 photograph comes out at 4096 × 2731. Below that threshold nothing is resized. The other practical limit is your device's memory, since the whole image is decoded into it.",
      },
      {
        question: "What happens to my EXIF data?",
        answer:
          "It is dropped. The image is redrawn onto a canvas, and only pixel data survives that step, so camera details, timestamps and GPS coordinates are not carried into the PNG. Useful for privacy, inconvenient if you were relying on that metadata.",
      },
      {
        question: "Can I convert several images at once?",
        answer:
          "No — the tool handles one file per conversion. Selecting a new file replaces the current one, and you can run as many conversions in a row as you like without reloading the page.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Where to Go Next",
    tools: [
      {
        name: "PNG to JPG",
        href: "/png-to-jpg",
        description: "The return trip, for when the PNG turns out larger than you wanted.",
        icon: FileImage,
        accent: "from-orange-500 to-amber-500",
      },
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Shrink the result without leaving the PNG format behind.",
        icon: Minimize2,
        accent: "from-lime-500 to-green-500",
      },
      {
        name: "Resize Image",
        href: "/resize-image",
        description: "Reduce the pixel dimensions, which cuts size far more than re-encoding does.",
        icon: Maximize2,
        accent: "from-rose-500 to-pink-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Further Reading on Formats",
    slugs: ["jpg-vs-png-guide", "what-is-client-side-processing"],
  },
];

const howToSteps = convertSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function JpgToPngPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert JPG to PNG Online" steps={howToSteps} />
      <ToolPageLayout
        title="JPG to PNG"
        description="Convert a JPEG into a lossless PNG — a stable base for editing, not a quality upgrade."
        icon={ArrowLeftRight}
        accent="from-teal-500 to-cyan-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <FormatConvertPanel from="jpg" to="png" />
      </ToolPageLayout>
    </>
  );
}
