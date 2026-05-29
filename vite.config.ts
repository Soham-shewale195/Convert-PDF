// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      // Do not emit source maps in production — prevents exposing original source
      sourcemap: false,
      // Explicit esbuild minification (Vite's default, made explicit for clarity)
      minify: "esbuild",
      rollupOptions: {
        output: {
          // Obfuscate output filenames with content hashes
          chunkFileNames: "assets/[hash].js",
          assetFileNames: "assets/[hash][extname]",
        },
      },
    },
    esbuild: {
      // Remove debugger statements from production bundles
      drop: ["debugger"],
      // Strip debug-level console calls; console.error is intentionally preserved
      // for essential error handling in catch blocks across the application
      pure: [
        "console.log",
        "console.debug",
        "console.info",
        "console.warn",
      ],
    },
  },
});
