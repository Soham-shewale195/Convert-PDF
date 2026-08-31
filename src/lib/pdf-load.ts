import type { PDFDocument } from "pdf-lib";

/**
 * Shared, encryption-aware entry point for loading a PDF with pdf-lib.
 *
 * Every PDF tool must go through {@link loadPdf} rather than calling
 * `PDFDocument.load` directly. Two things have to happen together, and doing
 * only one of them is worse than doing neither:
 *
 * 1. Load with `ignoreEncryption: true`. Without it, pdf-lib throws a generic
 *    Error on *any* encrypted PDF, which call sites cannot distinguish from a
 *    corrupt file — so the user gets a misleading "try another PDF" message.
 *
 * 2. Reject the document if it turns out to be encrypted. pdf-lib does not
 *    decrypt: with `ignoreEncryption` it happily reads the still-encrypted
 *    streams and re-saves them with the /Encrypt dictionary intact, producing
 *    a file that no reader can open. Verified against both an owner-password
 *    -only PDF and a user-password PDF: the re-saved output fails to open with
 *    "No password given". Silently handing that to a user as a successful
 *    download would be worse than the error it replaced.
 *
 * `isEncrypted` is used for detection rather than catching pdf-lib's
 * EncryptedPDFError, because the thrown error does not survive `instanceof`
 * across the bundle boundary — it arrives as a plain Error.
 */

/** Discriminant that survives bundling and lazy-chunk boundaries. */
export const PDF_PASSWORD_PROTECTED = "PDF_PASSWORD_PROTECTED";

export class PasswordProtectedPdfError extends Error {
  readonly code = PDF_PASSWORD_PROTECTED;
  readonly fileName?: string;

  constructor(fileName?: string) {
    super(fileName ? `${fileName} is password-protected` : "PDF is password-protected");
    this.name = "PasswordProtectedPdfError";
    this.fileName = fileName;
  }
}

export function isPasswordProtectedPdfError(e: unknown): e is PasswordProtectedPdfError {
  return (
    typeof e === "object" && e !== null && (e as { code?: unknown }).code === PDF_PASSWORD_PROTECTED
  );
}

/**
 * Maps a caught error to a message for the user, replacing the generic
 * fallback with something specific and actionable when the cause is known.
 */
export function pdfErrorMessage(e: unknown, fallback: string): string {
  if (isPasswordProtectedPdfError(e)) {
    const subject = e.fileName ? `"${e.fileName}"` : "This PDF";
    return `${subject} is password-protected. Remove its password or security restrictions in your PDF software, then upload it again.`;
  }
  return fallback;
}

/**
 * Loads a PDF for editing, throwing {@link PasswordProtectedPdfError} when the
 * document is encrypted. Pass `fileName` when several files are being processed
 * so the error can name the one that failed.
 */
export async function loadPdf(
  data: ArrayBuffer | Uint8Array,
  fileName?: string,
): Promise<PDFDocument> {
  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.load(data, { ignoreEncryption: true });
  if (doc.isEncrypted) throw new PasswordProtectedPdfError(fileName);
  return doc;
}
