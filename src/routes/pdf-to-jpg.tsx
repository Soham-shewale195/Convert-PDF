import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon, FileImage, Scissors, Minimize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import PdfToJpgPanel from "@/components/tools/PdfToJpgPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
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

const convertSteps = [
  {
    title: "Upload one PDF",
    description:
      "Choose a PDF from your device or drop it onto the upload area. The converter handles a single document per pass, and the file is read into your browser's memory rather than sent anywhere.",
  },
  {
    title: "Render and stack",
    description:
      "Click convert. Every page is measured first so the tool knows how tall the finished image needs to be, then each page is painted onto its own canvas at double scale and composited one below the next onto a single tall canvas with a white background.",
  },
  {
    title: "Download one image",
    description:
      "The stacked canvas is encoded to JPG at 90% quality and offered as a single image file, named after your original document — report.pdf becomes report.jpg.",
  },
];

const sections: ToolSection[] = [
  {
    kind: "callout",
    heading: "Read This First: One Image, Not One Per Page",
    tone: "info",
    paragraphs: [
      "Most PDF-to-image converters hand you a folder or a ZIP with one file per page. This one does not. It renders every page and stacks them vertically into a single continuous JPG, so a ten-page PDF produces one image roughly ten pages tall — like a contact sheet you scroll top to bottom.",
      "That is a genuine advantage when you want one shareable file with nothing to unzip or reassemble. It is the wrong tool if you need page 4 on its own. In that case, split the PDF first and convert only the page you want.",
    ],
  },
  {
    kind: "prose",
    heading: "How the Conversion Works",
    paragraphs: [
      "Converting a PDF to JPG turns a page description into a flat grid of pixels. PDFs are excellent at preserving complex layouts across devices, but they are awkward to embed in an email body, upload to a social platform, or drop into a slide. An image goes anywhere.",
      "The rendering is done by pdf.js, Mozilla's PDF engine, running inside your browser. It reads the document's real vector and font data and paints it onto an HTML5 canvas rather than taking a screenshot, so spacing, kerning, and graphics match the source exactly. Each page is drawn at twice its nominal size — PDF pages are measured in points at 72 to the inch, so double scale works out to roughly 144 pixels per inch on a standard page.",
      "The tool then measures every page before compositing anything. The finished canvas is as wide as the widest page and as tall as all the pages added together. Pages narrower than that maximum are centred horizontally rather than pushed to one edge, so a mixed-size document still reads as a tidy column.",
    ],
  },
  {
    kind: "specTable",
    heading: "Output Specification",
    intro:
      "Every setting below is fixed — there are no options to adjust. This is exactly what you get:",
    columns: ["Property", "Value"],
    rows: [
      {
        label: "Files produced",
        value: "Exactly one JPG, regardless of how many pages the document has.",
      },
      {
        label: "Render scale",
        value: "2× the document's nominal size, roughly 144 pixels per inch for a standard page.",
        note: "Not adjustable, and not related to any DPI setting stored in the PDF.",
      },
      { label: "Encoding quality", value: "JPEG at 90% quality." },
      {
        label: "Image width",
        value: "Matches the widest page in the document, at 2× scale.",
      },
      {
        label: "Image height",
        value: "The sum of every page's height at 2× scale, stacked in document order.",
      },
      {
        label: "Background",
        value:
          "Filled solid white before painting, so transparent regions come through white rather than the black a JPG would otherwise produce.",
      },
      {
        label: "Narrow page alignment",
        value: "Centred horizontally within the full image width.",
      },
      {
        label: "Output filename",
        value:
          "Your original filename with the extension changed — invoice.pdf becomes invoice.jpg.",
      },
      {
        label: "Page selection",
        value: "None. The whole document is always rendered.",
      },
    ],
  },
  {
    kind: "steps",
    heading: "Converting a Document",
    steps: convertSteps,
  },
  {
    kind: "troubleshooting",
    heading: "When the Conversion Misbehaves",
    intro:
      "Nearly every failure here traces back to the single-canvas design. Because all pages share one image, the canvas grows with the page count until the browser refuses to allocate it.",
    items: [
      {
        problem: "The result is blank, or the conversion fails on a long document",
        cause:
          "Browsers cap how large a single canvas element may be, in both total pixel area and individual dimensions. Stacking pages makes the image taller with every page, and past the cap the browser returns an empty canvas instead of raising a clear error. Mobile browsers cap considerably lower than desktop ones.",
        fix: "Split the PDF into smaller chunks and convert each separately. There is no fixed page count that is safe — it depends on your browser, your device, and the page dimensions — so if a document fails, halve it and try again.",
      },
      {
        problem: "I only want one page, not the whole document",
        cause:
          "The converter always renders every page. There is no page picker and no range option.",
        fix: "Use the Split PDF tool to get that page as its own one-page PDF, then run it through this converter.",
      },
      {
        problem: "The image is enormous and slow to open",
        cause:
          "At 2× scale with 90% JPEG quality, a long or large-format document produces a very tall image with a correspondingly large file size.",
        fix: "Run the JPG through the Compress Image tool, or split the source PDF and convert it in sections.",
      },
      {
        problem: "Transparent areas turned white",
        cause:
          "JPEG has no alpha channel. The canvas is deliberately filled white before rendering, because an unfilled canvas would export those regions as black.",
        fix: "This is intentional and cannot be changed here. If you need transparency preserved, a PDF-to-PNG workflow is required instead.",
      },
      {
        problem: "The file will not open at all",
        cause:
          "PDFs that require a password to open cannot be decrypted by the browser, so pdf.js never gets readable page data.",
        fix: "Remove the open password in your PDF software first, then convert.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "Where a Stacked Image Works Well",
    intro:
      "The single-file output is the whole point of this tool. These are the situations it suits best:",
    items: [
      {
        label: "Posting a flyer or infographic to social media",
        description:
          "Instagram, Facebook, and most social feeds reject PDF uploads outright. A one or two page flyer converts cleanly to a single image that can be posted directly.",
      },
      {
        label: "Showing a document inside an email body",
        description:
          "An invitation or a one-page notice displays inline as an image, so recipients see it without downloading an attachment or trusting a PDF from an unknown sender.",
      },
      {
        label: "Dropping a page into a slide deck",
        description:
          "A short report or a certificate can be pasted straight into PowerPoint or Keynote as a picture, with the layout intact and no PDF embedding awkwardness.",
      },
      {
        label: "Generating a preview thumbnail",
        description:
          "Web pages that offer a PDF download often show a visual preview alongside it. A short document converts to exactly that in one step.",
      },
      {
        label: "Archiving a short document as a flat picture",
        description:
          "Where a document needs to be viewable on anything without a PDF reader — an old device, an image-only kiosk, a chat app — a flat JPG is the lowest common denominator.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Safe, Client-Side Rendering",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Your file itself never leaves your device. The pdf.js library runs inside your browser, interpreting the PDF's internal structure and painting it onto a canvas element, which is then encoded to JPG. At no point is the document, or any part of it, sent anywhere.",
      "One transparency note, in the interest of being accurate rather than absolute: pdf.js relies on a separate worker script, and this page loads that script from the jsDelivr public CDN. That is a request for program code only — it never carries your document — but it does mean your browser contacts jsDelivr, which can see your IP address like any website request. Your PDF and the resulting image stay in your computer's RAM throughout, and closing the tab clears them.",
    ],
  },
  {
    kind: "faq",
    heading: "PDF to JPG: Questions and Answers",
    faqs: [
      {
        question: "Do I get one image per page, or one image in total?",
        answer:
          "One image in total. Every page is rendered and stacked vertically into a single tall JPG, so a ten-page PDF produces one image roughly ten pages tall rather than ten separate files. To get a page on its own, split the PDF first and convert that page by itself.",
      },
      {
        question: "How high is the quality?",
        answer:
          "Pages are rendered at twice their nominal size and encoded at 90% JPEG quality. That combination keeps body text crisp and graphics sharp for on-screen sharing and everyday printing. JPEG is lossy by design, so it suits sharing better than archival masters.",
      },
      {
        question: "Can I change the resolution or the quality?",
        answer:
          "No. The 2× render scale and the 90% encoding quality are fixed, and there are no settings to adjust either. If the result is larger than you need, run it through the Compress Image tool afterwards.",
      },
      {
        question: "Is there a limit on how many pages I can convert?",
        answer:
          "The tool imposes no page limit, but the design has a practical ceiling. Because every page is stacked onto one canvas, the image grows taller with each page, and browsers cap how large a single canvas may be. Past that point the conversion fails or produces a blank image rather than warning you. The exact threshold depends on your browser, device, and page size, and mobile browsers cap far lower than desktop ones — so this tool suits short documents, and long ones should be split first.",
      },
      {
        question: "What happens to transparent backgrounds?",
        answer:
          "JPEG does not support transparency. The canvas is filled solid white before any page is painted, so transparent regions become white. Without that fill they would export as black.",
      },
      {
        question: "Will this extract the photos embedded in my PDF?",
        answer:
          "No. The tool renders each page as it appears — text, layout, and images flattened together into one picture. It does not reach into the document structure to pull out individual embedded images as separate files.",
      },
      {
        question: "What happens to pages of different sizes?",
        answer:
          "The finished image is as wide as the widest page. Any narrower page is centred horizontally within that width, with white on either side, so a document mixing portrait and landscape pages still stacks into a tidy column.",
      },
      {
        question: "Does it work with password-protected PDFs?",
        answer:
          "No. If the PDF requires a password to open, the browser cannot decrypt it and the conversion fails. Remove the password protection first.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Before and After Converting",
    tools: [
      {
        name: "Split PDF",
        href: "/split-pdf",
        description:
          "Run this first when you want a single page, or to break a long document into chunks the canvas can handle.",
        icon: Scissors,
        accent: "from-pink-500 to-rose-500",
      },
      {
        name: "Compress Image",
        href: "/compress-image",
        description:
          "Shrink the resulting JPG if the stacked image comes out larger than you need.",
        icon: Minimize2,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        name: "JPG to PDF",
        href: "/jpg-to-pdf",
        description: "The reverse trip — bundle images back into a PDF document.",
        icon: FileImage,
        accent: "from-amber-500 to-orange-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Background Reading",
    slugs: ["jpg-vs-png-guide", "browser-pdf-converter-privacy"],
  },
];

const howToSteps = convertSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function PdfToJpgPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert PDF to JPG Online" steps={howToSteps} />
      <ToolPageLayout
        title="PDF to JPG"
        description="Render every page at 2× scale and stack them into one tall JPG image."
        icon={ImageIcon}
        accent="from-violet-500 to-purple-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <PdfToJpgPanel />
      </ToolPageLayout>
    </>
  );
}
