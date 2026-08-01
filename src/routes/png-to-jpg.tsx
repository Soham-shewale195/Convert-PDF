import { createFileRoute } from "@tanstack/react-router";
import {
  FileImage,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  HardDrive,
  Paintbrush,
} from "lucide-react";
import { Image as ImageLucide, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConvertPanel from "@/components/tools/FormatConvertPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/png-to-jpg")({
  head: () => ({
    meta: [
      { title: "PNG to JPG Converter Online Free | ConvertPDF" },
      { name: "description", content: "Convert PNG images to compact JPG format online for free." },
      { property: "og:title", content: "PNG to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content: "Convert PNG images to compact JPG format online for free.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/png-to-jpg" }],
  }),
  component: PngToJpgPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PNG to JPG Conversion?",
    paragraphs: [
      "Converting a PNG to a JPG (JPEG) involves taking an uncompressed or losslessly compressed image and applying a mathematical algorithm to dramatically shrink its file size. PNGs are fantastic for preserving exact pixel data, but this makes them incredibly heavy. By transitioning to JPG, you trade imperceptible mathematical precision for extreme storage efficiency.",
      "**Understanding Lossy vs. Lossless Savings:** The magic of JPG conversion lies in 'chroma subsampling'. The human eye is highly sensitive to changes in brightness but terrible at noticing subtle shifts in color. The JPG algorithm intentionally blurs and merges color data in blocks, discarding information you can't easily see. This is why a massive PNG photograph can often be squashed into a tiny JPG while still looking identical to the casual observer.",
      "Our processing engine manages this securely within your browser. If your original PNG features a transparent background (which JPGs cannot support), our tool automatically generates a solid white matte layer behind it, ensuring your graphics render correctly without broken pixels or glitchy black backgrounds.",
    ],
  },
  howTo: {
    heading: "How to Convert PNG to JPG in 3 Steps",
    steps: [
      {
        title: "Select your PNG graphic",
        description:
          "Drop your heavy PNG file into the dropzone above. The file is instantly mapped into your browser's local sandbox.",
      },
      {
        title: "Verify the thumbnail",
        description:
          "Look at the generated preview to ensure you're compressing the correct image, especially if you are working with multiple screenshots.",
      },
      {
        title: "Export as JPG",
        description:
          "Hit the conversion button. The tool will flatten any transparency, apply an optimized compression curve, and save the lightweight JPG to your computer.",
      },
    ],
  },
  benefits: {
    heading: "Key Benefits of the JPG Format",
    items: [
      {
        icon: ShieldCheck,
        title: "100% Secure Architecture",
        description:
          "Your corporate diagrams and personal photos are converted locally. We do not use cloud servers, meaning data interception is impossible.",
      },
      {
        icon: HardDrive,
        title: "Massive Storage Relief",
        description:
          "Clear out gigabytes of wasted space on your hard drive by converting bulky PNG screenshots and RAW exports into streamlined JPEGs.",
      },
      {
        icon: Paintbrush,
        title: "Smart Transparency Handling",
        description:
          "Instead of failing or producing corrupted artifacts, our tool intelligently detects transparent alpha channels and flattens them cleanly against a white backdrop.",
      },
      {
        icon: Zap,
        title: "Zero-Latency Processing",
        description:
          "Avoid the frustrating progress bars of traditional cloud converters. Your local hardware handles the re-encoding in milliseconds.",
      },
      {
        icon: Cloud,
        title: "Completely Free Forever",
        description:
          "Transform as many images as you need without hitting artificial quotas, subscription prompts, or hidden fees.",
      },
      {
        icon: Smartphone,
        title: "Mobile-Optimized",
        description:
          "Easily shrink huge PNGs sent to your phone directly from your mobile browser before forwarding them over cellular networks.",
      },
    ],
  },
  useCases: {
    heading: "When Should You Switch to JPG?",
    intro:
      "The JPEG format is the undisputed king of web delivery and digital sharing. Here is when you absolutely need it:",
    items: [
      {
        label: "Bypassing rigid upload restrictions (Workflow Example)",
        description:
          "A university or corporate portal limits assignment uploads to 2 MB. Your high-resolution PNG chart is 9 MB. Converting it to JPG reduces the file to roughly 800 KB, easily clearing the restriction while keeping all text and data completely readable.",
      },
      {
        label: "When NOT to use this tool",
        description:
          "Avoid converting graphics with sharp text, vector-style logos, or assets requiring transparent backgrounds. JPEG compression will introduce fuzzy artifacts (known as 'mosquito noise') around crisp text and flatten transparent areas into solid white blocks.",
      },
      {
        label: "Optimizing website load times",
        description:
          "Serving a 4 MB PNG photograph on your homepage will destroy your SEO and frustrate mobile users. Converting it to a well-optimized JPG ensures your site loads instantly.",
      },
      {
        label: "Emailing image attachments",
        description:
          "Most email clients balk at attachments over 25 MB. Converting a folder of PNG vacation photos to JPG allows you to send dozens of pictures in a single email.",
      },
      {
        label: "Preparing for professional print",
        description:
          "Surprisingly, many commercial photo labs and drugstore kiosks only accept JPEGs for 4x6 or 8x10 physical prints, outright rejecting PNG files.",
      },
    ],
  },
  privacy: {
    heading: "Local Compression Guarantee",
    paragraphs: [
      "Trust is paramount when dealing with unreleased design assets or personal photography. This PNG to JPG utility is built entirely on client-side rendering technology.",
      "When you add a file, it is processed directly by the CPU inside your machine. We do not upload your images to remote infrastructure, we do not inspect your files, and no digital footprints are left behind. Once the browser window is closed, the temporary memory is securely flushed.",
    ],
  },
  faqs: [
    {
      question: "Will the JPG look noticeably worse than my original PNG?",
      answer:
        "For complex images like photographs or detailed paintings, the visual difference is virtually undetectable. We use an optimized 92% quality threshold that perfectly balances drastic file size reduction with high aesthetic fidelity.",
    },
    {
      question: "Why did my transparent logo turn white?",
      answer:
        "The JPEG file format simply does not support alpha channels (transparency). To prevent the image from rendering incorrectly, our converter automatically inserts a crisp white background behind any transparent pixels.",
    },
    {
      question: "Can I choose a specific target file size for the output?",
      answer:
        "This tool applies a standardized, high-quality compression ratio. If you need to hit a very specific kilobyte target, we recommend converting to JPG here first, then running the result through our dedicated Image Compression tool.",
    },
    {
      question: "Does converting to JPG strip my EXIF metadata?",
      answer:
        "Yes. Standard PNGs generally don't carry the same robust EXIF data as JPEGs straight from a camera, but any metadata that was present is purged during the canvas re-rendering process, ensuring a clean, anonymous final file.",
    },
  ],
  relatedTools: [
    {
      name: "WEBP to JPG",
      href: "/webp-to-jpg",
      description:
        "If you downloaded a modern WebP image that your older software cannot open, convert it to the universally accepted JPG format.",
      icon: ImageLucide,
      accent: "from-indigo-500 to-violet-500",
    },
    {
      name: "Compress Image",
      href: "/compress-image",
      description:
        "If your resulting JPG is still slightly over a strict file size limit, use this tool to dial down the quality and squeeze out the last few kilobytes.",
      icon: Minimize2,
      accent: "from-lime-500 to-green-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function PngToJpgPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert PNG to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="PNG to JPG"
        description="Convert PNG images to compact JPG format."
        icon={FileImage}
        accent="from-orange-500 to-amber-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <FormatConvertPanel from="png" to="jpg" />
      </ToolPageLayout>
    </>
  );
}
