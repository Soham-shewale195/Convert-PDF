import { createFileRoute } from "@tanstack/react-router";
import {
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Smartphone,
  Cloud,
  FileImage,
  Layers,
  Download,
} from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import PdfToJpgPanel from "@/components/tools/PdfToJpgPanel";
import ToolContentSections, { type ToolContentData } from "@/components/ToolContentSections";
import { ToolFAQSchema, HowToSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/pdf-to-jpg")({
  head: () => ({
    meta: [
      { title: "PDF to JPG Converter Online Free | ConvertPDF" },
      {
        name: "description",
        content:
          "Convert PDF pages into JPG images instantly in your browser. Private, secure, and generates a convenient ZIP file download.",
      },
      { property: "og:title", content: "PDF to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Convert PDF pages into JPG images instantly in your browser. Private, secure, and generates a convenient ZIP file download.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/pdf-to-jpg" }],
  }),
  component: PdfToJpgPage,
});

const contentData: ToolContentData = {
  whatIs: {
    heading: "What Is PDF to JPG Conversion?",
    paragraphs: [
      "PDF to JPG conversion transforms the pages of a document into standard, web-friendly image files. While PDFs are excellent for preserving complex layouts and multi-page documents, they can be difficult to embed in emails, upload to social media, or insert into presentations.",
      "By converting your document to JPG format, each page becomes a standalone image. Our converter uses pdf.js to render the vector shapes, text, and embedded graphics of your PDF onto an HTML5 Canvas, which is then exported as a high-quality JPG image right in your browser.",
    ],
  },
  howTo: {
    heading: "How to Convert PDF to JPG in 3 Steps",
    steps: [
      {
        title: "Upload your PDF",
        description:
          "Choose a PDF file from your device. The document is loaded securely into your local browser environment without being sent to any server.",
      },
      {
        title: "Generate images",
        description:
          "Click the convert button. The tool instantly renders every page of your PDF into a high-resolution JPG image.",
      },
      {
        title: "Download the ZIP archive",
        description:
          "Once conversion finishes, all the JPG files are packaged into a single ZIP file. Download it to access all your pages as images.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our PDF to JPG Converter",
    items: [
      {
        icon: ShieldCheck,
        title: "Utmost privacy",
        description:
          "Your PDF is processed locally on your device. We never upload or see your files.",
      },
      {
        icon: Layers,
        title: "Every page extracted",
        description:
          "Whether your document has one page or fifty, the tool extracts every single one as a separate image.",
      },
      {
        icon: Download,
        title: "Convenient ZIP format",
        description:
          "We package all the generated JPGs into a single ZIP archive so you don't have to download them one by one.",
      },
      {
        icon: Zap,
        title: "Blazing fast",
        description:
          "Client-side rendering utilizing pdf.js is incredibly fast, turning pages into pixels in seconds.",
      },
      {
        icon: Cloud,
        title: "No registration required",
        description:
          "Start converting immediately without creating an account or providing an email address.",
      },
      {
        icon: Smartphone,
        title: "Cross-device support",
        description:
          "Convert documents to images on your desktop, tablet, or smartphone without installing software.",
      },
    ],
  },
  useCases: {
    heading: "When to Convert PDF to JPG",
    intro:
      "Converting PDFs to images is essential for sharing document contents on platforms that don't support PDFs natively:",
    items: [
      {
        label: "Social media sharing",
        description:
          "Platforms like Instagram and Facebook do not accept PDF uploads. Convert infographics or flyers to JPGs to post them.",
      },
      {
        label: "Presentation slides",
        description:
          "Insert specific pages from a PDF report directly into a PowerPoint or Keynote presentation as an image.",
      },
      {
        label: "Email body embedding",
        description:
          "Display the contents of a flyer or invitation directly in the body of an email instead of sending an attachment.",
      },
      {
        label: "Web development",
        description:
          "Create image thumbnails or previews of downloadable PDF documents for your website or blog.",
      },
      {
        label: "Image galleries",
        description: "Add pages of a portfolio or comic book into a standard online image gallery.",
      },
    ],
  },
  privacy: {
    heading: "Safe, Client-Side Rendering",
    paragraphs: [
      "When converting a PDF to JPGs with ConvertPDF, no external servers are involved. The Mozilla pdf.js library runs entirely within your browser, interpreting the PDF's internal structure and painting it onto an invisible HTML5 canvas element. The canvas data is then exported directly to JPG format.",
      "JSZip is subsequently used to bundle these images into a downloadable archive. Your original document and the resulting images reside exclusively in your computer's RAM during this process. Closing the tab permanently clears the data.",
    ],
  },
  faqs: [
    {
      question: "Are the generated JPGs high quality?",
      answer:
        "Yes, the tool renders the PDF at a high scale factor before exporting it to JPG. This ensures that text remains crisp and embedded images look sharp, suitable for both digital sharing and standard printing.",
    },
    {
      question: "Can I convert just one specific page?",
      answer:
        "The converter processes the entire document and outputs a ZIP file containing every page. If you only need one image, simply extract that specific file from the downloaded ZIP archive.",
    },
    {
      question: "Why do I get a ZIP file instead of a JPG?",
      answer:
        "A PDF usually contains multiple pages, and standard JPG files can only hold a single image. To deliver all your pages in one click without spamming your browser with multiple download prompts, we package them neatly into a ZIP archive.",
    },
    {
      question: "What happens if my PDF has a transparent background?",
      answer:
        "The JPG format does not support transparency. When the PDF is rendered on the canvas, any transparent background areas are filled with solid white to ensure the image looks correct.",
    },
    {
      question: "Will this tool extract embedded images from the PDF?",
      answer:
        "No, this tool renders the entire page exactly as it appears (including text and formatting) into a single flat image. It does not extract individual photos hidden within the document structure.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "There are no hard limits on file size, but because the rendering happens in your browser's memory, extremely large PDFs (e.g., hundreds of pages) may cause older devices to run out of RAM and crash the tab.",
    },
    {
      question: "Does it work with password-protected PDFs?",
      answer:
        "If the PDF requires an 'open password', the browser cannot decrypt it and the conversion will fail. You will need to remove the password protection first.",
    },
  ],
  relatedTools: [
    {
      name: "JPG to PDF",
      href: "/jpg-to-pdf",
      description: "Bundle images into a single PDF",
      icon: FileImage,
      accent: "from-amber-500 to-orange-500",
    },
  ],
  relatedArticleSlugs: ["best-free-pdf-tools", "browser-pdf-converter-privacy"],
};

const howToSteps = contentData.howTo.steps.map((s) => ({ name: s.title, text: s.description }));

function PdfToJpgPage() {
  return (
    <>
      <ToolFAQSchema faqs={contentData.faqs} />
      <HowToSchema name="How to Convert PDF to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="PDF to JPG"
        description="Convert each PDF page to a high-quality JPG image."
        icon={ImageIcon}
        accent="from-violet-500 to-purple-500"
        contentSections={<ToolContentSections data={contentData} />}
      >
        <PdfToJpgPanel />
      </ToolPageLayout>
    </>
  );
}
