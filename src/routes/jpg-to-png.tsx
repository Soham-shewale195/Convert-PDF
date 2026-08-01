import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Layers,
  ImageIcon,
} from "lucide-react";
import { FileImage, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
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

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is JPG to PNG Conversion?",
    paragraphs: [
      "Transforming a JPEG into a PNG file changes the underlying architecture of your image from a lossy compression model to a completely lossless one. While JPEG (Joint Photographic Experts Group) was engineered to compress complex photographs by permanently discarding minor visual data, PNG (Portable Network Graphics) was built to preserve every single pixel perfectly.",
      "**Transparency Explained:** The most critical difference—and the primary reason for this conversion—is the Alpha Channel. JPEGs are fundamentally flat; they cannot contain transparent pixels. If you attempt to cut out a subject in a JPEG, the background becomes solid white. By converting to PNG, you unlock the ability to have a transparent background, making it the required format for logos, overlays, and complex web graphics.",
      "Our web-based utility handles this transition using HTML5 Canvas rendering. The browser decodes your flat JPEG, draws it precisely pixel-for-pixel into memory, and exports it as a rich PNG blob, ready for advanced editing without further degradation.",
    ],
  },
  howTo: {
    heading: "How to Convert JPG to PNG in 3 Steps",
    steps: [
      {
        title: "Load your JPEG",
        description:
          "Drag your photo or graphic into the drop zone. The file is read directly into your device's local memory for instant processing.",
      },
      {
        title: "Review the Image",
        description:
          "Check the generated preview to ensure you have selected the right asset before initiating the format change.",
      },
      {
        title: "Generate PNG",
        description:
          "Click the conversion button. Your browser will instantly re-encode the pixels into a lossless PNG and trigger a secure local download.",
      },
    ],
  },
  benefits: {
    heading: "Technical Advantages of PNG Output",
    items: [
      {
        icon: ShieldCheck,
        title: "Zero-Data-Leak Processing",
        description:
          "Because the conversion script runs inside your browser sandbox, your sensitive photos are never intercepted, uploaded, or stored on remote servers.",
      },
      {
        icon: Layers,
        title: "Halt Generational Degradation",
        description:
          "Every time you edit and re-save a JPEG, it loses more detail. Converting to PNG creates a stable, lossless foundation for endless editing.",
      },
      {
        icon: ImageIcon,
        title: "Alpha Channel Activation",
        description:
          "Switching to PNG prepares your file for background removal tools. You can immediately begin masking out elements in Photoshop or Canva.",
      },
      {
        icon: Zap,
        title: "Lightning-Fast Execution",
        description:
          "By bypassing server queues and utilizing your device's native rendering engine, files are transformed almost instantly.",
      },
      {
        icon: Cloud,
        title: "Completely Unrestricted",
        description:
          "No paywalls, no daily conversion limits, and absolutely no watermarks stamped onto your final graphics.",
      },
      {
        icon: Smartphone,
        title: "Cross-Platform Reliability",
        description:
          "Whether you are working from a high-end desktop or a mobile browser, the interface scales perfectly to your current workspace.",
      },
    ],
  },
  useCases: {
    heading: "When to Switch from JPG to PNG",
    intro:
      "While JPEGs are great for everyday photos, upgrading to PNG is essential in specific design and archival scenarios:",
    items: [
      {
        label: "Designing a website header (Workflow Example)",
        description:
          "You have a JPEG image of a product that you want to place over a colored website header. You convert the JPEG to PNG first, use an eraser tool to remove the white background, and save it. The transparent PNG now blends perfectly into your site design.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Do not convert standard, unedited photographs to PNG if you intend to display them on a website or email them. The lossless PNG format will massively inflate the file size without adding any new detail to a photo that was already compressed as a JPEG.",
      },
      {
        label: "Preparing graphics for strict print requirements",
        description:
          "Certain high-end print shops and merchandise creators refuse JPEGs due to compression artifacts, requiring lossless PNGs to ensure crisp edges on t-shirts and mugs.",
      },
      {
        label: "Editing screenshots with text",
        description:
          "If you took a screenshot that was saved as a JPEG, the text might look slightly muddy. Converting to PNG before applying highlights or drawing arrows ensures those new annotations remain razor-sharp.",
      },
      {
        label: "Long-term master file archiving",
        description:
          "If you want to store a finalized digital painting or critical document scan, PNG guarantees that the file will never suffer from accidental compression if opened and saved years later.",
      },
    ],
  },
  privacy: {
    heading: "Client-Side Format Shifting",
    paragraphs: [
      "We believe that file utilities shouldn't require surrendering your data. When you initiate a JPG to PNG conversion here, the entire process is handled by a local JavaScript worker interacting with your browser's Canvas API.",
      "Your network connection is only used to load the tool interface. Once loaded, the actual image rendering happens entirely on your CPU. We have no access to your files, no databases storing your history, and no tracking scripts monitoring the contents of your graphics.",
    ],
  },
  faqs: [
    {
      question: "Will converting a low-quality JPG to PNG make it look better?",
      answer:
        "No. Converting to PNG prevents future quality loss, but it cannot magically restore the data that was already discarded when the original JPEG was created. You will get an exact, lossless replica of the current pixel state.",
    },
    {
      question: "Why did my file size quadruple after converting to PNG?",
      answer:
        "This is the standard trade-off of lossless compression. JPEGs shrink files by grouping similar colors and throwing away fine details. PNGs map out every individual pixel meticulously. A complex photograph will always be vastly larger as a PNG.",
    },
    {
      question: "Does this tool automatically remove the background from my JPG?",
      answer:
        "No, this utility strictly changes the file architecture. While the resulting PNG will support transparency, you will still need to use a dedicated image editor or background removal tool to actually delete the background pixels.",
    },
    {
      question: "Is there a limit to the resolution of the JPG I can upload?",
      answer:
        "The only limitation is your device's available RAM. Since the conversion happens locally, extremely massive JPEGs (like 50-megapixel camera raws) might cause older mobile browsers to stutter, but modern devices will handle them effortlessly.",
    },
  ],
  relatedTools: [
    {
      name: "Compress Image",
      href: "/compress-image",
      description:
        "If your newly created PNG is too large for your project, use this to intelligently shrink it without reverting to JPG.",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
    {
      name: "PNG to JPG",
      href: "/png-to-jpg",
      description:
        "Accidentally converted a massive photo to PNG? Instantly revert it back to a compact JPG format to save storage space.",
      icon: FileImage,
      accent: "from-orange-500 to-amber-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function JpgToPngPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert JPG to PNG Online" steps={howToSteps} />
      <ToolPageLayout
        title="JPG to PNG"
        description="Convert JPG images to lossless PNG format."
        icon={ArrowLeftRight}
        accent="from-teal-500 to-cyan-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <FormatConvertPanel from="jpg" to="png" />
      </ToolPageLayout>
    </>
  );
}
