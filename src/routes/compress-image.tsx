import { createFileRoute } from "@tanstack/react-router";
import { Minimize2, Maximize2, Crop, FileImage } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import CompressImagePanel from "@/components/tools/CompressImagePanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/compress-image")({
  head: () => ({
    meta: [
      { title: "Compress Image Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Shrink an image with a 1-100 quality slider that measures the real output size as you move it. Runs in your browser, so nothing is uploaded.",
      },
      { property: "og:title", content: "Compress Image Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Shrink an image with a 1-100 quality slider that measures the real output size as you move it. Runs in your browser, so nothing is uploaded.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/compress-image" }],
  }),
  component: CompressImagePage,
});

const compressSteps = [
  {
    title: "Upload an image",
    description:
      "Choose a JPEG, PNG or WebP — drag it in, or click to browse. The file is read into your browser's memory and its leading bytes are checked to confirm it really is an image of a supported type.",
  },
  {
    title: "Move the slider and watch the estimate",
    description:
      "Quality runs from 1 to 100 and starts at 70. Every time you move it, the tool runs a real compression at that setting in the background and shows the resulting size — this is a measurement of your actual image, not a formula, so the number you see is the number you will get.",
  },
  {
    title: "Apply and download",
    description:
      'Click "Compress Image" when the estimate looks right. The result downloads as a JPEG named after the original with -compressed appended.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Image Compression Does Here",
    paragraphs: [
      "Compression keeps every pixel in place and changes how those pixels are stored. JPEG encoding works by discarding information the eye is poor at noticing — subtle colour shifts and fine high-frequency detail — and the quality slider decides how much of it goes. That is the entire trade this page offers: visual fidelity in exchange for file size.",
      "It is worth being clear about what this is not. It does not change the pixel dimensions, so a 6000-pixel-wide photograph stays 6000 pixels wide. If a file is enormous because it has far more pixels than its purpose needs, resizing will beat compression comfortably, and doing both beats either.",
      "The live estimate is the part most worth using. Moving the slider triggers a genuine trial compression of your specific image and reports the real output size, rather than predicting from an average. Compression behaviour varies enormously with content — a smooth portrait and a dense screenshot respond very differently to the same setting — so measuring your own file is the only reliable guide.",
    ],
  },
  {
    kind: "matrix",
    heading: "What the Slider Actually Costs You",
    intro:
      "Quality settings do not affect all content equally. The same value that is invisible on a photograph can be obvious on a screenshot. Roughly what to expect:",
    columnHeadings: ["Quality 90", "Quality 70 (default)", "Quality 40"],
    rows: [
      {
        label: "Photographs and natural scenes",
        cells: [
          "Essentially indistinguishable",
          "Very hard to spot at normal viewing size",
          "Soft detail, visible mottling in flat areas",
        ],
      },
      {
        label: "Screenshots and sharp text",
        cells: [
          "Slight fringing on letter edges",
          "Noticeable halos around text",
          "Clearly degraded, hard to read at small sizes",
        ],
      },
      {
        label: "Logos and flat colour blocks",
        cells: [
          "Minor banding at boundaries",
          "Visible blotching where colours meet",
          "Heavy blocking",
        ],
      },
      {
        label: "Smooth gradients and skies",
        cells: ["Clean", "Faint banding in the smoothest areas", "Obvious banding"],
      },
      {
        label: "Resulting file size",
        cells: [
          "Largest of the three",
          "The usual sweet spot",
          "Smallest, and the most visible cost",
        ],
      },
    ],
  },
  {
    kind: "steps",
    heading: "Compressing an Image",
    steps: compressSteps,
  },
  {
    kind: "checklist",
    heading: "Choosing a Setting in Practice",
    intro:
      "The right value depends on what the image is and where it is going. A few starting points that hold up well:",
    items: [
      {
        label: "Photographs for the web or email",
        description:
          "The default 70 is a good starting point and usually looks indistinguishable from the original at normal viewing size. Drop toward 50 if you need to hit a hard limit; the estimate tells you when you have gone too far.",
      },
      {
        label: "Images that will be viewed full-screen or printed",
        description:
          "Stay at 85 or above. Artefacts that are invisible in a feed become obvious once someone zooms in or puts the image on paper.",
      },
      {
        label: "Hitting a specific upload cap",
        description:
          "Move the slider until the estimate sits under the limit, then apply. That is what the live figure is for — it removes the guess-and-check cycle of compress, check, repeat.",
      },
      {
        label: "Squeezing a photo through a strict form",
        description:
          "If even low quality will not get you under the cap, the image simply has too many pixels. Resize it first, then compress the smaller version — the two together do far more than either alone.",
      },
      {
        label: "When JPEG is the wrong format entirely",
        description:
          "Screenshots, diagrams, logos, line art and anything with a transparent background should not go through JPEG compression. It will add halos around edges, flatten transparency to white, and often produce a larger file than PNG would. Keep those as PNG.",
      },
    ],
  },
  {
    kind: "faq",
    heading: "Compress Image: Questions and Answers",
    faqs: [
      {
        question: "Is the size estimate accurate?",
        answer:
          "It is exact, not an approximation. Each time you move the slider the tool performs a genuine compression of your image at that setting and reports the size of the result. What the estimate shows is what the downloaded file will be.",
      },
      {
        question: "What format do I get back?",
        answer:
          "Always a JPEG, whatever you upload, named after the original with -compressed appended. That is what makes the quality slider meaningful — PNG has no equivalent quality dial, since it is lossless.",
      },
      {
        question: "What happens to a PNG with a transparent background?",
        answer:
          "The transparent areas come out solid white. Since the output is a JPEG and JPEG cannot store an alpha channel, the canvas is filled with white first — without that, those areas would export as black. If transparency matters, this is the wrong tool; keep the PNG.",
      },
      {
        question: "Does compression change the image dimensions?",
        answer:
          "Only in one case. Anything measuring more than 4096 pixels along its longest edge is reduced proportionally before the JPEG is written — a 6000 × 4000 photograph arrives as 4096 × 2731. At or below that limit the dimensions are left exactly as they were. If you want control over the output size, use the Resize Image tool instead.",
      },
      {
        question: "What quality setting should I use?",
        answer:
          "For photographs, the default of 70 is a sensible starting point and is often visually indistinguishable from the original. Go higher for images that will be printed or viewed large, lower when you must hit a size limit. Rather than reasoning about it, move the slider and watch the estimate against your actual target.",
      },
      {
        question: "Which file types does the slider work on?",
        answer:
          "JPEG, PNG and WebP. Validation reads the first few bytes of the file instead of trusting the extension, so a GIF or BMP is turned away with a message rather than failing midway. Save those as JPEG or PNG elsewhere before bringing them here.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private, Browser-Only Compression",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Compression runs inside your browser. The image is decoded into memory, drawn onto an off-screen canvas, and re-encoded as a JPEG in local JavaScript. Your image is never uploaded and no third-party service is involved — including for the live estimate, which is simply another local compression run.",
      "Because only pixels survive the canvas step, EXIF metadata is dropped: camera model, capture timestamp and any embedded GPS coordinates do not reach the compressed file. Worth knowing in both directions — helpful before publishing, inconvenient if you needed to keep it.",
    ],
  },
  {
    kind: "toolLinks",
    heading: "Often Used Together",
    tools: [
      {
        name: "Resize Image",
        href: "/resize-image",
        description: "Cut the pixel count first — the single biggest lever on file size.",
        icon: Maximize2,
        accent: "from-rose-500 to-pink-500",
      },
      {
        name: "Crop Image",
        href: "/crop-image",
        description: "Remove what you do not need before compressing what is left.",
        icon: Crop,
        accent: "from-sky-500 to-blue-500",
      },
      {
        name: "PNG to JPG",
        href: "/png-to-jpg",
        description: "A straight format change at fixed quality, when you do not need the slider.",
        icon: FileImage,
        accent: "from-orange-500 to-amber-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "More on Image Size",
    slugs: ["batch-image-processing-guide"],
  },
];

const howToSteps = compressSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function CompressImagePage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Compress an Image Online" steps={howToSteps} />
      <ToolPageLayout
        title="Compress Image"
        description="Trade quality for size on a 1–100 slider, with a live measurement of the result."
        icon={Minimize2}
        accent="from-lime-500 to-green-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <CompressImagePanel />
      </ToolPageLayout>
    </>
  );
}
