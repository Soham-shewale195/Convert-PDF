import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Convert PDF" },
      { name: "description", content: "Privacy Policy for Convert PDF. Learn how we protect your data with our private, browser-based document conversion." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Privacy-First Approach</h2>
      <p>At Convert PDF, privacy is our core principle. Unlike traditional conversion services, our tool operates entirely within your web browser. Your files are never uploaded to our servers, stored in any database, or shared with any third party.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Information Collection</h2>
      <p>We do not collect, store, or process any personal documents. The files you convert remain strictly on your local device. We may collect minimal, anonymized analytics (such as page views or conversion success rates) to improve our service, but this data cannot be linked to you or your documents.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Local Processing</h2>
      <p>All text extraction, image processing, and PDF generation occur locally using your device's processing power via WebAssembly and modern browser APIs. Once you close the tab, all temporary data is instantly erased from your device's memory.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Third-Party Services</h2>
      <p>We may use third-party analytics and advertising partners to support the free nature of our service. These partners may use cookies to provide relevant content and measure performance. Please see our Cookie Policy for more details.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Changes to This Policy</h2>
      <p>We reserve the right to update this privacy policy at any time. Any changes will be reflected on this page with an updated revision date. By continuing to use Convert PDF, you agree to the revised policy.</p>
    </PageLayout>
  );
}
