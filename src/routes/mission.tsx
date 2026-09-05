import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/PageLayout";
import { AboutPageSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Mission — Convert PDF" },
      {
        name: "description",
        content:
          "Our mission to democratize document tools while maintaining absolute privacy and security through browser-based processing.",
      },
    ],
    links: [{ rel: "canonical", href: "https://converttpdf.com/mission" }],
  }),
  component: Mission,
});

function Mission() {
  return (
    <PageLayout title="Our Mission">
      <AboutPageSchema
        title="Our Mission"
        description="Our mission to democratize document tools while maintaining absolute privacy and security through browser-based processing."
        urlPath="/mission"
      />

      <div className="space-y-10 text-foreground leading-relaxed">
        <section>
          <p className="text-xl mb-4 font-medium text-foreground">
            Our mission is to democratize document processing by making premium tools free, fast,
            and fundamentally private.
          </p>
          <p>
            For years, the standard approach to online document conversion has been to force users
            to upload their files to a remote server. This model is inherently flawed. It exposes
            sensitive personal, legal, and business documents to unnecessary security risks. Why
            should you hand over your data to a third-party server just to convert a PDF to Word or
            to crop a photograph? ConvertPDF was created to provide a safer alternative.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Why Browser Processing Matters
          </h2>
          <p className="mb-4">
            We believe the future of web utilities is local. Browser processing matters because it
            shifts the computing paradigm. Instead of sending your private files across the internet
            to be processed by a machine you do not control, the processing instructions are sent to
            your browser. Your device then executes the task locally.
          </p>
          <p>
            This fundamental change in architecture means that your files never leave your computer,
            phone, or tablet. It eliminates the need for upload queues, temporary server storage,
            and the risk of data interception during transit. Browser processing guarantees that you
            maintain absolute control and ownership over your documents at all times.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Commitment</h2>
          <p className="mb-4">To achieve our mission, we hold ourselves to six core commitments:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Privacy by Default:</strong> We commit to maintaining a zero-upload
              architecture. We will never build features that require your files to be transmitted
              to our servers.
            </li>
            <li>
              <strong>Simplicity:</strong> We commit to clean, straightforward interfaces that do
              exactly what you need, without unnecessary complexity or a learning curve.
            </li>
            <li>
              <strong>Accessibility:</strong> We commit to designing user interfaces that are clean,
              intuitive, and usable by individuals of all technical skill levels across all modern
              devices.
            </li>
            <li>
              <strong>Performance:</strong> We commit to fast, local processing — by eliminating
              upload time, conversions are limited only by your device's own hardware.
            </li>
            <li>
              <strong>Free and Transparent Tools:</strong> We commit to keeping our core document
              utilities free of charge, and to being upfront about how the project is funded and how
              our tools work.
            </li>
            <li>
              <strong>Continuous Improvement:</strong> We commit to continually refining our
              algorithms, expanding our toolset, and improving performance based on real-world usage
              and feedback.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Responsible Resource Usage
          </h2>
          <p>
            Operating a traditional cloud-based conversion service requires running large arrays of
            servers 24 hours a day to process user files. Local browser processing can reduce
            reliance on server-side processing, which may reduce the computing resources required
            for document conversion. By utilizing the idle processing power of the device you
            already own, we bypass the need for extensive cloud infrastructure, resulting in a
            leaner, more efficient platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Explore ConvertPDF</h2>
          <p className="mb-4">
            The best way to understand our mission is to experience it firsthand. You can read more
            about the origins of the project and the technology behind it on our{" "}
            <Link to="/about" className="text-primary hover:underline">
              About
            </Link>{" "}
            page, or review the specifics of our data handling in our{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p>
            Try our secure{" "}
            <a href="/#tools" className="text-primary hover:underline">
              PDF Tools
            </a>
            , our{" "}
            <Link to="/word-to-pdf" className="text-primary hover:underline">
              PDF ↔ Word
            </Link>{" "}
            converter, and our{" "}
            <a href="/#image-tools" className="text-primary hover:underline">
              Image Tools
            </a>{" "}
            to see local processing in action. For deeper insights into browser technologies and
            document management, visit our{" "}
            <Link to="/blog" className="text-primary hover:underline">
              Blog
            </Link>
            .
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
