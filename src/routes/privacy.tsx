import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { InfoPageSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Convert PDF" },
      { name: "description", content: "Read the Convert PDF Privacy Policy. Learn how our browser-based document processing keeps your files private, secure, and on your device." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <InfoPageSchema title="Privacy Policy" description="Read the Convert PDF Privacy Policy. Learn how our browser-based document processing keeps your files private, secure, and on your device." urlPath="/privacy" dateModified={new Date().toISOString().split('T')[0]} />
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Privacy-First Approach</h2>
      <p>At Convert PDF, privacy is our core principle. Unlike traditional conversion services, our tool operates entirely within your web browser. Your files are never uploaded to our servers, stored in any database, or shared with any third party.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Information Collection</h2>
      <p>We do not collect, store, or process any personal documents. The files you convert remain strictly on your local device. We may collect minimal, anonymized analytics (such as page views or conversion success rates) to improve our service, but this data cannot be linked to you or your documents.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Local Processing</h2>
      <p>All text extraction, image processing, and PDF generation occur locally using your device's processing power via WebAssembly and modern browser APIs. Once you close the tab, all temporary data is instantly erased from your device's memory.</p>

      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
      <p>Our service provides enhanced data security through its browser-based processing architecture. Because there are no document uploads and no document storage on external servers, the risk of data exposure is significantly reduced. Your files remain entirely on your device throughout the entire process.</p>

      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Analytics Information</h2>
      <p>We may use Google Analytics to help us understand how visitors use our website and to improve our service. The analytics data collected is completely anonymized. Information collected may include browser type, device type, country/region, pages visited, and session duration. We clearly state that no uploaded files are collected, no document content is collected, and no personal files are stored.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Advertising Disclosure</h2>
      <p>To support the continued development of this free tool, Convert PDF may use Google AdSense now or in the future. Our advertising providers may use cookies to serve ads based on your prior visits to our website or other websites. These ads may be personalized or non-personalized. Please note that advertising does not provide any access to your user files, and your user documents remain completely private and local.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Cookies Policy Summary</h2>
      <p>We may use cookies on our website for essential website functionality, analytics, performance monitoring, and advertising services. You have the ability to disable cookies through your browser settings, though please be aware that disabling cookies may affect some website functionality.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Third-Party Services</h2>
      <p>We may use third-party analytics and advertising partners to support the free nature of our service. These partners may use cookies to provide relevant content and measure performance. Please see our Cookie Policy for more details.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. User Rights</h2>
      <p>As a user of Convert PDF, you maintain control over your experience. You may choose to disable cookies in your browser, and you can stop using the service at any time. If you have questions about your rights or wish to request clarification regarding our privacy practices, you are welcome to contact us regarding any privacy questions.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Children's Privacy</h2>
      <p>Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and have concerns regarding your child's privacy in relation to our service, please contact us.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">11. Future Policy Changes</h2>
      <p>We reserve the right to update this privacy policy as our website evolves. Any changes will be reflected on this page, and the updated date will always be displayed at the top. By continuing to use Convert PDF, your continued use implies acceptance of these updates.</p>

      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">12. Contact Information</h2>
      <p>If you have any privacy inquiries, data questions, or general policy concerns, we welcome you to reach out. Please contact us regarding your privacy concerns at converttpdf.contact@gmail.com.</p>
    </PageLayout>
  );
}
