import { createFileRoute } from "@tanstack/react-router";
import { FileImage, Image as ImageIcon, Minimize2, Maximize2 } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import JpgToPdfPanel from "@/components/tools/JpgToPdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
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

const buildSteps = [
  {
    title: "Select your images together",
    description:
      "Upload one or more JPG, JPEG, or PNG files. Select everything in a single go — choosing files again replaces the list rather than adding to it.",
  },
  {
    title: "Check the order in the list",
    description:
      "Your files appear as a numbered list with each name and size, and pages are written in exactly that order. You can remove anything you did not mean to include; to change the order, reselect the files in the sequence you want.",
  },
  {
    title: "Generate the document",
    description:
      'Click "Create PDF". Each image is embedded onto its own new page sized to that image, and the finished document downloads as images.pdf.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What Is JPG to PDF Conversion?",
    paragraphs: [
      "JPG to PDF conversion takes one or more standalone image files and wraps them into a single PDF document. Images are fine for viewing photos, but PDF is what application portals, HR departments, and print shops actually ask for — one file, in a fixed order, that opens the same way everywhere.",
      "This converter builds a new PDF from scratch with pdf-lib and makes one deliberate choice most converters do not: each page is created at the exact pixel dimensions of the image it holds, and the image is drawn to fill it corner to corner. Nothing is scaled to A4, nothing is letterboxed with white margins, and no pixel is resampled. The page simply is the photo.",
      "The trade-off is worth understanding before you convert. Because a PDF measures its pages in points at 72 to the inch, an image pixel becomes a point — so a 4000 × 3000 photo produces a page around 55 by 42 inches, with an effective resolution of 72 DPI. That is ideal for on-screen viewing and for portals that only care about content, and awkward if you need something that drops neatly onto A4 in a print queue.",
    ],
  },
  {
    kind: "steps",
    heading: "Building Your Document",
    variant: "timeline",
    steps: buildSteps,
  },
  {
    kind: "comparison",
    heading: "How This Differs From a Typical Converter",
    intro:
      "Most online image-to-PDF tools re-encode and re-lay-out your photos onto standard paper sizes. This one does not touch the pixels at all. Neither approach is universally better — they suit different jobs:",
    columns: ["This converter", "A typical A4-fitting converter"],
    rows: [
      {
        aspect: "Page size",
        a: "Exactly the image's pixel dimensions, so every page can differ.",
        b: "A fixed paper size such as A4 or Letter, identical on every page.",
      },
      {
        aspect: "Image data",
        a: "Embedded byte-for-byte, with no decoding or re-encoding step.",
        b: "Usually decoded and re-encoded, which can soften detail slightly.",
      },
      {
        aspect: "Margins",
        a: "None. The image fills the page edge to edge.",
        b: "White margins added around the image to fit the paper.",
      },
      {
        aspect: "Print readiness",
        a: "Not pre-formatted for paper; your printer will scale it to fit.",
        b: "Ready to print at the intended size without adjustment.",
      },
      {
        aspect: "Best suited to",
        a: "Portal uploads, portfolios, and archiving where fidelity matters most.",
        b: "Documents genuinely destined for a physical printer.",
      },
    ],
  },
  {
    kind: "definitions",
    heading: "What the Converter Does With Each File",
    intro:
      "Format handling is decided by the filename extension rather than by inspecting the file contents, which is worth knowing if your files have unusual names:",
    terms: [
      {
        term: "Files ending in .png",
        definition:
          "Embedded as PNG, with the alpha channel preserved. Transparent regions stay transparent in the PDF rather than being flattened onto white.",
      },
      {
        term: "Every other file",
        definition:
          "Attempted as JPEG. That covers .jpg and .jpeg correctly, and it means a PNG that has been renamed to .jpg will fail rather than convert.",
      },
      {
        term: "WebP, HEIC, GIF, BMP, and AVIF",
        definition:
          "Not supported. The file picker accepts any image type your device offers, but only JPEG and PNG can actually be embedded, so these report a generic error. Convert them to JPG or PNG first.",
      },
      {
        term: "One page per image, in list order",
        definition:
          "Each file becomes exactly one page, written in the order shown in the numbered list. There is no way to place two images on a single page.",
      },
      {
        term: "The finished file",
        definition:
          "Always downloads as images.pdf, regardless of what your source files were called. Rename it after saving if the name matters.",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "When Wrapping Images in a PDF Helps",
    intro:
      "Bundling images into one document solves a specific set of sharing and submission problems:",
    items: [
      {
        label: "Submitting scanned documents to a portal",
        description:
          "Government services, universities, and HR systems routinely accept PDF only. Photographing an ID, a certificate, or a signed form and wrapping it in a PDF meets the requirement without a scanner.",
      },
      {
        label: "Sending a batch of receipts as one file",
        description:
          "Rather than attaching twenty loose photos to an expense claim, combine them into a single ordered document that a finance team can page through.",
      },
      {
        label: "Assembling a portfolio",
        description:
          "Design mockups, photographs, or sketches become one professional document that opens in order, with each image at full resolution.",
      },
      {
        label: "Archiving a set of related photos",
        description:
          "A single PDF is easier to store, name, and open years later than a folder of loose image files, and it keeps the intended order attached to the content.",
      },
      {
        label: "When to reach for something else",
        description:
          "If the document must print at a specific paper size, this is not the right tool — pages come out at the images' pixel dimensions, not A4. And if the photos are very large, consider resizing or compressing them before converting, since nothing is downscaled on the way in.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Private Photo Processing",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Privacy matters most for exactly the files people convert here: passports, medical records, bank statements, signed contracts. The converter uses the File API to read your images straight into browser memory, and pdf-lib assembles the document in local JavaScript. Your photos are never uploaded, and no image data is transmitted anywhere.",
      "Because image bytes are embedded rather than re-encoded, the picture inside the PDF is the same data that was on your device — nothing passes through a rendering service or a remote optimiser. When you close the tab, both the source images and the generated document are released from memory.",
    ],
  },
  {
    kind: "faq",
    heading: "JPG to PDF: Questions and Answers",
    faqs: [
      {
        question: "Can I combine several images into one PDF?",
        answer:
          "Yes. Select multiple JPG or PNG files at once and each becomes its own page, in the order shown in the file list. Select them all in a single go, because a second selection replaces the list rather than adding to it.",
      },
      {
        question: "Will my images lose any quality?",
        answer:
          "No. The image bytes are embedded into the PDF exactly as they exist on your device, with no decoding, resampling, or re-encoding step. The photo inside the document is bit-for-bit the file you selected, and it is drawn at full size on a page created to match its pixel dimensions.",
      },
      {
        question: "What page size does the finished PDF use?",
        answer:
          "There is no fixed page size. Each page is created at exactly the pixel dimensions of its image, so a 4000 × 3000 photo produces a 4000 × 3000 page. Since a PDF point is 1/72 inch, that works out to roughly 55 by 42 inches at 72 DPI. There is no cropping, no white margin, and no distortion — but pages in a mixed batch will differ in size, and nothing is pre-formatted for A4 or Letter.",
      },
      {
        question: "Does it support PNG transparency?",
        answer:
          "Yes. Files ending in .png are embedded as PNG with their alpha channel intact, so transparent areas stay transparent in the PDF instead of being flattened onto a white background.",
      },
      {
        question: "Why did my WebP or HEIC image fail?",
        answer:
          "Only JPEG and PNG can be embedded. The file picker is permissive and lets you select any image type, but the tool decides how to handle a file from its extension — .png is treated as PNG and anything else is attempted as JPEG — so WebP, HEIC, GIF, and BMP fail with a generic error. Convert them to JPG or PNG first.",
      },
      {
        question: "Can I reorder the pages?",
        answer:
          "Not within the tool. The file list shows each file's position with a button to remove it, but it has no drag-to-reorder control. Pages follow the list order, so to change the sequence remove the files and reselect them in the order you want — naming them 01-, 02-, 03- first makes this predictable.",
      },
      {
        question: "Is there a limit on how many images I can add?",
        answer:
          "No limit is built in. Because pages are created at each image's full pixel dimensions and nothing is downscaled, the output grows quickly with high-resolution photos — a large batch straight from a modern camera can produce a very large PDF and put real pressure on browser memory. Smaller batches are more reliable on phones and older machines.",
      },
      {
        question: "How do I make the resulting PDF smaller?",
        answer:
          "Either shrink the images before converting with the Compress Image or Resize Image tools, or run the finished document through Compress PDF afterwards. Reducing the images first generally gives the better result, since it lowers the page dimensions too.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Useful Alongside This Tool",
    tools: [
      {
        name: "Compress Image",
        href: "/compress-image",
        description: "Shrink photos before converting so the finished PDF stays manageable.",
        icon: Minimize2,
        accent: "from-emerald-500 to-teal-500",
      },
      {
        name: "Resize Image",
        href: "/resize-image",
        description:
          "Set consistent pixel dimensions first, so every page in the PDF comes out the same size.",
        icon: Maximize2,
        accent: "from-rose-500 to-pink-500",
      },
      {
        name: "PDF to JPG",
        href: "/pdf-to-jpg",
        description: "The reverse trip — render a PDF back out as an image.",
        icon: ImageIcon,
        accent: "from-violet-500 to-purple-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "Related Guides",
    slugs: ["how-to-convert-images-to-pdf", "batch-image-processing-guide"],
  },
];

const howToSteps = buildSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function JpgToPdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Convert JPG to PDF Online" steps={howToSteps} />
      <ToolPageLayout
        title="JPG/PNG to PDF"
        description="Bundle images into a single PDF — one page per image, at full resolution."
        icon={FileImage}
        accent="from-amber-500 to-orange-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <JpgToPdfPanel />
      </ToolPageLayout>
    </>
  );
}
