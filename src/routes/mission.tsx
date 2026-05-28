import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Mission — Convert PDF" },
      { name: "description", content: "Our mission to democratize document tools while maintaining absolute privacy and security." },
    ],
  }),
  component: Mission,
});

function Mission() {
  return (
    <PageLayout title="Our Mission">
      <p className="text-xl mb-8 font-medium text-foreground">Our mission is to democratize document processing by making premium tools free, fast, and fundamentally private.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">The Privacy Problem</h2>
      <p>For years, the standard approach to online document conversion has been to force users to upload their files to a remote server. This model is inherently flawed. It exposes sensitive personal, legal, and business documents to unnecessary risks. Why should you hand over your data just to convert a PDF to Word?</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">A Local Future</h2>
      <p>We believe the future of web applications is local. With the advent of WebAssembly and modern browser APIs, we can bring desktop-level computing power directly to your browser tab. Our mission is to harness this technology to build a suite of tools that respect your privacy by default.</p>
      
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Accessible to Everyone</h2>
      <p>Premium document tools are often hidden behind expensive subscription paywalls. We believe that basic document utilities should be accessible to everyone, regardless of their budget. By processing files on your device rather than our servers, we keep our infrastructure costs extremely low, allowing us to offer high-quality tools for free.</p>
    </PageLayout>
  );
}
