import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Convert PDF" },
      { name: "description", content: "Legal disclaimer regarding the use and limitations of Convert PDF's services." },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <PageLayout title="Disclaimer">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">No Professional Advice</h2>
      <p>The information and tools provided by Convert PDF are for general informational and utility purposes only. While we strive to provide high-quality document conversion, we do not guarantee that the converted documents will perfectly mirror the original layout, formatting, or contents. You should manually verify any critical documents, especially legal, medical, or financial records.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Limitation of Liability</h2>
      <p>In no event shall Convert PDF or its creators be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use of the service. This includes, but is not limited to, data loss, document corruption, or business interruption.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">"As-Is" Software</h2>
      <p>Our tools are provided on an "as is" basis. Since the processing happens within your web browser, performance and output quality may vary depending on your device's hardware, browser version, and the complexity of the original file.</p>
    </PageLayout>
  );
}
