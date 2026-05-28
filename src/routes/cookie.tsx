import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";

export const Route = createFileRoute("/cookie")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Convert PDF" },
      { name: "description", content: "Information on how Convert PDF uses cookies and local storage to improve your experience." },
    ],
  }),
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <PageLayout title="Cookie Policy">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What Are Cookies?</h2>
      <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you've been there before.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How We Use Cookies and Local Storage</h2>
      <p>Because Convert PDF processes your files locally, we heavily rely on your browser's Local Storage rather than traditional cookies to make the application function. We use local storage to:</p>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>Temporarily hold file fragments during the conversion process.</li>
        <li>Remember your UI preferences (like dark mode or selected tools).</li>
        <li>Keep track of conversion limits to ensure fair usage of the platform.</li>
      </ul>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Third-Party Cookies</h2>
      <p>We may use third-party services, such as Google Analytics or advertising networks, which may set their own cookies to analyze traffic patterns or serve personalized ads. These third parties have their own privacy and cookie policies which we do not control.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Managing Cookies</h2>
      <p>You can manage or disable cookies and local storage through your browser settings. However, please note that disabling local storage may cause our browser-based conversion tools to stop functioning correctly, as they require local memory to process files without uploading them.</p>
    </PageLayout>
  );
}
