<div align="center">
  <h1>✨ Convert PDF</h1>
  <p><strong>Fast, secure, and high-quality document conversion that runs entirely in your browser.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
    <img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
    <img src="https://img.shields.io/badge/react-19.2.0-61dafb.svg" alt="React">
    <img src="https://img.shields.io/badge/vite-7.3.1-646cff.svg" alt="Vite">
  </p>
</div>

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [System Architecture Overview](#-system-architecture-overview)
- [Complete Folder & File Structure](#-complete-folder--file-structure)
- [Data Flow & Request Lifecycle](#-data-flow--request-lifecycle)
- [Module & Component Breakdown](#-module--component-breakdown)
- [Database Design & Schema](#-database-design--schema)
- [Third-Party Integrations](#-third-party-integrations--external-services)
- [Installation & Setup](#-installation--setup)
- [How to Run](#-how-to-run)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Testing](#-testing)
- [Screenshots / Demo](#-screenshots--demo)
- [Known Issues / Limitations](#-known-issues--limitations)
- [Future Improvements / Roadmap](#-future-improvements--roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author / Contact](#-author--contact)

---

## 🚀 Project Overview

**Convert PDF** is a premium, client-side web application built for converting and manipulating documents and images without ever uploading them to a server. 

### The Problem It Solves:
Traditional document converters require users to upload sensitive files to remote servers, risking data privacy and consuming high bandwidth. Convert PDF solves this by bringing the conversion engine directly into the user's browser using WebAssembly and native web APIs.

### Target Audience:
- Professionals working with sensitive or confidential documents.
- Students and casual users looking for quick, free conversions.
- Anyone who needs to bypass strict corporate firewalls that block uploading to third-party sites.

### Key Highlights:
- **100% Client-Side:** Files never leave your device. All processing happens in-memory.
- **Lightning Fast:** Powered by WebAssembly and local hardware.
- **Rich Toolkit:** PDF ↔ Word conversion, PDF manipulation (merge, split, rotate), and comprehensive Image Tools (crop, resize, convert).
- **Glassmorphism UI:** Stunning, responsive, and modern aesthetic powered by Tailwind CSS v4 and Framer Motion.
- **Fair Monetization:** Free instant downloads for small files (< 10 MB); requires a short rewarded ad for medium files (10 MB - 25 MB).

---

## 💻 Tech Stack

### Frontend
- **Framework:** React `19.2.0`
- **Build Tool:** Vite `7.3.1`
- **Routing:** `@tanstack/react-router` `1.168.25` & `@tanstack/react-start` (for SSR routing structure)
- **Styling:** Tailwind CSS `4.2.1`, `tw-animate-css`
- **UI Components:** Radix UI primitives (`@radix-ui/*`), `lucide-react` for icons
- **Animations:** Framer Motion `12.40.0`
- **Forms/Validation:** `react-hook-form`, `zod`
- **Notifications:** `sonner`

### Core Processing Libraries (In-Browser)
- **PDF Manipulation:** `pdf-lib`, `pdfjs-dist`
- **Word Conversion:** `docx`, `mammoth`
- **Image Processing:** `react-image-crop`
- **Archives & Data:** `jszip`, `xlsx`

### Backend / Database
- *None.* This is a completely serverless, client-side application. The included `server.ts` simply acts as an SSR/Cloudflare Worker entry point to serve the static frontend app.

---

## 🏗️ System Architecture Overview

Convert PDF utilizes a **Client-Side Monolithic Architecture** combined with an **Event-Driven UI layer**.

### Why this architecture?
Since privacy and speed are the top priorities, moving all business logic (document parsing, byte manipulation, and conversion) into the client browser eliminates server costs, removes bandwidth bottlenecks, and provides absolute data security guarantees.

### Architectural Diagram

```text
[ User Interface (React / Radix UI) ]
         │
         ▼
[ Event Handlers & Hooks (useRewardedDownload) ] ──▶ [ Monetization Ad Network ]
         │
         ▼
[ In-Browser Converters (WASM / JS) ]
 ├─ pdf-lib (Merge, Split, Rotate)
 ├─ mammoth (Word to HTML/PDF)
 ├─ docx (HTML to Word)
 └─ Canvas API (Image Processing)
         │
         ▼
[ Blob & Object URL Generation ]
         │
         ▼
[ Local File Download ]
```

**Layer Roles:**
1. **UI Layer:** Handles drag-and-drop, file selection, and visually renders progress using Framer Motion.
2. **Logic / Hook Layer:** Manages application state, validates files, handles file size thresholds, and orchestrates ad displays before downloads are unlocked.
3. **Processing Engine Layer:** Takes the raw `ArrayBuffer` of the uploaded file, applies the requested transformations using specialized libraries, and outputs a new binary string/Blob.
4. **Delivery Layer:** Generates a temporary `URL.createObjectURL` and triggers an automatic local browser download.

---

## 📂 Complete Folder & File Structure

```text
📁 src/
├── 📁 components/         → Reusable React UI components and layout sections
│   ├── 📁 ads/            → Monetization components and providers
│   │   ├── 📁 providers/  → Context providers for ad state (Banner, Rewarded)
│   │   ├── MonetizationBadges.tsx
│   │   ├── PremiumAd.tsx
│   │   └── RewardedAdModal.tsx
│   ├── 📁 ui/             → Radix-based atomic UI components (buttons, dialogs, etc.)
│   ├── Background.tsx     → Animated background component
│   ├── Converter.tsx      → Main PDF ↔ Word conversion engine UI
│   ├── ImageTools.tsx     → Wrapper for image conversion suite
│   ├── ImageToolsUI.tsx   → Core image manipulation UI and logic
│   ├── Navbar.tsx         → Top navigation bar with responsive mobile menu
│   ├── Sections.tsx       → Landing page sections (Features, FAQ, Footer)
│   └── Tools.tsx          → PDF manipulation tools grid (Merge, Split, etc.)
├── 📁 config/             → Global configurations
│   ├── ads.ts             → Ad network configuration
│   └── 📁 monetization/   → Threshold configs (e.g., max free file size)
├── 📁 hooks/              → Custom React Hooks
│   ├── use-mobile.tsx     → Hook for responsive design queries
│   └── 📁 monetization/
│       └── useRewardedDownload.tsx → Orchestrates ad display vs instant downloads
├── 📁 lib/                → Core utilities and helpers
│   ├── error-capture.ts   → Global error tracking setup
│   ├── error-page.ts      → Error boundary fallback UI
│   ├── image-utils.ts     → Canvas and base64 helper functions
│   └── utils.ts           → Tailwind class merging (`cn`)
├── 📁 routes/             → TanStack Router page definitions
│   ├── index.tsx          → Landing page and main application route
│   └── __root.tsx         → Root layout and router configuration
├── 📁 utils/              → Standalone logic functions
│   ├── validation.ts      → Magic number/mime type validation logic
│   └── 📁 monetization/   → Ad reward calculations
├── router.tsx             → Router initialization
├── routeTree.gen.ts       → Auto-generated routing tree
├── server.ts              → Cloudflare Workers SSR entry point
├── start.ts               → Development server entry
└── styles.css             → Global Tailwind styles, variables, and custom utilities
```

---

## 🔄 Data Flow & Request Lifecycle

**Scenario: User Converts a PDF to Word**
1. **File Selection:** User drops a PDF into the `<Converter />` component.
2. **Validation:** `validateMagicNumbers` checks the file's binary header to ensure it's a real PDF (not just a renamed `.exe`).
3. **Processing:** 
   - `pdfjs-dist` parses the PDF text.
   - `docx` library structures the extracted text into paragraphs and builds a valid `.docx` document in-memory.
4. **Threshold Check (`useRewardedDownload`):**
   - If file < 10 MB: Skips to step 6.
   - If file 10 MB - 25 MB: Halts process, mounts `<RewardedAdModal />`, and waits for the user to finish watching the ad.
   - If file > 25 MB: Rejects upload to prevent browser memory crashes.
5. **Ad Completion:** The ad provider resolves a promise, signaling the hook to proceed.
6. **Download:** The generated `.docx` Blob is converted to a URL. An invisible `<a>` tag is clicked programmatically, downloading the file to the user's hard drive.
7. **Cleanup:** React state is reset, and the user is redirected or shown a success card.

---

## 🧩 Module & Component Breakdown

### 1. `Converter.tsx`
- **Location:** `src/components/Converter.tsx`
- **Purpose:** Handles the primary two-way conversion between PDF and Word.
- **Key Functions:** Uses `FileReader` to read bytes, parses text out of PDFs, and generates Word documents using the `docx` library.
- **Dependencies:** Relies on `useRewardedDownload` for final file delivery.

### 2. `ImageToolsUI.tsx`
- **Location:** `src/components/ImageToolsUI.tsx`
- **Purpose:** Full suite of image manipulations.
- **Key Logic:** Utilizes the HTML5 Canvas API to perform resizing, format conversion (JPG ↔ PNG), and watermarking entirely locally.
- **Input/Output:** Takes an image `File`, outputs a modified `Blob`.

### 3. `Tools.tsx`
- **Location:** `src/components/Tools.tsx`
- **Purpose:** A dynamic grid of PDF-specific utilities (Merge, Split, Rotate, Compress).
- **Key Logic:** Acts as a router to render specific "Panels" based on user selection. Uses `pdf-lib` to splice and modify PDF buffers.

### 4. `useRewardedDownload.tsx`
- **Location:** `src/hooks/monetization/useRewardedDownload.tsx`
- **Purpose:** Monetization gatekeeper.
- **Logic:** Evaluates `file.size`. Intercepts the download action to mount a Radix UI Dialog containing the Ad logic if the size exceeds `adRequiredSizeMB` (10MB).

### 5. `Navbar.tsx` & `Sections.tsx`
- **Location:** `src/components/Navbar.tsx`, `src/components/Sections.tsx`
- **Purpose:** Presentational components handling the landing page layout, responsive glassmorphism menus, FAQs, and static copy.

---

## 🗄️ Database Design & Schema

**No Database Required.**
Convert PDF is a strictly stateless, client-side application. No user data, files, or conversion histories are saved. 
- *Why?* To guarantee 100% privacy and zero server overhead.

---

## 🔌 Third-Party Integrations & External Services

1. **Monetization Networks:**
   - Integrated via the `src/components/ads/` directory. Provides Banner and Rewarded Video APIs to monetize high-bandwidth conversions locally.
2. **WebAssembly Document Parsers:**
   - `pdfjs-dist`: Mozilla's robust PDF parsing engine.
   - `mammoth`: High-quality Word document (`.docx`) to HTML parsing.

---

## ⚙️ Setup & Usage

### Installation & Setup

**Prerequisites:**
- Node.js (v18 or newer recommended)
- npm or pnpm

**Step-by-step:**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/convert-pdf.git
   cd convert-pdf
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Variables (`.env`):
   Create a `.env` file in the root if you are setting up actual ad network IDs.
   ```env
   VITE_AD_NETWORK_ID=your_ad_network_id_here
   VITE_ENVIRONMENT=development
   ```

### How to Run

**Development Mode:**
Starts the Vite dev server with Hot Module Replacement (HMR).
```bash
npm run dev
```

**Production Mode:**
Compiles the application into static files optimized for deployment.
```bash
npm run build
npm run preview
```

---

## 📖 API Documentation

*N/A - Convert PDF operates without a backend API. All logic executes via native browser APIs (File API, Blob API, Canvas API).*

---

## 🛠️ Configuration

- **`vite.config.ts`**: Configures Vite with TanStack router plugins and Cloudflare workers compatibility.
- **`src/config/monetization/index.ts`**: Contains critical business rules, such as `adRequiredSizeMB = 10`, dictating when users are prompted to watch an ad.
- **`src/styles.css`**: Tailwind v4 configuration utilizing `@theme` directives to define the global color palette, glassmorphism utilities (`.glass-strong`, `.mobile-menu-glass`), and animations.

---

## 🧪 Testing

Currently, the project focuses on static analysis and formatting.

To run the linter:
```bash
npm run lint
```
To auto-format the code:
```bash
npm run format
```
*(Unit testing implementations using Vitest or Jest are planned for the roadmap).*

---

## 📸 Screenshots / Demo

*(Add screenshots here)*
- `<!-- Image 1: Main Landing Page showing the Hero section -->`
- `<!-- Image 2: The PDF to Word Converter in action -->`
- `<!-- Image 3: The Image Tools dashboard -->`

---

## ⚠️ Known Issues / Limitations

- **File Size Limits:** Files over 25 MB are blocked because browsers typically limit the amount of memory a single tab can allocate. Trying to parse massive PDFs in memory can crash mobile browsers.
- **Scanned PDFs:** The current converter relies on embedded text layers. It does not perform Optical Character Recognition (OCR), meaning image-only scanned PDFs will output as blank or image-filled Word documents.

---

## 🗺️ Future Improvements / Roadmap

- [ ] **WebAssembly OCR:** Integrate Tesseract.js to support scanned PDF conversion.
- [ ] **Batch Processing:** Allow selecting multiple files to process them sequentially.
- [ ] **Offline Mode (PWA):** Implement service workers so the app can be installed and run completely offline without an internet connection.
- [ ] **Unit Tests:** Add comprehensive testing for the binary parsing logic.

---

## 🤝 Contributing

We welcome contributions! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Commit Convention:** Please use standard conventional commits (e.g., `feat:`, `fix:`, `chore:`).

---

## 📄 License

This project is licensed under the MIT License.

---

## ✉️ Author / Contact

- **Author:** Soham Shewale
- **GitHub:** [https://github.com/sohamshewale](https://github.com/sohamshewale)
- **Email:** *(Add your email here)*

---
<div align="center">
  <sub>Built with ❤️ and WebAssembly.</sub>
</div>
