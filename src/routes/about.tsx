import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { InfoPageSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Convert PDF" },
      { name: "description", content: "Learn about Convert PDF and our mission to provide secure, private document conversion tools." },
    ],
  }),
  component: AboutUs,
});

function AboutUs() {
  return (
    <PageLayout title="About Us">
      <InfoPageSchema title="About Us" description="Learn about Convert PDF and our mission to provide secure, private document conversion tools." urlPath="/about" />
      <p className="text-lg mb-6">Convert PDF was born out of a simple frustration: why do we have to upload our private, sensitive documents to random servers just to convert them to another format?</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Our Story</h2>
      <p>We started with a single goal: to create a powerful document conversion tool that respects user privacy. Traditional converters process files on the cloud, exposing sensitive data to potential breaches, slow upload times, and strict file size limits.</p>
      <p className="mt-4">By leveraging modern browser technologies like WebAssembly, we shifted the computing power from the cloud to your local device. The result is a lightning-fast, entirely private tool that anyone can use.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">What We Do</h2>
      <p>We build tools that make working with documents easier. From PDF to Word conversion to quick image edits, we provide premium-quality features completely free of charge, running entirely in your browser.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Why Choose Us?</h2>
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li><strong>Privacy First:</strong> Your files never leave your device.</li>
        <li><strong>Speed:</strong> No waiting for uploads or downloads. Processing is instant.</li>
        <li><strong>No Account Needed:</strong> We don't want your email. Just convert and go.</li>
        <li><strong>High Quality:</strong> We use industry-leading algorithms to ensure your formatting stays intact.</li>
      </ul>
    </PageLayout>
  );
}
