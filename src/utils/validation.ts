export async function validateMagicNumbers(
  file: File,
  expectedTypes: ("image" | "pdf" | "docx")[],
): Promise<boolean> {
  const slice = file.slice(0, 8);
  const buffer = await slice.arrayBuffer();
  const arr = new Uint8Array(buffer);

  const hex = Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
    .join("");

  const signatures = {
    pdf: ["25504446"], // %PDF
    jpeg: ["FFD8FF"], // JPEG
    png: ["89504E47"], // PNG
    webp: ["52494646"], // RIFF (starts at 0, WebP at 8 but checking first 4 is usually okay)
    // .docx is an OOXML package, i.e. a ZIP. "PK\x03\x04" is a populated
    // archive; the empty/spanned variants cannot hold a document.
    zip: ["504B0304"],
  };

  const isPdf = signatures.pdf.some((sig) => hex.startsWith(sig));
  const isDocx = signatures.zip.some((sig) => hex.startsWith(sig));
  const isImage =
    signatures.jpeg.some((sig) => hex.startsWith(sig)) ||
    signatures.png.some((sig) => hex.startsWith(sig)) ||
    signatures.webp.some((sig) => hex.startsWith(sig));

  for (const type of expectedTypes) {
    if (type === "pdf" && isPdf) return true;
    if (type === "image" && isImage) return true;
    if (type === "docx" && isDocx) return true;
  }

  return false;
}
