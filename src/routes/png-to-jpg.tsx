import { createFileRoute } from "@tanstack/react-router";
import { FileImage, ArrowLeftRight, Minimize2, Image as ImageIcon } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/png-to-jpg")({
  head: () => ({
    meta: [
      { title: "PNG to JPG Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content: "Convert PNG images to compressed JPG format online for free.",
      },
      { property: "og:title", content: "PNG to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Convert PNG images to compressed JPG format online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/png-to-jpg" }],
  }),
  component: PngToJpgPage,
});

const convertSteps = [
  {
    title: "Select a PNG",
    description:
      "Drop a .png file onto the upload area or click to browse. One file per conversion. The file's leading bytes are checked so a mislabelled file is rejected rather than failing halfway through.",
  },
  {
    title: "Confirm the preview",
    description:
      "The thumbnail shows the file you picked, before any conversion has happened. Worth a glance if you are working through a folder of similar screenshots.",
  },
  {
    title: "Convert and download",
    description:
      'Click "Convert to JPG". Any transparency is flattened onto white, the pixels are re-encoded as JPEG at 92% quality, and the file downloads under your original name with a .jpg extension.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is PNG to JPG Conversion?",
    paragraphs: [
      "A PNG stores every pixel exactly as it was given, which makes it faithful and heavy. Converting to JPEG applies lossy compression: the encoder groups similar colours, sacrifices fine detail the eye is poor at noticing, and produces a file that is frequently a fraction of the size. For photographic content the difference is usually invisible; for sharp text and flat colour it is not.",
      "Two things change beyond size. Transparency cannot survive, because JPEG has no alpha channel — so any transparent area is filled with solid white before encoding rather than turning black, which is what an unfilled canvas would produce. And metadata does not survive either, since the image is redrawn onto a canvas and only pixels come out the other side.",
      "The output is fixed at 92% JPEG quality. That is deliberately near the top of the useful range: high enough that photographs come through without visible artefacts, low enough to deliver the size reduction that motivates the conversion in the first place. There is no quality slider here — if you need to hit a specific file size, the Compress Image tool is the right next step.",
    ],
  },
  {
    kind: "specTable",
    heading: "Output Specification",
    intro:
      "Every value below is fixed in the tool. Knowing them up front saves guessing at why a result looks the way it does:",
    columns: ["Property", "Value"],
    rows: [
      { label: "Output format", value: "JPEG, always. There is no format choice on this page." },
      {
        label: "Encoding quality",
        value: "92%.",
        note: "Not adjustable. High enough that photographic detail holds up well.",
      },
      {
        label: "Transparency",
        value: "Flattened onto solid white before encoding.",
        note: "Without the white fill, transparent regions would export as black.",
      },
      {
        label: "Maximum dimensions",
        value:
          "4096 pixels on the longest side. Anything larger is scaled down proportionally before encoding.",
        note: "A 6000 × 4000 image comes out at 4096 × 2731.",
      },
      {
        label: "Colour",
        value: "Converted to standard RGB by the canvas; no colour profile is carried over.",
      },
      {
        label: "Metadata",
        value: "Dropped. EXIF, timestamps and GPS coordinates do not survive the canvas step.",
      },
      { label: "Files per run", value: "One. Selecting another file replaces the current one." },
      {
        label: "Output filename",
        value: "Your original name with the extension swapped — chart.png becomes chart.jpg.",
      },
    ],
  },
  {
    kind: "steps",
    heading: "Converting an Image",
    variant: "timeline",
    steps: convertSteps,
  },
  {
    kind: "troubleshooting",
    heading: "When the Result Isn't What You Expected",
    intro:
      "Most surprises here come from the two things JPEG cannot do: hold transparency, and keep hard edges perfectly crisp.",
    items: [
      {
        problem: "My transparent logo now sits on a white box",
        cause:
          "JPEG has no alpha channel. The converter fills the canvas with white before drawing, because leaving it unfilled would export those areas as black instead.",
        fix: "If the transparency matters, keep the PNG. JPEG cannot represent it in any form, so no setting on this page will preserve it.",
      },
      {
        problem: "Text and sharp lines look fuzzy or have halos around them",
        cause:
          "JPEG compresses in blocks and is tuned for photographic gradients. Hard black-on-white edges are the worst case for it, producing the faint ringing sometimes called mosquito noise.",
        fix: "For screenshots, diagrams and logos, PNG is the better format and usually the smaller one too. Convert only the photographic images and leave the rest alone.",
      },
      {
        problem: "The image came back smaller in pixels than I uploaded",
        cause:
          "Images larger than 4096 pixels on the longest side are scaled down proportionally before encoding.",
        fix: "That limit is fixed here. If you need the full resolution preserved, keep the PNG or resize deliberately with the Resize Image tool so you control the dimensions.",
      },
      {
        problem: "The file barely got smaller",
        cause:
          "PNG is already efficient for flat-colour images, so a diagram or screenshot may compress to a similar size as JPEG — occasionally larger, since JPEG handles that content poorly.",
        fix: "The big wins are on photographs. If the source was a screenshot, converting is unlikely to help much.",
      },
      {
        problem: "My camera details are missing from the JPG",
        cause:
          "The conversion redraws the image onto a canvas, and only pixel data survives that step.",
        fix: "Expected behaviour, and usually welcome — it also strips any embedded GPS location. Keep the original if you need the metadata.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "When Converting Pays Off",
    intro:
      "The conversion is worth making when size matters more than pixel-exactness, and when nothing in the image depends on transparency:",
    items: [
      {
        label: "Getting under an upload cap",
        description:
          "Portals and forms routinely cap uploads at a few megabytes. A photographic PNG is often several times over that limit, and re-encoding as JPEG is usually enough to clear it without touching the visible content.",
      },
      {
        label: "Publishing photographs to the web",
        description:
          "Serving a multi-megabyte PNG photograph slows a page badly for anyone on mobile data. JPEG is the format the format was designed for, and the visual difference on a photograph is hard to see.",
      },
      {
        label: "Emailing a batch of images",
        description:
          "Attachment limits are counted across the whole message. Converting photographs to JPEG lets several fit where one PNG would not.",
      },
      {
        label: "Meeting a service that only accepts JPEG",
        description:
          "Photo printing kiosks, some print labs, and a number of older upload validators accept .jpg and nothing else. This is a compatibility conversion rather than a quality decision.",
      },
      {
        label: "When to keep the PNG instead",
        description:
          "Anything with transparency, sharp text, flat colour blocks or fine line art should stay as PNG. JPEG will make those look worse and may not even make them smaller.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Local Compression Guarantee",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "The conversion runs on your device. Your browser reads the PNG into memory, decodes it, draws it onto an off-screen canvas, and exports a JPEG — all in local JavaScript. Your image is never uploaded, and no third-party service receives it at any point.",
      "The canvas step also acts as a metadata scrub: because only pixels come through, EXIF fields, timestamps and any embedded GPS coordinates are dropped. That is worth knowing in both directions — helpful before publishing a photo, inconvenient if you were depending on the metadata.",
    ],
  },
  {
    kind: "faq",
    heading: "PNG to JPG: Questions and Answers",
    faqs: [
      {
        question: "Will the JPG look noticeably worse than my PNG?",
        answer:
          "On a photograph, almost certainly not — the output is encoded at 92% quality, which is high enough that differences are very hard to spot at normal viewing size. On screenshots, diagrams, logos or anything with sharp text, the difference is much easier to see, and PNG is the better choice for those.",
      },
      {
        question: "Why did my transparent background turn white?",
        answer:
          "JPEG has no alpha channel, so transparency cannot be represented at all. The converter fills the canvas with white before drawing the image; without that step those areas would come out black, which looks far worse.",
      },
      {
        question: "Can I choose the quality or target a specific file size?",
        answer:
          "Not on this page — the quality is fixed at 92%. If you need to hit a particular size, convert here first and then run the result through the Compress Image tool, which gives you a quality control.",
      },
      {
        question: "Is there a maximum image size?",
        answer:
          "Images larger than 4096 pixels on their longest side are scaled down proportionally before encoding, so a 6000 × 4000 photograph comes out at 4096 × 2731. Smaller images are never resized. Beyond that the limit is your device's memory, since the image is decoded in full.",
      },
      {
        question: "Does converting strip my metadata?",
        answer:
          "Yes. The image is redrawn onto a canvas and only pixel data survives, so EXIF fields, capture timestamps and GPS coordinates are all left behind. The output is a clean, anonymous file.",
      },
      {
        question: "Can I convert a folder of PNGs at once?",
        answer:
          "No, the tool takes one file per conversion. You can run them back to back without reloading — selecting a new file simply replaces the previous one.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Related Image Tools",
    tools: [
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Push the size down further with a quality control you can actually set.",
        icon: Minimize2,
        accent: "from-lime-500 to-green-500",
      },
      {
        name: "WEBP to JPG",
        href: "/webp-to-jpg",
        description: "Same conversion, for images downloaded from the web in WebP format.",
        icon: ImageIcon,
        accent: "from-indigo-500 to-violet-500",
      },
      {
        name: "JPG to PNG",
        href: "/jpg-to-png",
        description: "The return trip, when you need a lossless base for editing.",
        icon: ArrowLeftRight,
        accent: "from-teal-500 to-cyan-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Guides on Image Formats",
    slugs: ["batch-image-processing-guide", "how-to-resize-images-social-media"],
  },
];

const howToSteps = convertSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function PngToJpgPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert PNG to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="PNG to JPG"
        description="Re-encode a PNG as a JPEG at 92% quality — smaller files, transparency flattened to white."
        icon={FileImage}
        accent="from-orange-500 to-amber-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <FormatConvertPanel from="png" to="jpg" />
      </ToolPageLayout>
    </>
  );
}
