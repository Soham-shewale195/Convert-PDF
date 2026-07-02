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
            compromising data security. Our purpose is to provide users with a complete suite of
            professional-grade conversion and editing tools that run entirely inside their web
            browser.
          </p>
          <p>
            Unlike traditional cloud-based solutions that require you to upload your files to remote
            servers, ConvertPDF brings the processing power directly to your device. We believe that
            whether you are manipulating a personal tax return, a confidential legal contract, or
            simply cropping a photograph, you should not be forced to hand over your data to a third
            party. Our privacy-first architecture guarantees that your files never leave your
            device, offering unparalleled security and peace of mind.
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
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Why Trust ConvertPDF</h2>
          <p className="mb-4">
            Trust is earned through transparency and verifiable technology. We do not ask you to
            trust a privacy policy detailing how we handle your data on our servers; instead, we
            have designed a system where we never receive your data in the first place.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Files stay inside the browser:</strong> All modifications, compressions, and
              conversions happen in your device's memory.
            </li>
            <li>
              <strong>No server uploads:</strong> There is no backend server infrastructure
              receiving, processing, or temporarily storing your files.
            </li>
            <li>
              <strong>No account required:</strong> We do not ask for your email address, name, or
              payment details. You can use the tools anonymously.
            </li>
            <li>
              <strong>Modern browser technology:</strong> We use native Web APIs that sandbox the
              execution securely within your browser environment.
            </li>
            <li>
              <strong>Privacy-first architecture:</strong> The entire application is engineered from
              the ground up to guarantee local execution.
            </li>
          </ul>
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
              classes, or annotate worksheets before distributing them.
            </li>
            <li>
              <strong>Office Workers:</strong> Rotate scanned documents that were uploaded upside
              down, or quickly reformat reports for management without risking company data.
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
              <strong>React:</strong> The user interface is built using React, a popular JavaScript
              library that ensures a fast, responsive, and intuitive experience as you navigate
              between tools.
            </li>
            <li>
              <strong>TypeScript:</strong> The codebase is written in TypeScript to catch errors
              early and ensure the application remains stable and reliable during heavy document
              processing.
            </li>
            <li>
              <strong>pdf-lib:</strong> For PDF manipulation (such as merging, splitting, and
              rotating), we rely on <code>pdf-lib</code>. This powerful JavaScript library reads,
              modifies, and saves PDF documents entirely within the browser's memory.
            </li>
            <li>
              <strong>HTML5 Canvas API:</strong> Our image compression, resizing, cropping, and
              format conversion tools utilise the browser's native Canvas API. This allows for rapid
              pixel-level manipulation without needing external libraries or server rendering.
            </li>
            <li>
              <strong>Client-Side Processing:</strong> By utilizing modern Browser APIs (such as the
              File API and Web Workers), we read the binary data of your files locally, process them
              using your device's CPU, and trigger a local download once finished.
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
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Values</h2>
          <p className="mb-4">Everything we build is guided by five core principles:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Privacy:</strong> Your data is your own. We build tools that do not require
              you to surrender control of your documents.
            </li>
            <li>
              <strong>Simplicity:</strong> We design clean, straightforward interfaces that do
              exactly what you need without unnecessary complexity.
            </li>
            <li>
              <strong>Accessibility:</strong> High-quality tools should be free and available to
              anyone with a modern web browser.
            </li>
            <li>
              <strong>Performance:</strong> By processing locally, we eliminate upload times,
              resulting in instantaneous conversions limited only by your device's hardware.
            </li>
            <li>
              <strong>Transparency:</strong> We are honest about how our tools work, what
              technologies we use, and how we fund the project.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Learn More</h2>
          <p>
            To understand more about our overarching goals, read our{" "}
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
            <Link to="/compress-pdf" className="text-primary hover:underline">
              Compress PDF
            </Link>{" "}
            and{" "}
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
