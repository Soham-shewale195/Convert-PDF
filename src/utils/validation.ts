export async function validateMagicNumbers(
  file: File,
  expectedTypes: ("image" | "pdf")[],
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
  };

  const isPdf = signatures.pdf.some((sig) => hex.startsWith(sig));
  const isImage =
    signatures.jpeg.some((sig) => hex.startsWith(sig)) ||
    signatures.png.some((sig) => hex.startsWith(sig)) ||
    signatures.webp.some((sig) => hex.startsWith(sig));

  for (const type of expectedTypes) {
    if (type === "pdf" && isPdf) return true;
    if (type === "image" && isImage) return true;
  }

  return false;
}
