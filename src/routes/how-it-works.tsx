import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { Upload, Wand2, Download } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Convert PDF" },
      { name: "description", content: "Learn the technology behind our private, in-browser document conversion process." },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <PageLayout title="How It Works">
      <p className="text-lg mb-8">Convert PDF uses cutting-edge browser technologies to process your files locally. Here is a breakdown of how the magic happens.</p>
      
      <div className="space-y-8 mt-10">
        <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center shrink-0">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">1. Select Your File</h3>
            <p className="text-muted-foreground">When you drag and drop a file into Convert PDF, it doesn't go anywhere. Instead of uploading the file to a remote server, your browser simply reads the file into its own local memory.</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center shrink-0">
            <Wand2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">2. Local Processing (WebAssembly)</h3>
            <p className="text-muted-foreground">This is where the magic happens. We use WebAssembly (Wasm) to run complex conversion algorithms directly inside your browser. Whether it's extracting text, rendering PDF pages, or compressing images, your device's CPU handles all the heavy lifting instantly.</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center shrink-0">
            <Download className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">3. Instant Download</h3>
            <p className="text-muted-foreground">Once the processing is complete, the browser immediately generates the output file and prompts a download. Because there are no servers involved, you don't have to wait for the file to be uploaded or downloaded across the internet.</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">Why is this better?</h2>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li><strong>Zero Data Breaches:</strong> Hackers cannot steal what is never stored.</li>
        <li><strong>Unlimited File Size (Theoretically):</strong> You are only limited by your device's RAM, not our server capacity.</li>
        <li><strong>Blazing Fast:</strong> By eliminating network latency, conversions happen as fast as your computer can process them.</li>
      </ul>
    </PageLayout>
  );
}
