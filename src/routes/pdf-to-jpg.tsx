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
  Scissors,
  Minimize2,
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
          "Turn a whole PDF into one tall JPG image, rendered at 2x scale in your browser. Every page stacked into a single shareable file.",
      },
      { property: "og:title", content: "PDF to JPG Converter Online Free | ConvertPDF" },
      {
        property: "og:description",
        content:
          "Turn a whole PDF into one tall JPG image, rendered at 2x scale in your browser. Every page stacked into a single shareable file.",
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
      "PDF to JPG conversion transforms the pages of a document into a standard, web-friendly image file. While PDFs are excellent for preserving complex layouts and multi-page documents, they can be difficult to embed in emails, upload to social media, or insert into presentations.",
      "This converter works differently from most: rather than handing you a folder of separate files, it renders every page with Mozilla's pdf.js at 2x scale and stacks them vertically onto one HTML5 Canvas, centring any narrower pages. The result is exported as a single continuous JPG — one file, read top to bottom, like a contact sheet of your whole document.",
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
        title: "Render and stack the pages",
        description:
          "Click convert. Each page is rendered at double scale onto its own canvas, then composited one below the next onto a single tall canvas with a white background.",
      },
      {
        title: "Download the JPG",
        description:
          "The stacked canvas is encoded to JPG at 90% quality and offered as one image file, named after your original document.",
      },
    ],
  },
  benefits: {
    heading: "Why Use Our PDF to JPG Converter",
    items: [
      {
        icon: ShieldCheck,
        title: "Your document stays put",
        description:
          "Rendering happens on your device. The PDF itself is never uploaded, transmitted, or stored anywhere by us.",
      },
      {
        icon: Layers,
        title: "One file, not a folder",
        description:
          "Every page is composited into a single continuous JPG. Nothing to unzip, and nothing to reassemble in the right order at the other end.",
      },
      {
        icon: Download,
        title: "Rendered at 2x scale",
        description:
          "Pages are rasterised at double their nominal size before encoding, so body text stays legible when the image is viewed or printed.",
      },
      {
        icon: Zap,
        title: "Layout preserved exactly",
        description:
          "pdf.js paints the real vector and font data rather than screenshotting, so spacing, kerning, and graphics match the source document.",
      },
      {
        icon: Cloud,
        title: "White matte, no alpha",
        description:
          "The canvas is filled white before painting, so transparent regions become solid rather than the black JPG normally produces.",
      },
      {
        icon: Smartphone,
        title: "Best for short documents",
        description:
          "Because the output is one tall image held in memory, this suits flyers, invoices, and short reports far better than long reports.",
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
      "Your file itself never leaves your device. The Mozilla pdf.js library runs inside your browser, interpreting the PDF's internal structure and painting it onto an HTML5 canvas element, which is then encoded to JPG. At no point is the document, or any part of it, sent anywhere.",
      "One transparency note, in the interest of being accurate rather than absolute: pdf.js relies on a separate worker script, and this page loads that script from the jsDelivr public CDN. That is a request for program code only — it never carries your document — but it does mean your browser contacts jsDelivr, which can see your IP address like any website request. Your PDF and the resulting image stay in your computer's RAM throughout, and closing the tab clears them.",
    ],
  },
  faqs: [
    {
      question: "Are the generated JPGs high quality?",
      answer:
        "Pages are rendered at 2x their nominal size and the final image is encoded at 90% JPG quality. That combination keeps body text crisp and embedded graphics sharp for on-screen sharing and everyday printing. JPG is a lossy format, so it remains a better fit for sharing than for archival masters.",
    },
    {
      question: "Do I get one image per page, or one image in total?",
      answer:
        "One image in total. Every page is rendered and then stacked vertically into a single tall JPG, so a ten-page PDF produces one image roughly ten pages tall rather than ten separate files. If you need each page as its own file, crop the result or split the PDF first and convert each part separately.",
    },
    {
      question: "Can I convert just one specific page?",
      answer:
        "Not directly — the tool always renders the whole document into one stacked image. To isolate a single page, use our Split PDF tool to extract that page first, then run the resulting one-page PDF through this converter.",
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
      question: "Is there a limit on how many pages I can convert?",
      answer:
        "The tool imposes no page limit itself, but the design has a practical ceiling worth knowing about. Because every page is stacked onto one canvas, the image grows taller with each page, and browsers cap how large a single canvas may be. Past that point the conversion fails or produces a blank image rather than warning you. The exact threshold depends on your browser, device, and page size — mobile browsers cap far lower than desktop ones — so this tool is best suited to short documents. For long ones, split the PDF first.",
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
    {
      name: "Split PDF",
      href: "/split-pdf",
      description: "Extract single pages first",
      icon: Scissors,
      accent: "from-pink-500 to-rose-500",
    },
    {
      name: "Compress Image",
      href: "/compress-image",
      description: "Shrink the resulting JPG",
      icon: Minimize2,
      accent: "from-emerald-500 to-teal-500",
    },
  ],
  relatedArticleSlugs: ["jpg-vs-png-guide", "browser-pdf-converter-privacy"],
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
