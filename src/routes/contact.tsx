import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { InfoPageSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Convert PDF" },
      { name: "description", content: "Get in touch with the Convert PDF team for support, feedback, or business inquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageLayout title="Contact Us">
      <InfoPageSchema title="Contact Us" description="Get in touch with the Convert PDF team for support, feedback, or business inquiries." urlPath="/contact" />
      <p className="text-lg mb-8">Have a question, feedback, or need support? We're here to help.</p>
      
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="glass rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Email Us</h3>
            <p className="text-sm mb-2">For general inquiries and support.</p>
            <a href="mailto:converttpdf.contact@gmail.com" className="text-primary hover:text-primary-foreground transition font-medium">converttpdf.contact@gmail.com</a>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Feedback</h3>
            <p className="text-sm mb-2">Have an idea to improve our tools?</p>
            <a href="#" className="text-primary hover:text-primary-foreground transition font-medium">Submit Feedback</a>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Frequently Asked Questions</h2>
      <p>Before reaching out, you might find the answer you're looking for on our <a href="/#faq" className="text-primary hover:underline">FAQ section</a>. We cover common questions about file size limits, supported formats, and privacy.</p>
    </PageLayout>
  );
}
