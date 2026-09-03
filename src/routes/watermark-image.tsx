import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Crop, Minimize2, RotateCw } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import WatermarkImagePanel from "@/components/tools/WatermarkImagePanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/watermark-image")({
  head: () => ({
    meta: [
      { title: "Watermark Image Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Bake text into an image: your wording, colour, size, opacity and one of nine positions. Applied in your browser and saved as a lossless PNG.",
      },
      { property: "og:title", content: "Watermark Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Bake text into an image: your wording, colour, size, opacity and one of nine positions. Applied in your browser and saved as a lossless PNG.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/watermark-image" }],
  }),
  component: WatermarkImagePage,
});

const watermarkSteps = [
  {
    title: "Load an image",
    description:
      "Load a JPEG, PNG or WebP into the panel. The preview appears with the default watermark already applied — white CONFIDENTIAL, centred, at half opacity.",
  },
  {
    title: "Set the text and its appearance",
    description:
      "Type your wording, pick a colour, and adjust size and opacity with the sliders. Size is expressed as a percentage of the image width, so the same setting looks proportionally the same on a 600-pixel image and a 6000-pixel one. Nine position buttons place the text in a three-by-three grid.",
  },
  {
    title: "Apply and download",
    description:
      'Click "Apply Watermark". The text is drawn onto a copy of the image at full resolution and exported as a PNG with -watermarked appended to the original name.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "callout",
    heading: "A Watermark Deters, It Does Not Protect",
    tone: "warn",
    paragraphs: [
      "This bakes text permanently into the pixels, which is genuinely useful — it survives copying, screenshotting and re-uploading, and there is no layer to switch off. What it is not is a security control.",
      "A watermark placed in a corner can be cropped away in seconds. A semi-transparent one over a simple background can be painted out. If an image is commercially valuable enough that someone would bother, treat the watermark as a claim of ownership and a deterrent rather than a lock — and place it across the subject, where removing it damages the thing they wanted.",
    ],
  },
  {
    kind: "prose",
    heading: "How the Watermark Is Applied",
    paragraphs: [
      "The image is drawn onto an off-screen canvas at its original dimensions, and your text is painted on top of it in a single pass. Because it becomes part of the pixel data at that moment, there is no separate layer, no metadata tag and nothing that a viewer could choose not to display. Whatever the image is opened in, the text is simply part of the picture.",
      "Size is calculated as a percentage of the image's width rather than in fixed points, which is what makes one setting work across wildly different images. Fifteen percent produces text roughly a seventh of the frame's width whether the photo is 600 or 6000 pixels across, so you are not re-tuning the slider for every file.",
      "The output is a PNG at the original dimensions. Nothing is resized, nothing is re-compressed beyond the lossless PNG encode, and any transparency in the source is preserved — which means a watermark can be applied to a logo or cut-out without the background turning white.",
    ],
  },
  {
    kind: "steps",
    heading: "Adding a Watermark",
    variant: "timeline",
    steps: watermarkSteps,
  },
  {
    kind: "checklist",
    heading: "Placing It Well",
    intro:
      "Most of the value is in where the text goes and how visible it is. A few things that consistently work:",
    items: [
      {
        label: "Claiming a photograph you are sharing publicly",
        description:
          "A name or handle at moderate opacity marks the image as yours without dominating it. Corners are the least intrusive choice, and the honest trade is that they are also the easiest to crop off.",
      },
      {
        label: "Marking proofs and previews",
        description:
          "Client proofs and portfolio samples benefit from a large, central SAMPLE or PROOF. Placing it over the subject is the point — it makes the preview unusable as a finished asset while still showing the work.",
      },
      {
        label: "Labelling a document photo",
        description:
          "Photographing an ID or certificate for a specific application, then stamping the purpose across it, means a copy that leaks cannot easily be reused for something else.",
      },
      {
        label: "Choosing a colour that survives the background",
        description:
          "White disappears over a bright sky and black vanishes into shadow. Pick the opposite of whatever sits beneath the text, and check the preview rather than assuming.",
      },
      {
        label: "Getting opacity right",
        description:
          "Too faint and it is trivially cloned out; too solid and it ruins the image. Around half is a reasonable default — visible at a glance, still letting the picture through.",
      },
      {
        label: "When this is not enough",
        description:
          "For genuinely valuable commercial licensing, a visible watermark is a deterrent rather than protection. Combine it with lower-resolution previews, or use a service built for rights management.",
      },
    ],
  },
  {
    kind: "specTable",
    heading: "The Five Controls",
    intro: "Everything the tool exposes, and the two things worth knowing about how they behave:",
    columns: ["Control", "What it does"],
    rows: [
      { label: "Text", value: "Any wording you type. Defaults to CONFIDENTIAL." },
      {
        label: "Colour",
        value: "Free choice through the native colour picker. Defaults to white.",
        note: "White works on dark images; switch to a dark colour over light backgrounds.",
      },
      {
        label: "Size",
        value: "A percentage of the image's width, from small to large. Defaults to 15%.",
        note: "Proportional by design, so one setting suits images of very different resolutions.",
      },
      {
        label: "Opacity",
        value: "1 to 100. Defaults to 50, which reads clearly without hiding the image.",
      },
      {
        label: "Position",
        value: "A three-by-three grid — corners, edge centres, or the middle. Defaults to centre.",
        note: "Padding from the edge scales with the text size, so corner placements stay clear of the border.",
      },
      {
        label: "Repetition",
        value: "None. The text is drawn once, not tiled across the image.",
      },
      { label: "Rotation", value: "None. The text is always drawn horizontally." },
      {
        label: "Output",
        value: "PNG at the original dimensions, named with -watermarked appended.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Image Watermarking",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Both the image and the text stay on your device. The file is decoded into memory, drawn onto an off-screen canvas, and your wording is painted on before a PNG is exported — all in local JavaScript. Nothing is uploaded, and no third-party service sees either the picture or what you wrote on it.",
      "That second part matters more than it might sound: watermark text is often a real name, a client's name, or a case reference. It is typed into the page and used locally, never transmitted. As with the other image tools here, EXIF metadata does not survive the canvas step, so the watermarked copy carries no capture time or GPS coordinates.",
    ],
  },
  {
    kind: "faq",
    heading: "Watermark Image: Questions and Answers",
    faqs: [
      {
        question: "Can the watermark be removed?",
        answer:
          "By someone determined, often yes. It is part of the pixels, so it survives copying and screenshotting and cannot be toggled off — but a corner placement can be cropped away, and a semi-transparent mark over a plain background can be edited out. Placing it across the subject makes removal far more damaging to the image.",
      },
      {
        question: "Why is the size a percentage rather than a point size?",
        answer:
          "So one setting works across images of different resolutions. A fixed point size that looks right on a 600-pixel image would be almost invisible on a 6000-pixel one. Tying it to the image width keeps the text proportionally the same on both.",
      },
      {
        question: "Does the preview match the final image exactly?",
        answer:
          "It is a close guide rather than a pixel-exact rendering. The preview positions the text with CSS over a scaled-down copy, while the output is drawn onto the full-resolution canvas, so the size and placement can differ very slightly. Treat the preview as a reliable indication of colour, opacity and position, and check the downloaded file if the placement is critical.",
      },
      {
        question: "Can I tile the watermark across the whole image or angle it?",
        answer:
          "No. The text is drawn once, horizontally, at one of nine positions. Repeating patterns and diagonal text are not offered here — for those you would need a dedicated image editor.",
      },
      {
        question: "Can I use a logo instead of text?",
        answer:
          "No, this tool applies text only. There is no image upload for the watermark itself, so a logo would need to be composited in an image editor.",
      },
      {
        question: "Does watermarking reduce image quality?",
        answer:
          "No. The image is drawn at its original dimensions and exported as a lossless PNG, so the only pixels that change are the ones under the text. A JPEG source will produce a larger PNG file, which the Compress Image tool can bring back down.",
      },
      {
        question: "What can I put a watermark on?",
        answer:
          "JPEG, PNG and WebP. Files are identified by their opening bytes rather than their extension, so GIF and BMP are declined with a message up front. Transparency in a PNG or WebP source is preserved in the output.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Before and After Watermarking",
    tools: [
      {
        name: "Crop Image",
        href: "/crop-image",
        description:
          "Frame the shot first, so the watermark lands where you want it in the final crop.",
        icon: Crop,
        accent: "from-sky-500 to-blue-500",
      },
      {
        name: "Rotate / Flip Image",
        href: "/rotate-image",
        description: "Fix orientation first — the watermark is always drawn horizontally.",
        icon: RotateCw,
        accent: "from-purple-500 to-fuchsia-500",
      },
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Shrink the watermarked PNG for sharing without undoing the mark.",
        icon: Minimize2,
        accent: "from-lime-500 to-green-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "More on Watermarking",
    slugs: ["how-to-watermark-photos-online"],
  },
];

const howToSteps = watermarkSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function WatermarkImagePage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Watermark an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Watermark Image"
        description="Bake text into the pixels — your choice of wording, colour, size, opacity and position."
        icon={Droplets}
        accent="from-amber-500 to-yellow-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <WatermarkImagePanel />
      </ToolPageLayout>
    </>
  );
}
