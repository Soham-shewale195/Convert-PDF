import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Convert PDF" },
      { name: "description", content: "Terms and conditions for using Convert PDF's browser-based document tools." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageLayout title="Terms & Conditions">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
      <p>By accessing and using Convert PDF, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Description of Service</h2>
      <p>Convert PDF provides browser-based document and image conversion tools. We do not provide guarantees regarding the absolute accuracy of the conversion output, especially for complex formatting, scanned documents, or proprietary fonts.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Fair Use & Restrictions</h2>
      <p>Our service is provided for personal and professional use. You agree not to reverse engineer, scrape, or programmatically abuse the platform. While the service handles processing locally on your device, we reserve the right to restrict access to users who abuse our infrastructure.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
      <p>You retain full ownership and copyright of any documents you process using Convert PDF. We make no claim of ownership over your files. The Convert PDF website, design, logo, and code are the intellectual property of Convert PDF.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Disclaimer of Warranties</h2>
      <p>The service is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted or error-free.</p>
    </PageLayout>
  );
}
