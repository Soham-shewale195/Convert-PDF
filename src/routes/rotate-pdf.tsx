import { createFileRoute } from "@tanstack/react-router";
import { RotateCw, Scissors, FileStack, Droplets } from "lucide-react";
import ToolPageLayout from "@/components/ToolPageLayout";
import RotatePdfPanel from "@/components/tools/RotatePdfPanel";
import ToolContentSections, { type ToolSection } from "@/components/ToolContentSections";
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

const rotateSteps = [
  {
    title: "Upload your PDF",
    description:
      "Select a single PDF, by dropping it in or browsing for it. The rotator takes one document per run and reads it straight into memory.",
  },
  {
    title: "Pick 90°, 180°, or 270°",
    description:
      "Three angle buttons appear below the file. All three turn the page clockwise: 90° is a quarter turn right, 180° is upside down, and 270° is a quarter turn left. Whichever you choose is applied to every page in the document.",
  },
  {
    title: "Rotate and download",
    description:
      'Click "Rotate pages". Each page\'s stored rotation value is read, your angle is added to it, and the result is saved as a new PDF named after the original with the angle appended — scan.pdf becomes scan-rotated-90.pdf.',
  },
];

const sections: ToolSection[] = [
  {
    kind: "prose",
    heading: "What PDF Rotation Actually Changes",
    paragraphs: [
      "Every page in a PDF carries a rotation attribute — a stored number telling any viewer which way up to display it. Rotating a page here rewrites that number. It does not redraw the page, re-encode any image, or move a single character of text.",
      "That distinction is what makes this operation completely lossless. The tool reads each page's current rotation with pdf-lib, adds your chosen angle, and writes the new value back. The content stream underneath is copied through untouched, so a rotated scan is byte-for-byte the same scan, and a rotated contract keeps its fonts, signature fields, and vector artwork exactly as they were. File size barely moves, because only a small attribute per page has changed.",
      "It also means the change is permanent in a way that rotating inside a PDF viewer is not. Most viewers let you spin the display temporarily, but discard that when you close the file. Writing the attribute into the document itself means it opens the right way up everywhere — in a browser, on a phone, at a print shop.",
    ],
  },
  {
    kind: "matrix",
    heading: "Where Each Page Ends Up",
    intro:
      "Your angle is added to whatever rotation the page already carries, rather than replacing it. That matters for documents where pages were saved at different angles — a scanner app, for instance, often stores some pages at 90° and others at 0°. Find the row for the page's current value to see where it lands:",
    columnHeadings: ["You pick 90°", "You pick 180°", "You pick 270°"],
    rows: [
      { label: "Page currently stored at 0°", cells: ["90°", "180°", "270°"] },
      { label: "Page currently stored at 90°", cells: ["180°", "270°", "0°"] },
      { label: "Page currently stored at 180°", cells: ["270°", "0°", "90°"] },
      { label: "Page currently stored at 270°", cells: ["0°", "90°", "180°"] },
    ],
  },
  {
    kind: "steps",
    heading: "Rotating a Document",
    steps: rotateSteps,
  },
  {
    kind: "decision",
    heading: "One Page, or the Whole Document?",
    intro:
      "This tool has a single mode: the angle you choose is applied to every page. If that is not what you need, here is the route to take:",
    branches: [
      {
        condition: "Every page is wrong in the same way — the whole scan came out sideways.",
        recommendation: "This tool handles it directly. Pick your angle and rotate.",
      },
      {
        condition: "Only one page, or a few pages, need turning.",
        recommendation:
          "Split the document into single pages first, rotate only the ones that need it, then reassemble them with Merge PDF.",
        href: "/split-pdf",
        linkLabel: "Split PDF",
      },
      {
        condition: "Pages were saved at a mix of different angles.",
        recommendation:
          "One pass cannot straighten all of them, because the same angle is added to each. Split the document, rotate each group separately, and merge the results with",
        href: "/merge-pdf",
        linkLabel: "Merge PDF",
      },
      {
        condition: "You are combining files from several sources.",
        recommendation:
          "Fix orientation before you combine, so the finished document reads consistently from the first page.",
        href: "/merge-pdf",
        linkLabel: "Merge PDF",
      },
    ],
  },
  {
    kind: "checklist",
    heading: "When Rotation Is the Fix",
    intro:
      "Orientation problems are among the most common things wrong with a PDF, and almost always come from how the file was produced:",
    items: [
      {
        label: "Straightening a phone or flatbed scan",
        description:
          "Scanning apps record orientation from however the paper or the phone was held. A batch scanned in landscape opens sideways on every device until the stored rotation is corrected.",
      },
      {
        label: "Making a document printable the right way up",
        description:
          "Print drivers honour the stored rotation. Fixing it before sending a job avoids a stack of sideways pages and a second trip through the printer.",
      },
      {
        label: "Standardising files from several sources",
        description:
          "When documents arrive from different people and systems, orientation is rarely consistent. Rotating each file before merging produces a combined document that reads straight through.",
      },
      {
        label: "Correcting an upside-down duplex scan",
        description:
          "Duplex scanners sometimes capture reverse sides at 180°. A single 180° pass over the affected file turns them back the right way up.",
      },
      {
        label: "Fixing a landscape export that should be portrait",
        description:
          "Spreadsheets and slide decks often export to PDF in landscape. Where the content itself is portrait, rotating corrects the presentation without touching the layout.",
      },
      {
        label: "Preparing pages for archiving",
        description:
          "Documents heading into long-term storage should open correctly without a viewer-side adjustment. Because the change is metadata only, it costs nothing in fidelity or file size.",
      },
    ],
  },
  {
    kind: "callout",
    heading: "Rotation Without Exposure",
    tone: "privacy",
    policyLink: true,
    paragraphs: [
      "Rotating a PDF here is a local operation from start to finish. Your browser reads the file with the File API, and pdf-lib parses the PDF structure in memory. For each page the tool reads the current angle with getRotation() and writes the new one with setRotation() — a metadata update that never touches page content. The corrected document is then serialised and offered as a download.",
      "Your document is never uploaded and no third-party service is involved at any stage. The pdf-lib library itself loads as a script file from this site the first time you use the tool, in the same way the rest of the page loads; from then on, rotating a document generates no network activity at all. Everything held in memory is released when you close the tab.",
    ],
  },
  {
    kind: "faq",
    heading: "Rotate PDF: Questions and Answers",
    faqs: [
      {
        question: "Does rotating reduce the quality of text or images?",
        answer:
          "No. Rotation in a PDF is a metadata operation — it tells the viewer which way to display the page without re-encoding anything. Text, images, and vector graphics come through byte-for-byte identical.",
      },
      {
        question: "Can I rotate just one page?",
        answer:
          "Not directly — the selected angle is applied to every page in the document. To turn a single page, split the PDF into individual pages first, rotate the one you need, then merge the pages back together.",
      },
      {
        question: "What does each angle option do?",
        answer:
          "All three turn the page clockwise. 90° is a quarter turn to the right, 180° flips it upside down, and 270° is a quarter turn to the left. Each value is added to the page's existing rotation rather than replacing it.",
      },
      {
        question: "Why is there no 0° or reset button?",
        answer:
          "Because rotation is cumulative, you return a page to upright by adding whatever completes a full circle. A page sitting at 90° needs a further 270° to reach 0°; a page at 180° needs another 180°. The table above maps every combination.",
      },
      {
        question: "Will the file size change?",
        answer:
          "Barely. Only a small rotation attribute on each page is rewritten, and the document is then re-saved. The actual content data is untouched, so any difference comes from re-serialising the file rather than from the rotation itself.",
      },
      {
        question: "How is this different from rotating in a PDF viewer?",
        answer:
          "Most viewers rotate the display temporarily and discard the change when the file closes. This writes the rotation into the document itself, so it opens correctly everywhere — other computers, phones, and print queues included.",
      },
      {
        question: "Does it work on scanned PDFs?",
        answer:
          "Yes, and this is the most common use for it. A scanned page is an embedded image, and the rotation attribute tells the viewer how to orient it. The tool behaves identically whether the PDF holds text, scanned images, or a mix.",
      },
      {
        question: "Can I rotate a password-protected PDF?",
        answer:
          "No. If the PDF requires a password to open, the tool cannot read its contents and rotation will not run. Unlock it in your usual PDF application, save an unprotected copy, and rotate that.",
      },
    ],
  },
  {
    kind: "toolLinks",
    heading: "Tools for Page-Level Work",
    tools: [
      {
        name: "Split PDF",
        href: "/split-pdf",
        description:
          "Break the document into single pages so you can rotate only the ones you need.",
        icon: Scissors,
        accent: "from-pink-500 to-rose-500",
      },
      {
        name: "Merge PDF",
        href: "/merge-pdf",
        description: "Reassemble pages after rotating them individually.",
        icon: FileStack,
        accent: "from-blue-500 to-cyan-500",
      },
      {
        name: "Watermark PDF",
        href: "/watermark-pdf",
        description: "Stamp a notice across the pages once they are the right way up.",
        icon: Droplets,
        accent: "from-cyan-500 to-blue-500",
      },
    ],
  },
  {
    kind: "articleLinks",
    heading: "More on Page Orientation",
    slugs: ["how-to-rotate-pdf-pages", "how-to-check-pdf-converter-safety"],
  },
];

const howToSteps = rotateSteps.map((s) => ({ name: s.title, text: s.description }));
const faqSection = sections.find((s) => s.kind === "faq");

function RotatePdfPage() {
  return (
    <>
      {faqSection?.kind === "faq" && <ToolFAQSchema faqs={faqSection.faqs} />}
      <HowToSchema name="How to Rotate PDF Pages Online" steps={howToSteps} />
      <ToolPageLayout
        title="Rotate PDF"
        description="Fix page orientation by rotating all pages 90°, 180°, or 270° — directly in your browser."
        icon={RotateCw}
        accent="from-amber-500 to-orange-500"
        contentSections={<ToolContentSections sections={sections} />}
      >
        <RotatePdfPanel />
      </ToolPageLayout>
    </>
  );
}
