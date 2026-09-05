import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { AboutPageSchema, OrganizationSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Convert PDF" },
      {
        name: "description",
        content:
          "Learn about Convert PDF, our privacy-first browser document conversion tools, and the technology behind them.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/about" }],
  }),
  component: AboutUs,
});

function AboutUs() {
  return (
    <PageLayout title="About Us">
      <AboutPageSchema
        title="About Us"
        description="Learn about Convert PDF, our privacy-first browser document conversion tools, and the technology behind them."
        urlPath="/about"
      />
      <OrganizationSchema />

      <div className="space-y-10 text-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Who We Are</h2>
          <p className="mb-4">
            ConvertPDF is a modern, privacy-first document utility platform designed to solve an
            everyday problem: processing PDF files and images safely and efficiently without
            compromising data security. We provide a complete suite of professional-grade conversion
            and editing tools that run entirely inside your web browser.
          </p>
          <p>
            Unlike traditional cloud-based solutions that require you to upload your files to remote
            servers, ConvertPDF brings the processing power directly to your device. There's no
            account to create and no personal information to hand over — just open a tool and use
            it. Whether you are converting a PDF to an editable Word document, merging sensitive
            contracts, or cropping a photo, your files never leave your device. For the reasoning
            behind that choice and the commitments it comes with, see our{" "}
            <Link to="/mission" className="text-primary hover:underline">
              Mission
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Story</h2>
          <p className="mb-4">
            The project was created out of a fundamental frustration with the state of online
            document tools. When the developers needed to merge several sensitive PDFs, they found
            that almost every free online service required uploading the documents to a remote
            server. This felt inherently wrong. Why should users expose their private information
            just to perform a simple file operation?
          </p>
          <p className="mb-4">
            We recognised that modern web browsers had evolved significantly over the years, gaining
            access to powerful APIs and client-side processing capabilities that were previously
            restricted to desktop software. By leveraging these modern browser capabilities, we
            realised it was possible to build a full suite of document tools that process files
            locally.
          </p>
          <p>
            Browser-based document conversion is important because it fundamentally shifts the
            balance of control back to the user. You retain ownership of your data at all times.
            ConvertPDF was launched to prove that powerful, reliable, and high-quality document
            manipulation does not require a sacrifice in privacy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Who Should Use ConvertPDF</h2>
          <p className="mb-4">
            Our tools are designed to be accessible to anyone handling digital documents, regardless
            of their technical expertise. The platform benefits a wide variety of users with
            realistic, everyday use cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Students:</strong> Combine assignments into a single file using{" "}
              <Link to="/merge-pdf" className="text-primary hover:underline">
                Merge PDF
              </Link>
              , or compress large presentations before submitting them to learning portals.
            </li>
            <li>
              <strong>Teachers:</strong> Extract specific chapters from textbooks to share with
              classes, or convert scanned handouts to editable Word files with{" "}
              <Link to="/word-to-pdf" className="text-primary hover:underline">
                PDF ↔ Word
              </Link>{" "}
              conversion.
            </li>
            <li>
              <strong>Office Workers:</strong> Rotate scanned documents that were uploaded upside
              down, turn a PDF report back into an editable Word document, or reformat files for
              management without risking company data.
            </li>
            <li>
              <strong>Businesses:</strong> Protect sensitive financial statements, client contracts,
              and NDAs by ensuring they are processed strictly on local machines rather than
              uploaded to unknown cloud services.
            </li>
            <li>
              <strong>Freelancers:</strong> Watermark portfolios or compress heavy graphic invoices
              to send to clients via email.
            </li>
            <li>
              <strong>Developers and Designers:</strong> Quickly convert image assets between
              formats using our{" "}
              <a href="/#image-tools" className="text-primary hover:underline">
                Image Tools
              </a>{" "}
              without firing up heavy desktop editing software.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">The Technology We Use</h2>
          <p className="mb-4">
            We are fully transparent about how our tools work. ConvertPDF is built using a modern
            technology stack that prioritises client-side execution over server-side dependency.
            Here is a breakdown of the core technologies that power the platform:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>React and TypeScript:</strong> The interface is built with React for a fast,
              responsive experience, and the codebase is written in TypeScript to catch errors early
              and keep the application stable during heavy document processing.
            </li>
            <li>
              <strong>pdf-lib and pdf.js:</strong> For PDF manipulation — merging, splitting,
              rotating, watermarking — we rely on <code>pdf-lib</code>, which reads, modifies, and
              saves PDF documents entirely within the browser's memory. Rendering and text
              extraction, including our PDF ↔ Word tools, use Mozilla's <code>pdf.js</code>.
            </li>
            <li>
              <strong>mammoth and docx:</strong> Converting between Word and PDF uses{" "}
              <code>mammoth</code> to read .docx content and the <code>docx</code> library to
              generate Word-compatible output, all in-browser.
            </li>
            <li>
              <strong>HTML5 Canvas API:</strong> Our image compression, resizing, cropping, format
              conversion, and page-rendering tools use the browser's native Canvas API for
              pixel-level manipulation without external libraries or server rendering.
            </li>
            <li>
              <strong>Client-side file handling:</strong> We read the binary data of your files
              locally using standard Browser and File APIs, process them using your device's CPU,
              and trigger a local download once finished — no data is transmitted anywhere.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            How We Keep ConvertPDF Free
          </h2>
          <p className="mb-4">
            ConvertPDF is, and will remain, free to use. We believe that essential document
            utilities should be accessible to everyone, regardless of budget.
          </p>
          <p className="mb-4">
            To help cover the basic costs of hosting, domain maintenance, and ongoing future
            development, the website may display advertisements. This model allows us to offer
            premium-quality tools without locking them behind expensive subscription paywalls.
          </p>
          <p>
            However, our funding model will never compromise our core promise: regardless of how the
            site is funded, your files remain processed locally inside your browser and are never
            uploaded to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Learn More</h2>
          <p>
            To understand the values and commitments behind these tools, read our{" "}
            <Link to="/mission" className="text-primary hover:underline">
              Mission
            </Link>{" "}
            statement. If you want to dive deeper into how we protect your data, review our{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            . Have a question or need to report a bug? Visit our{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact
            </Link>{" "}
            page.
          </p>
          <p className="mt-4">
            You can also try our most popular tools like{" "}
            <Link to="/word-to-pdf" className="text-primary hover:underline">
              Word to PDF
            </Link>
            ,{" "}
            <Link to="/compress-pdf" className="text-primary hover:underline">
              Compress PDF
            </Link>
            , and{" "}
            <Link to="/merge-pdf" className="text-primary hover:underline">
              Merge PDF
            </Link>
            , or explore our{" "}
            <Link to="/blog" className="text-primary hover:underline">
              Blog
            </Link>{" "}
            for guides, tips, and deeper dives into document security.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
