import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, FileImage, Minimize2, Maximize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/webp-to-jpg")({
  head: () => ({
    meta: [
      { title: "WEBP to JPG Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Turn a WebP into a JPEG that older software will actually open. Your browser decodes and re-encodes it at 92% quality — nothing is uploaded.",
      },
      { property: "og:title", content: "WEBP to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Turn a WebP into a JPEG that older software will actually open. Your browser decodes and re-encodes it at 92% quality — nothing is uploaded.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/webp-to-jpg" }],
  }),
  component: WebpToJpgPage,
});

const convertSteps = [
  {
    title: "Select the WebP file",
    description:
      "Drop a .webp file onto the upload area or click to browse. This is usually something saved from a website, since few cameras or editors produce WebP directly. One file per conversion.",
  },
  {
    title: "Check the preview",
    description:
      "A thumbnail appears once the file loads — useful confirmation here in particular, because Windows Explorer and macOS Finder often cannot generate WebP thumbnails at all, so this may be your first proper look at it.",
  },
  {
    title: "Convert and download",
    description:
      'Click "Convert to JPG". Your browser decodes the WebP, flattens any transparency onto white, and re-encodes the pixels as a JPEG at 92% quality, keeping the original filename with a .jpg extension.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is WEBP to JPG Conversion?",
    paragraphs: [
      "WebP is a Google-developed image format that compresses better than JPEG at comparable quality, which is why so much of the web now serves it. That efficiency is the whole point — and it is also why you end up here. Browsers handle WebP fluently; a great deal of desktop software still does not.",
      "The conversion is a decode-and-re-encode. Your browser already understands WebP natively, so it decodes the image to raw pixels, paints them onto an off-screen canvas, and exports the result as a JPEG at 92% quality. Nothing is uploaded, and no separate decoder is needed — the capability is already in the browser you are reading this in.",
      "Because both formats are lossy, this is a second round of compression rather than a straight repackaging. At 92% that generational loss is very hard to see, but it is real: you are not extracting an original, you are producing a new JPEG from decoded pixels. Keep the WebP if the file is one you may need to re-export later.",
    ],
  },
  {
    kind: "decision",
    heading: "Should You Convert At All?",
    intro:
      "WebP exists because it is smaller than JPEG. Converting away from it is a compatibility decision, not a quality one, and it is not always the right call:",
    branches: [
      {
        condition: "Software you need to use will not open the file.",
        recommendation:
          "This is the case the tool is for. Older Photoshop and Illustrator versions, many desktop viewers and a fair amount of enterprise software still reject WebP outright.",
      },
      {
        condition: "An upload form only accepts .jpg, .jpeg or .png.",
        recommendation:
          "Convert. Plenty of government portals, job boards and print services validate by extension and will refuse a WebP before it ever reaches their server.",
      },
      {
        condition: "You are building a website or web app.",
        recommendation:
          "Do not convert. WebP is smaller than the JPEG you would replace it with, so this would make your pages heavier for no benefit — the opposite of what you want.",
      },
      {
        condition: "The image has a transparent background you need to keep.",
        recommendation:
          "Convert to PNG instead of JPEG. JPEG has no alpha channel, so transparency would be flattened onto white here.",
        href: "/jpg-to-png",
        linkLabel: "JPG to PNG",
      },
      {
        condition: "The file is simply too large for what you need.",
        recommendation:
          "Converting to JPEG may not help, since WebP is usually the more efficient format already. Reduce the dimensions or the quality instead with",
        href: "/compress-image",
        linkLabel: "Compress Image",
      },
    ],
  },
  {
    kind: "steps",
    heading: "Converting a File",
    steps: convertSteps,
  },
  {
    kind: "definitions",
    heading: "What Changes on the Way Out",
    intro:
      "The pixels you see stay essentially the same. Several things around them do not survive the conversion:",
    terms: [
      {
        term: "Transparency becomes white",
        definition:
          "WebP supports an alpha channel and JPEG does not. Transparent regions are filled with solid white before encoding, because an unfilled canvas would export them as black instead.",
      },
      {
        term: "Animation becomes a single frame",
        definition:
          "WebP can hold animation; JPEG cannot. An animated WebP is decoded to its first frame, which is what gets saved. The remaining frames are simply not carried across.",
      },
      {
        term: "Quality is re-encoded at 92%",
        definition:
          "The output is a fresh JPEG rather than a repackaged original. At 92% the second round of lossy compression is very difficult to see, but it is a real generational step, so avoid repeating the round trip needlessly.",
      },
      {
        term: "Images over 4096 pixels are scaled down",
        definition:
          "If either dimension exceeds 4096 pixels, the image is reduced proportionally to fit within that limit before encoding. Anything smaller passes through at its original size.",
      },
      {
        term: "Metadata is dropped",
        definition:
          "Only pixels survive the canvas round-trip, so any embedded metadata is left behind. The result is a clean file with no capture details or location data attached.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "Where Conversion Actually Helps",
    intro:
      "Nearly every good reason to convert comes down to something downstream refusing to accept the format:",
    items: [
      {
        label: "Getting an image into a slide deck or document",
        description:
          "PowerPoint, Keynote and a number of document editors either refuse WebP or import it as a broken placeholder. A JPEG drops in without argument.",
      },
      {
        label: "Opening the file in older design software",
        description:
          "Photoshop and Illustrator gained WebP support relatively recently. On an older installation, converting first is usually faster than hunting down a plugin.",
      },
      {
        label: "Submitting to a portal that validates by extension",
        description:
          "Many forms check the file extension against a fixed list before anything else happens. WebP is rarely on that list, however valid the image is.",
      },
      {
        label: "Ordering physical prints",
        description:
          "Photo kiosks and online print services almost universally expect JPEG. A WebP will typically stop the order at the upload step.",
      },
      {
        label: "Sharing where thumbnails matter",
        description:
          "File explorers on both Windows and macOS often show WebP files as blank icons, which makes a folder of them hard to work through. JPEG previews everywhere.",
      },
      {
        label: "When to leave it alone",
        description:
          "If the image is destined for a website, keep the WebP. Converting to JPEG will make it larger for the same visible quality, which is the wrong direction for page speed.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Secure Browser-Based Conversion",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Your file stays on your device. The browser decodes the WebP using the support already built into it, draws the pixels onto an off-screen canvas, and exports a JPEG — entirely in local JavaScript. The image is never uploaded, and no third-party service is involved in the conversion.",
      "Because only pixels survive the canvas step, whatever metadata the WebP carried does not reach the JPEG. When the tab closes, both the source image and the generated file are released from memory.",
    ],
  },
  {
    kind: "faq",
    heading: "WEBP to JPG: Questions and Answers",
    faqs: [
      {
        question: "Why do so many sites serve WebP now?",
        answer:
          "Because it compresses better than JPEG at similar quality, so pages load faster and cost less bandwidth to serve. That benefit is aimed at browsers, which is exactly why the format becomes awkward the moment you download a file and try to open it in something else.",
      },
      {
        question: "Will converting reduce the quality?",
        answer:
          "Slightly, though it is hard to see. Both formats are lossy, so this is a second round of compression rather than a repackaging of the original. The output is encoded at 92% quality, which keeps the loss well below what is noticeable at normal viewing size — but it is still a real step, so avoid converting back and forth repeatedly.",
      },
      {
        question: "What happens to an animated WebP?",
        answer:
          "JPEG cannot store animation, so only the first frame is decoded and saved. The result is a still image. If you need to keep the animation, JPEG is not a format that can hold it in any form.",
      },
      {
        question: "My WebP had a transparent background — where did it go?",
        answer:
          "It was filled with white. WebP carries an alpha channel and JPEG has none, so the canvas is painted white before the image is drawn; leaving it unpainted would render those regions black instead. If the transparency matters, convert to PNG rather than JPEG.",
      },
      {
        question: "Is there a size limit?",
        answer:
          "Images larger than 4096 pixels on the longest side are scaled down proportionally before encoding — a 5000-pixel-wide image comes out at 4096. Smaller images are untouched. Beyond that, the practical limit is your device's memory.",
      },
      {
        question: "Can I convert several WebP files at once?",
        answer:
          "No, one file per conversion. You can run them one after another without reloading the page, since selecting a new file simply replaces the previous one.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Other Conversions",
    tools: [
      {
        name: "PNG to JPG",
        href: "/png-to-jpg",
        description: "The same re-encode, for heavy PNG screenshots and exports.",
        icon: FileImage,
        accent: "from-orange-500 to-amber-500",
      },
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Shrink the result further with a quality control you can set yourself.",
        icon: Minimize2,
        accent: "from-lime-500 to-green-500",
      },
      {
        name: "Resize Image",
        href: "/resize-image",
        description: "Cut the pixel dimensions, which reduces size far more than re-encoding.",
        icon: Maximize2,
        accent: "from-rose-500 to-pink-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "More on WebP",
    slugs: ["how-to-convert-webp-to-jpg", "browser-tech-replacing-desktop-apps"],
  },
];

const howToSteps = convertSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function WebpToJpgPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert WEBP to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="WEBP to JPG"
        description="Turn a WebP into a JPEG that older software will actually open."
        icon={ImageIcon}
        accent="from-indigo-500 to-violet-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <FormatConvertPanel from="webp" to="jpg" />
      </ToolPageLayout>
    </>
  );
}
