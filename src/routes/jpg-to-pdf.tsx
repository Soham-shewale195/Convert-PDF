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
      "Our converter builds a new PDF from scratch with pdf-lib, and it makes one deliberate choice most converters don't: each page is created at the exact pixel dimensions of the image it holds. Nothing is scaled down to A4, nothing is letterboxed with white margins, and no pixels are resampled — the page simply is the photo, at full size.",
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
        title: "Check the list",
        description:
          "Your files appear as a numbered list showing each name and size, and pages are written in that order. You can remove any file you didn't mean to include; to change the order, reselect the files in the order you want.",
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
        title: "Passport scans stay local",
        description:
          "pdf-lib is bundled into this page, so photographing an ID or a medical form and wrapping it in a PDF involves no upload and no runtime request anywhere.",
      },
      {
        icon: BookOpen,
        title: "One page per image, in order",
        description:
          "Files are written as pages in the order they appear in the list, so a batch of receipts arrives as one document rather than twenty attachments.",
      },
      {
        icon: ImageIcon,
        title: "JPEG and PNG, chosen by extension",
        description:
          "Files ending in .png are embedded as PNG and everything else as JPEG. Other formats such as WebP or HEIC are not supported and will report an error.",
      },
      {
        icon: Zap,
        title: "No recompression",
        description:
          "Image bytes are embedded as-is rather than decoded and re-encoded, so the photo inside the PDF is the same data as the file you selected.",
      },
      {
        icon: Cloud,
        title: "Alpha channels survive",
        description:
          "PNG transparency is carried into the PDF intact instead of being flattened onto a white background.",
      },
      {
        icon: Smartphone,
        title: "Straight from the camera roll",
        description:
          "Phone cameras already produce JPEG, so photos can go from camera roll to submission-ready PDF on the same device.",
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
        "There is no fixed page size. Each page is created at exactly the pixel dimensions of the image placed on it, so a 4000x3000 photo produces a 4000x3000 page. This means no cropping, no white margins, and no distortion — but it also means pages in a mixed batch will differ in size, and the document is not pre-formatted for A4 or Letter printing.",
    },
    {
      question: "Why did my WebP or HEIC image fail?",
      answer:
        "Only JPEG and PNG can be embedded. The file picker is permissive and will let you select other image types, but the tool decides how to embed a file from its extension — .png is treated as PNG, anything else is attempted as JPEG — so a WebP, HEIC, or GIF will fail with a generic error. Convert those to JPG or PNG first.",
    },
    {
      question: "Is there a limit on the number of images I can upload?",
      answer:
        "No limit is built into the tool. Because pages are created at each image's full pixel dimensions and nothing is downscaled, the output grows quickly with high-resolution photos — a large batch straight from a modern camera can produce a very large PDF and put real pressure on browser memory. Converting in smaller batches is more reliable on phones and older machines.",
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
  relatedArticleSlugs: ["how-to-convert-images-to-pdf", "browser-pdf-converter-privacy"],
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
