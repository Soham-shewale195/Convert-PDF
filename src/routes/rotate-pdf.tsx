import { createFileRoute } from "@tanstack/react-router";
import {
  RotateCw,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import { Scissors, FileStack, Droplets } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import RotatePdfPanel from "@/components/tools/RotatePdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/rotate-pdf")({
  head: () => ({
    meta: [
      { title: "Rotate PDF Pages Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Rotate all pages in a PDF by 90°, 180°, or 270° online for free. Browser-based, private, and instant — no software installation needed.",
      },
      { property: "og:title", content: "Rotate PDF Pages Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Rotate all pages in a PDF by 90°, 180°, or 270° online for free. Browser-based, private, and instant.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/rotate-pdf" }],
  }),
  component: RotatePdfPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PDF Rotation?",
    paragraphs: [
      "PDF rotation changes the orientation of pages within a document. If a page was scanned sideways, saved in landscape when it should be portrait, or is simply upside down, rotation fixes it. The content on the page is not re-rendered — instead, the PDF's internal rotation metadata is updated to tell viewers how to display it.",
      "Our tool uses pdf-lib to read the current rotation angle of each page and apply your chosen adjustment — 90°, 180°, or 270° clockwise. Because it modifies metadata rather than re-drawing content, the process is lossless and preserves every element on the page exactly as it was.",
    ],
  },
  howTo: {
    heading: "How to Rotate a PDF in 3 Steps",
    steps: [
      {
        title: "Upload your PDF",
        description:
          "Drag and drop your PDF onto the upload area, or click to select it from your device. The file loads directly into your browser's memory.",
      },
      {
        title: "Choose the rotation angle",
        description:
          "Select 90°, 180°, or 270° using the angle buttons. The rotation is applied clockwise to every page in the document.",
      },
      {
        title: "Rotate and download",
        description:
          'Click "Rotate pages" to apply the change. The tool updates each page\'s rotation and saves the result as a new PDF for you to download.',
      },
    ],
  },
  benefits: {
    heading: "Why Use Our PDF Rotator",
    items: [
      {
        icon: ShieldCheck,
        title: "Entirely private",
        description:
          "Rotation is performed inside your browser. Your PDF is never uploaded or shared with any server.",
      },
      {
        icon: Eye,
        title: "Zero quality loss",
        description:
          "Rotation updates page metadata, not the content itself. Every pixel, character, and vector stays identical.",
      },
      {
        icon: SlidersHorizontal,
        title: "Three angle options",
        description: "Choose 90°, 180°, or 270° clockwise to correct any orientation issue.",
      },
      {
        icon: Zap,
        title: "Instant results",
        description:
          "Metadata changes are near-instantaneous. Even large PDFs rotate in under a second.",
      },
      {
        icon: Cloud,
        title: "No account needed",
        description: "Free to use, no registration, no email capture, no watermarks on output.",
      },
      {
        icon: Smartphone,
        title: "Mobile compatible",
        description:
          "Rotate PDFs directly from your phone — useful for fixing photos scanned with a mobile app.",
      },
    ],
  },
  useCases: {
    heading: "When to Rotate a PDF",
    intro:
      "Page orientation problems are surprisingly common. Here are typical situations where rotation is needed:",
    items: [
      {
        label: "Fixing scanned documents",
        description:
          "Scanners and scanning apps sometimes capture pages sideways or upside down. Rotate them to the correct orientation.",
      },
      {
        label: "Correcting landscape pages",
        description:
          "A single landscape page in a portrait document can be disorienting. Rotate it to match the rest of the file.",
      },
      {
        label: "Preparing for printing",
        description:
          "Ensure all pages are correctly oriented before sending a document to a printer to avoid wasted paper.",
      },
      {
        label: "Standardising multi-source PDFs",
        description:
          "When merging PDFs from different sources, some pages may arrive in the wrong orientation. Rotate first, then merge.",
      },
    ],
  },
  privacy: {
    heading: "Rotation Without Exposure",
    paragraphs: [
      "Rotating a PDF on ConvertPDF is a completely local operation. Your browser reads the file using the File API, and pdf-lib parses the PDF structure in memory. For each page, the tool reads the current rotation angle via getRotation() and writes the new angle via setRotation() — a simple metadata update that never touches the actual page content.",
      "The corrected PDF is then serialised and offered as a download. No network request is made at any point during this process. Your document remains on your device from start to finish, and all temporary data is released when the tab closes.",
    ],
  },
  faqs: [
    {
      question: "Does rotating a PDF reduce the quality of text or images?",
      answer:
        "No. Rotation in PDF is a metadata operation — it tells the viewer which way to display the page, without re-encoding the content. Text, images, and vector graphics remain byte-for-byte identical.",
    },
    {
      question: "Can I rotate just one page instead of the entire document?",
      answer:
        "The current tool applies the selected rotation angle to all pages in the document. To rotate a single page, you can split the PDF first, rotate the individual page, and then merge the pages back together.",
    },
    {
      question: "What does each angle option do?",
      answer:
        "90° rotates the page a quarter turn clockwise. 180° flips it upside down. 270° rotates it a quarter turn counter-clockwise. Each rotation is added to the page's existing rotation angle.",
    },
    {
      question: "Will the file size change after rotation?",
      answer:
        "File size remains virtually unchanged. Rotation only modifies a small rotation attribute in each page's metadata. The actual content data is untouched.",
    },
    {
      question: "Can I rotate a password-protected PDF?",
      answer:
        "If the PDF is encrypted and requires a password to open, the tool cannot read its contents and rotation will not work. You need to remove the password first using your PDF software.",
    },
    {
      question: "How is this different from rotating in a PDF viewer?",
      answer:
        "Most PDF viewers let you rotate the display temporarily, but the change is not saved to the file. Our tool permanently updates the rotation metadata in the PDF itself, so it displays correctly everywhere.",
    },
    {
      question: "Does this work on scanned PDFs?",
      answer:
        "Yes. Scanned PDFs contain embedded images, and the rotation metadata tells the viewer how to orient those images. The tool works the same way regardless of whether the PDF contains text, scanned images, or a mix of both.",
    },
  ],
  relatedTools: [
    {
      name: "Split PDF",
      href: "/split-pdf",
      description: "Extract pages into separate files",
      icon: Scissors,
      accent: "from-pink-500 to-rose-500",
    },
    {
      name: "Merge PDF",
      href: "/merge-pdf",
      description: "Combine multiple PDFs into one",
      icon: FileStack,
      accent: "from-blue-500 to-cyan-500",
    },
    {
      name: "Watermark PDF",
      href: "/watermark-pdf",
      description: "Add text watermarks to pages",
      icon: Droplets,
      accent: "from-cyan-500 to-blue-500",
    },
  ],
  relatedArticleSlugs: ["best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function RotatePdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Rotate PDF Pages Online" steps={howToSteps} />
      <ToolPageLayout
        title="Rotate PDF"
        description="Fix page orientation by rotating all pages 90°, 180°, or 270° — directly in your browser."
        icon={RotateCw}
        accent="from-amber-500 to-orange-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <RotatePdfPanel />
      </ToolPageLayout>
    </>
  );
}
