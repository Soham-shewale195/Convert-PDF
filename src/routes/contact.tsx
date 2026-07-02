import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { Mail, MessageSquare, Bug, Handshake } from "lucide-react";
import { ContactPageSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Convert PDF" },
      {
        name: "description",
        content:
          "Get in touch with the Convert PDF team for support, business inquiries, or bug reports.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageLayout title="Contact Us">
      <ContactPageSchema
        title="Contact Us"
        description="Get in touch with the Convert PDF team for support, business inquiries, or bug reports."
        urlPath="/contact"
      />
      <p className="text-lg mb-8 text-foreground">
        Have a question, feedback, or need support? We are here to help. Please review the
        categories below to direct your inquiry to the right place.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="glass rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">General Support</h3>
            <p className="text-sm mb-2 text-muted-foreground">
              For general inquiries, usage questions, or feedback about our tools.
            </p>
            <a
              href="mailto:converttpdf.contact@gmail.com"
              className="text-primary hover:text-primary-foreground transition font-medium"
            >
              converttpdf.contact@gmail.com
            </a>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0">
            <Handshake className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">Business & Advertising</h3>
            <p className="text-sm mb-2 text-muted-foreground">
              For business inquiries, including potential future advertising partnerships.
            </p>
            <a
              href="mailto:converttpdf.contact@gmail.com?subject=Business%20Inquiry"
              className="text-primary hover:text-primary-foreground transition font-medium"
            >
              converttpdf.contact@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 mb-12 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0">
          <Bug className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-2">Bug Reports</h3>
          <p className="text-sm mb-4 text-muted-foreground">
            If you encounter an issue while using a tool, please report it via email. Since all
            processing happens locally on your device, we cannot see what went wrong automatically.
            To help us reproduce and fix the bug, please include the following details in your
            message:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mb-4">
            <li>
              <strong>Browser name:</strong> (e.g., Chrome, Firefox, Safari)
            </li>
            <li>
              <strong>Browser version:</strong> (e.g., 120.0.6099)
            </li>
            <li>
              <strong>Operating system:</strong> (e.g., Windows 11, macOS Sonoma)
            </li>
            <li>
              <strong>Device type:</strong> (e.g., Desktop, Mobile, Tablet)
            </li>
            <li>
              <strong>Affected tool:</strong> (e.g., Compress PDF, Merge PDF)
            </li>
            <li>
              <strong>Steps to reproduce:</strong> (What did you do before the bug occurred?)
            </li>
            <li>
              <strong>Expected behaviour:</strong> (What did you expect to happen?)
            </li>
            <li>
              <strong>Actual behaviour:</strong> (What actually happened instead?)
            </li>
            <li>
              <strong>Screenshot:</strong> (If possible, please attach a screenshot of the error)
            </li>
          </ul>
          <a
            href="mailto:converttpdf.contact@gmail.com?subject=Bug%20Report"
            className="text-primary hover:text-primary-foreground transition font-medium"
          >
            Report a Bug
          </a>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Response Time</h2>
      <p className="mb-8 text-foreground">
        We are a small team dedicated to maintaining and improving ConvertPDF. While we read every
        message, we do not promise guaranteed support or immediate replies. We aim to respond to
        inquiries within 48–72 hours during standard business days.
      </p>

      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Helpful Links</h2>
      <p className="mb-4 text-foreground">
        Before reaching out, you might find the answer you are looking for in our existing
        documentation. We cover common questions about file size limits, supported formats, and
        privacy across the site.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-foreground">
        <li>
          <a href="/#faq" className="text-primary hover:underline">
            Frequently Asked Questions (FAQ)
          </a>
        </li>
        <li>
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
        </li>
        <li>
          <a href="/#pdf-tools" className="text-primary hover:underline">
            Explore PDF Tools
          </a>
        </li>
        <li>
          <a href="/#image-tools" className="text-primary hover:underline">
            Explore Image Tools
          </a>
        </li>
      </ul>
    </PageLayout>
  );
}
