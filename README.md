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

Traditional document converters require users to upload sensitive files to remote servers, risking data privacy and consuming high bandwidth. Convert PDF solves this by bringing the conversion engine directly into the user's browser using JavaScript processing libraries and native web APIs.

### Target Audience:

- Professionals working with sensitive or confidential documents.
- Students and casual users looking for quick, free conversions.
- Anyone who needs to bypass strict corporate firewalls that block uploading to third-party sites.

### Key Highlights:

- **100% Client-Side:** Files never leave your device. All processing happens in-memory.
- **Lightning Fast:** Powered by local hardware — no network round-trip.
- **Rich Toolkit:** PDF ↔ Word conversion, PDF manipulation (merge, split, rotate), and comprehensive Image Tools (crop, resize, convert).
- **Glassmorphism UI:** Stunning, responsive, and modern aesthetic powered by Tailwind CSS v4 and Framer Motion.
- **Monetization:** Ad-supported via Google AdSense Auto Ads. Downloads are never gated, delayed, or conditioned on ad interaction.

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

- _None._ This is a completely serverless, client-side application. The included `server.ts` simply acts as an SSR/Cloudflare Worker entry point to serve the static frontend app.

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
[ Event Handlers & Hooks (useRewardedDownload) ]
         │
         ▼
[ In-Browser Converters (JavaScript) ]
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
2. **Logic / Hook Layer:** Manages application state and validates files. Downloads are never gated on ad interaction.
3. **Processing Engine Layer:** Takes the raw `ArrayBuffer` of the uploaded file, applies the requested transformations using specialized libraries, and outputs a new binary string/Blob.
4. **Delivery Layer:** Generates a temporary `URL.createObjectURL` and triggers an automatic local browser download.

---

## 📂 Complete Folder & File Structure

```text
📁 src/
├── 📁 components/         → Reusable React UI components and layout sections
│   ├── 📁 ads/            → Monetization components and providers
│   │   ├── 📁 providers/  → Ad provider components (Banner, SponsoredCard)
│   │   └── MonetizationBadges.tsx
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
│   └── 📁 monetization/   → Monetization feature flags and size thresholds
├── 📁 hooks/              → Custom React Hooks
│   ├── use-mobile.tsx     → Hook for responsive design queries
│   └── 📁 monetization/
│       └── useRewardedDownload.tsx → Renders the download card and delivers the file
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
4. **Size Check (`<Converter />`):** Files over 25 MB are rejected up front to prevent browser memory crashes. There is no ad threshold and no download gate.
5. **Ready State (`useRewardedDownload`):** `prepareDownload` stores the finished Blob and renders the "Ready to Download" card.
6. **Download:** The generated `.docx` Blob is converted to a URL. An invisible `<a>` tag is clicked programmatically, downloading the file to the user's hard drive.
7. **Cleanup:** A success toast is shown and the user stays on the current page.

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
- **Purpose:** Download delivery. Despite the historical name, it gates nothing.
- **Logic:** `prepareDownload` stores the finished Blob and resolves immediately; `renderStatusCard` renders the "Ready to Download" card; `executeDownload` writes the file and shows a success toast, leaving the user on the current page. `renderModal` is retained as a no-op so callers need no changes.

### 5. `Navbar.tsx` & `Sections.tsx`

- **Location:** `src/components/Navbar.tsx`, `src/components/Sections.tsx`
- **Purpose:** Presentational components handling the landing page layout, responsive glassmorphism menus, FAQs, and static copy.

---

## 🗄️ Database Design & Schema

**No Database Required.**
Convert PDF is a strictly stateless, client-side application. No user data, files, or conversion histories are saved.

- _Why?_ To guarantee 100% privacy and zero server overhead.

---

## 🔌 Third-Party Integrations & External Services

1. **Monetization Networks:**
   - Google AdSense Auto Ads, loaded from a single script tag in `src/routes/__root.tsx`. No manual ad units, and no ad is tied to a download.
2. **JavaScript Document Parsers:**
   - `pdfjs-dist`: Mozilla's robust PDF parsing engine. Its worker is loaded from the jsDelivr CDN.
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

_N/A - Convert PDF operates without a backend API. All logic executes via native browser APIs (File API, Blob API, Canvas API)._

---

## 🛠️ Configuration

- **`vite.config.ts`**: Configures Vite with TanStack router plugins and Cloudflare workers compatibility.
- **`src/config/monetization/index.ts`**: Monetization flags and size thresholds. Only `warningSizeMB` (100) is read at runtime, to show a performance notice on large image files; the ad-threshold fields are legacy and unused.
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

_(Unit testing implementations using Vitest or Jest are planned for the roadmap)._

---

## 📸 Screenshots / Demo

_(Add screenshots here)_

- `<!-- Image 1: Main Landing Page showing the Hero section -->`
- `<!-- Image 2: The PDF to Word Converter in action -->`
- `<!-- Image 3: The Image Tools dashboard -->`

---

## ⚠️ Known Issues / Limitations

- **File Size Limits:** The PDF ↔ Word converter (`Converter.tsx`) blocks files over 25 MB, because browsers limit the memory a single tab can allocate and parsing massive PDFs in memory can crash mobile browsers. The dedicated tool pages do not enforce a fixed cap and are bounded by available device memory; image tools show a performance notice above 100 MB.
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
- **Email:** _(Add your email here)_

---

<div align="center">
  <sub>Built with ❤️ in the browser.</sub>
</div>
