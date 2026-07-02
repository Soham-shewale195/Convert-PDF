import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

/**
 * Injects secure HTTP headers into every response.
 * Creates a new Response to avoid mutating potentially frozen Cloudflare headers.
 *
 * CSP is intentionally omitted — it would break Radix UI inline styles,
 * Framer Motion animations, and future ad-network scripts.
 */
function addSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-XSS-Protection", "1; mode=block");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const SITEMAP_URLS: { loc: string; changefreq: string; priority: string }[] = [
  { loc: "https://converttpdf.com/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://converttpdf.com/about", changefreq: "monthly", priority: "0.8" },
  { loc: "https://converttpdf.com/contact", changefreq: "monthly", priority: "0.8" },
  { loc: "https://converttpdf.com/how-it-works", changefreq: "monthly", priority: "0.8" },
  { loc: "https://converttpdf.com/mission", changefreq: "monthly", priority: "0.8" },
  { loc: "https://converttpdf.com/privacy", changefreq: "monthly", priority: "0.5" },
  { loc: "https://converttpdf.com/terms", changefreq: "monthly", priority: "0.5" },
  { loc: "https://converttpdf.com/disclaimer", changefreq: "monthly", priority: "0.5" },
  { loc: "https://converttpdf.com/cookie", changefreq: "monthly", priority: "0.5" },
  { loc: "https://converttpdf.com/merge-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/split-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/compress-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/pdf-to-jpg", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/jpg-to-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/text-to-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/excel-to-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/rotate-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/watermark-pdf", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/jpg-to-png", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/png-to-jpg", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/webp-to-jpg", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/resize-image", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/compress-image", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/crop-image", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/rotate-image", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/watermark-image", changefreq: "monthly", priority: "0.9" },
  { loc: "https://converttpdf.com/blog", changefreq: "weekly", priority: "0.8" },
  {
    loc: "https://converttpdf.com/blog/how-to-convert-pdf-to-word",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/compress-pdf-without-losing-quality",
    changefreq: "monthly",
    priority: "0.8",
  },
  { loc: "https://converttpdf.com/blog/jpg-vs-png-guide", changefreq: "monthly", priority: "0.8" },
  {
    loc: "https://converttpdf.com/blog/browser-pdf-converter-privacy",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/best-free-pdf-tools",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-merge-pdf-files-online",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-split-pdf-pages",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/excel-to-pdf-formatting-guide",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/webp-vs-jpg-vs-png",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-rotate-pdf-pages",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-resize-images-social-media",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/pdf-vs-word-differences",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/risks-of-online-file-converters",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-convert-webp-to-jpg",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-watermark-pdf-documents",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/image-aspect-ratio-cropping-guide",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-watermark-photos-online",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/what-is-client-side-processing",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/text-to-pdf-converter-guide",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-convert-images-to-pdf",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/how-to-check-pdf-converter-safety",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/digital-document-workflow-students",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/freelance-contract-management-free",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/why-compress-pdfs-for-email",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/batch-image-processing-guide",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: "https://converttpdf.com/blog/browser-tech-replacing-desktop-apps",
    changefreq: "monthly",
    priority: "0.8",
  },
];

// Generate sitemap XML at request time so Date reflects the real clock.
// Cloudflare Workers returns epoch (1970-01-01) for new Date() at module top-level.
function buildSitemapXml(): string {
  const today = new Date().toISOString().split("T")[0];
  const entries = SITEMAP_URLS.map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://converttpdf.com/sitemap.xml
`;

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // Serve robots.txt directly — bypass TanStack Start for this static resource
    if (url.pathname === "/robots.txt") {
      return addSecurityHeaders(
        new Response(ROBOTS_TXT, {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        }),
      );
    }

    // Serve sitemap.xml directly — bypass TanStack Start for this static resource
    if (url.pathname === "/sitemap.xml") {
      return addSecurityHeaders(
        new Response(buildSitemapXml(), {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        }),
      );
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return addSecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      return addSecurityHeaders(brandedErrorResponse());
    }
  },
};
