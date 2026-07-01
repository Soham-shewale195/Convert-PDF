import { createFileRoute } from "@tanstack/react-router";
import {
  FileImage,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  Image as ImageIcon,
  BookOpen,
  Minimize2,
} from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import JpgToPdfPanel from "@/components/tools/JpgToPdfPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/jpg-to-pdf")({
  head: () => ({
    meta: [
      { title: "JPG to PDF Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Convert JPG and PNG images into a single PDF document online for free. Combine photos privately and instantly in your browser.",
      },
      { property: "og:title", content: "JPG to PDF Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Convert JPG and PNG images into a single PDF document online for free. Combine photos privately and instantly in your browser.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/jpg-to-pdf" }],
  }),
  component: JpgToPdfPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is JPG to PDF Conversion?",
    paragraphs: [
      "JPG to PDF conversion is the process of taking one or more standalone image files (like JPG, JPEG, or PNG) and embedding them into a standardized PDF document. While images are great for viewing photos, a PDF is the universally accepted format for sharing documents, applications, and professional portfolios.",
      "Our converter takes your selected photos and builds a new PDF document from scratch using pdf-lib. Each image is placed onto its own page, automatically scaled to fit standard document dimensions while preserving its original aspect ratio, resulting in a neat, printable file.",
    ],
  },
  howTo: {
    heading: "How to Convert Images to PDF in 3 Steps",
    steps: [
      {
        title: "Select your images",
        description:
          "Upload one or more JPG, JPEG, or PNG files from your device. You can drag and drop multiple photos at once.",
      },
      {
        title: "Arrange the sequence",
        description:
          "Review your images in the tool. If you are combining multiple photos, you can preview the order before conversion.",
      },
      {
        title: "Generate the document",
        description:
          "Click to convert. The tool instantly embeds each image onto a new PDF page and prepares the final document for download.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our Image to PDF Converter",
    items: [
      {
        icon: ShieldCheck,
        title: "Uncompromised privacy",
        description:
          "Your personal photos and scans are never uploaded to our servers; they stay on your device.",
      },
      {
        icon: BookOpen,
        title: "Multi-image bundling",
        description:
          "Combine multiple loose photos into a single, cohesive PDF document, perfect for sharing.",
      },
      {
        icon: ImageIcon,
        title: "Supports JPG & PNG",
        description:
          "The tool accepts the most common image formats, including both JPG/JPEG and PNG files.",
      },
      {
        icon: Zap,
        title: "Instant generation",
        description:
          "Because the PDF is constructed in your browser using JavaScript, the conversion is near-instantaneous.",
      },
      {
        icon: Cloud,
        title: "100% Free",
        description:
          "Convert as many images as you need without paying, registering, or dealing with watermarks.",
      },
      {
        icon: Smartphone,
        title: "Mobile friendly",
        description:
          "Turn photos taken on your smartphone directly into PDFs without needing a computer.",
      },
    ],
  },
  useCases: {
    heading: "When to Convert JPGs to PDF",
    intro: "Bundling images into a PDF solves many common file sharing and organization problems:",
    items: [
      {
        label: "Submitting scanned documents",
        description:
          "Many government and institutional portals require PDF uploads. Convert photos of your ID or forms to meet requirements.",
      },
      {
        label: "Creating portfolios",
        description:
          "Combine multiple design mockups, photographs, or sketches into a single professional PDF portfolio.",
      },
      {
        label: "Sharing receipt batches",
        description:
          "Instead of emailing an HR department twenty loose photos of receipts, combine them into one clean expense report.",
      },
      {
        label: "Archiving photo albums",
        description:
          "Bundle a collection of related photos into a single file for easier long-term storage and cross-platform viewing.",
      },
      {
        label: "Preparing for print",
        description:
          "Printers often prefer a single PDF document over multiple image files to ensure pages are printed in the correct order.",
      },
    ],
  },
  privacy: {
    heading: "Private Photo Processing",
    paragraphs: [
      "Privacy is crucial when dealing with photos of personal documents like passports, medical records, or receipts. Our JPG to PDF converter is designed with a strict zero-upload architecture. It uses the modern File API to read your images directly into your browser's memory.",
      "Once loaded, the pdf-lib library constructs a new PDF file and embeds the image data locally. Because the entire pipeline runs in client-side JavaScript, your sensitive photos are never transmitted over the internet or stored on a remote server.",
    ],
  },
  faqs: [
    {
      question: "Can I convert multiple images into a single PDF?",
      answer:
        "Yes, you can upload multiple JPG or PNG files at the same time. The tool will place each image onto its own sequential page in the final PDF document.",
    },
    {
      question: "Will the images lose quality?",
      answer:
        "No. The images are embedded into the PDF at their original resolution. The tool scales the display size to fit the page dimensions, but the underlying pixel data remains untouched and high quality.",
    },
    {
      question: "Does it support PNG files with transparent backgrounds?",
      answer:
        "Yes, the tool fully supports PNG images, including those with transparent backgrounds. The transparency will be preserved in the resulting PDF.",
    },
    {
      question: "What page size is the final PDF?",
      answer:
        "The tool typically creates standard-sized pages (like A4 or Letter) and scales the image to fit within those bounds while maintaining its original aspect ratio, ensuring no distortion occurs.",
    },
    {
      question: "Is there a limit on the number of images I can upload?",
      answer:
        "There is no hard limit built into the tool. However, because the PDF is constructed in your browser's memory, trying to combine hundreds of high-resolution photos at once might cause your browser to slow down or crash.",
    },
    {
      question: "Are my photos uploaded to a cloud server?",
      answer:
        "Absolutely not. The entire conversion process happens locally on your computer or smartphone. We do not have access to your files.",
    },
    {
      question: "How can I reduce the file size of the resulting PDF?",
      answer:
        "If you combine many large photos, the resulting PDF can be quite large. After converting, you can run the document through our Compress PDF tool to reduce the file size for easier emailing.",
    },
  ],
  relatedTools: [
    {
      name: "PDF to JPG",
      href: "/pdf-to-jpg",
      description: "Convert PDF pages to images",
      icon: ImageIcon,
      accent: "from-violet-500 to-purple-500",
    },
    {
      name: "Compress PDF",
      href: "/compress-pdf",
      description: "Reduce PDF file size",
      icon: Minimize2,
      accent: "from-emerald-500 to-teal-500",
    },
  ],
  relatedArticleSlugs: ["browser-pdf-converter-privacy", "best-free-pdf-tools"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function JpgToPdfPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert JPG to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="JPG/PNG to PDF"
        description="Bundle images into a single PDF document."
        icon={FileImage}
        accent="from-amber-500 to-orange-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <JpgToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
