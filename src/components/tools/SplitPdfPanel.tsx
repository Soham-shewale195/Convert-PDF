import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Layers, ListChecks } from "lucide-react";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";
import { loadPdf, pdfErrorMessage } from "@/lib/pdf-load";

type SplitMode = "all" | "custom";

/** An inclusive, 1-indexed run of pages that becomes one output PDF. */
interface PageGroup {
  start: number;
  end: number;
}

/**
 * Parses "1-3, 5, 8-10" into one group per comma-separated entry, so a range
 * stays a single document rather than exploding into separate pages. Only
 * syntax is checked here; bounds need the page count and are checked once the
 * document has loaded.
 */
function parsePageGroups(input: string): { groups: PageGroup[] } | { error: string } {
  const tokens = input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!tokens.length) return { error: "Enter the pages you want, for example 1-3, 5, 8-10." };

  const groups: PageGroup[] = [];
  const seen = new Set<string>();

  for (const token of tokens) {
    if (/^-\d+$/.test(token)) return { error: "Pages are numbered from 1." };

    const single = token.match(/^(\d+)$/);
    const range = token.match(/^(\d+)\s*-\s*(\d+)$/);

    let start: number, end: number;
    if (single) {
      start = end = Number(single[1]);
    } else if (range) {
      start = Number(range[1]);
      end = Number(range[2]);
    } else {
      return { error: `Couldn't read "${token}" — use page numbers like 1-3, 5, 8-10.` };
    }

    if (start < 1 || end < 1) return { error: "Pages are numbered from 1." };
    if (start > end)
      return { error: `Range "${token}" is backwards — did you mean ${end}-${start}?` };

    // Identical groups would collide on filename inside the zip, so drop repeats.
    const key = `${start}-${end}`;
    if (seen.has(key)) continue;
    seen.add(key);
    groups.push({ start, end });
  }

  return { groups };
}

/** page-5.pdf for a single page, pages-8-10.pdf for a run. Both 1-indexed. */
function groupFileName(g: PageGroup): string {
  return g.start === g.end ? `page-${g.start}.pdf` : `pages-${g.start}-${g.end}.pdf`;
}

const MODES: {
  id: SplitMode;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "all", name: "Every page", desc: "One PDF per page, for the whole document", icon: Layers },
  {
    id: "custom",
    name: "Custom pages",
    desc: "Choose exactly which pages to extract",
    icon: ListChecks,
  },
];

export default function SplitPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".pdf");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const [mode, setMode] = useState<SplitMode>("all");
  const [ranges, setRanges] = useState("");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Picking a new file after a finished run returns the panel to idle, so the
  // tool can be used again without reloading. Matches the image tool panels.
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    if (!files[0]) return;

    // Syntax is checked before any work starts so the panel never flashes
    // through the processing state just to reject the input.
    let groups: PageGroup[] | null = null;
    if (mode === "custom") {
      const parsed = parsePageGroups(ranges);
      if ("error" in parsed) return toast.error(parsed.error);
      groups = parsed.groups;
    }

    setState("processing");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const JSZip = (await import("jszip")).default;
      const src = await loadPdf(await files[0].arrayBuffer(), files[0].name);
      const zip = new JSZip();

      if (groups) {
        const total = src.getPageCount();
        const outOfRange = groups.find((g) => g.end > total);
        if (outOfRange) {
          setState("idle");
          return toast.error(
            `This PDF has ${total} page${total === 1 ? "" : "s"}, so page ${outOfRange.end} doesn't exist.`,
          );
        }

        for (const g of groups) {
          const doc = await PDFDocument.create();
          const indices: number[] = [];
          for (let n = g.start; n <= g.end; n++) indices.push(n - 1);
          const pages = await doc.copyPages(src, indices);
          pages.forEach((p) => doc.addPage(p));
          zip.file(groupFileName(g), await doc.save());
        }
      } else {
        for (let i = 0; i < src.getPageCount(); i++) {
          const doc = await PDFDocument.create();
          const [p] = await doc.copyPages(src, [i]);
          doc.addPage(p);
          zip.file(`page-${i + 1}.pdf`, await doc.save());
        }
      }

      const blob = await zip.generateAsync({ type: "blob" });
      await prepareDownload(blob, files[0].name.replace(/\.pdf$/i, "") + "-pages.zip");
      setState("success");
      toast.success(
        groups
          ? `Extracted ${groups.length} file${groups.length === 1 ? "" : "s"} successfully!`
          : "Split into pages successfully!",
      );
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error(pdfErrorMessage(e, "Split failed"));
    }
  };

  return (
    <>
      {state !== "processing" && Dropzone}
      {state !== "processing" && <FileList files={files} setFiles={setFiles} />}

      {state === "idle" && files.length > 0 && (
        <div className="mt-5 space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Split Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-primary"
                      : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span className="font-semibold text-sm">{m.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">{m.desc}</span>
                </button>
              );
            })}
          </div>

          {mode === "custom" && (
            <>
              <label className="block text-xs text-muted-foreground mt-4 mb-1.5">
                Pages to extract
              </label>
              <input
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                placeholder="e.g. 1-3, 5, 8-10"
                className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Each comma-separated group becomes one PDF — 1-3 gives a single three-page file,
                while 1,2,3 gives three separate files.
              </p>
            </>
          )}
        </div>
      )}

      {state === "idle" && (
        <ActionButton
          onClick={run}
          busy={false}
          disabled={!files.length || (mode === "custom" && !ranges.trim())}
        >
          {mode === "custom" ? "Extract pages" : "Split into pages"}
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
