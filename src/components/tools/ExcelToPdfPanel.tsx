import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRewardedDownload } from "@/hooks/monetization/useRewardedDownload";
import { useDropFiles, FileList, ActionButton, LoadingState } from "@/components/PdfToolsUI";

export default function ExcelToPdfPanel() {
  const { files, setFiles, Dropzone } = useDropFiles(false, ".xlsx,.xls,.csv");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");
  const { prepareDownload, renderStatusCard, renderModal } = useRewardedDownload();

  // Picking a new file after a finished run returns the panel to idle, so the
  // tool can be used again without reloading. Matches the image tool panels.
  useEffect(() => {
    if (files.length) setState("idle");
  }, [files]);

  const run = async () => {
    if (!files[0]) return;
    setState("processing");
    try {
      const XLSX = await import("xlsx");
      const { jsPDF } = await import("jspdf");
      const wb = XLSX.read(await files[0].arrayBuffer(), { type: "array" });
      const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
      const margin = 32;
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      let first = true;
      for (const name of wb.SheetNames) {
        const rows: any[][] = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
        if (!first) pdf.addPage();
        first = false;
        pdf.setFontSize(14);
        pdf.text(name, margin, margin);
        pdf.setFontSize(9);
        const cols = Math.max(1, ...rows.map((r) => r.length));
        const colW = (pageW - margin * 2) / cols;
        const lineH = 14;
        const cellPad = 4;
        let y = margin + 24;
        for (const row of rows) {
          // Wrap each cell to the column width so no content is lost
          const cells: string[][] = [];
          let maxLines = 1;
          for (let c = 0; c < cols; c++) {
            const v = row[c] == null ? "" : String(row[c]);
            const lines: string[] = v === "" ? [""] : pdf.splitTextToSize(v, colW - cellPad);
            cells.push(lines);
            if (lines.length > maxLines) maxLines = lines.length;
          }
          for (let c = 0; c < cols; c++) {
            for (let li = 0; li < cells[c].length; li++) {
              pdf.text(cells[c][li], margin + c * colW, y + li * lineH);
            }
          }
          y += maxLines * lineH;
          if (y > pageH - margin) {
            pdf.addPage();
            y = margin;
          }
        }
      }
      const rawBlob = pdf.output("blob");
      const blob = new Blob([rawBlob], { type: "application/pdf" });
      await prepareDownload(blob, files[0].name.replace(/\.(xlsx|xls|csv)$/i, "") + ".pdf");
      setState("success");
      toast.success("Converted");
    } catch (e) {
      console.error(e);
      setState("idle");
      toast.error("Failed");
    }
  };
  return (
    <>
      {state !== "processing" && Dropzone}
      {state !== "processing" && <FileList files={files} setFiles={setFiles} />}
      {state === "idle" && (
        <ActionButton onClick={run} busy={false} disabled={!files.length}>
          Convert to PDF
        </ActionButton>
      )}
      {state === "processing" && <LoadingState />}
      {state === "success" && renderStatusCard()}
      {renderModal()}
    </>
  );
}
