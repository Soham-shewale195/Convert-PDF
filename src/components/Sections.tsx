import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Cloud,
  Award,
  Upload,
  Wand2,
  Download,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export function Features() {
  const items = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Conversions happen in seconds, right in your browser.",
    },
    {
      icon: ShieldCheck,
      title: "Private by Design",
      desc: "Files never leave your device. Zero server uploads.",
    },
    {
      icon: Sparkles,
      title: "High Quality",
      desc: "Preserves text layout and structure across pages.",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      desc: "Mobile, tablet, desktop — fully responsive.",
    },
    {
      icon: Cloud,
      title: "No Account Needed",
      desc: "Just drag, drop, and download. No signup required.",
    },
    {
      icon: Award,
      title: "No Watermarks",
      desc: "Clean output files, always. No hidden branding.",
    },
  ];
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to convert"
          sub="Built for speed, privacy, and beautiful output."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-14">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-5 sm:p-6 group hover:bg-white/[0.09] transition"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl btn-gradient flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition">
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1">{f.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: Upload, title: "Upload File", desc: "Drag and drop your PDF or Word file." },
    { icon: Wand2, title: "Convert", desc: "We process it instantly in your browser." },
    { icon: Download, title: "Download", desc: "Get your converted file — no waiting." },
  ];
  return (
    <section id="how" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="How it works"
          title="Three simple steps"
          sub="From upload to download in under a minute."
        />
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 sm:p-8 relative"
            >
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-gradient flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <s.icon className="w-7 h-7 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-primary" />
              <h3 className="font-semibold text-lg sm:text-xl mb-2">{s.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "Is file conversion secure?",
      a: "Yes. Convert PDF processes every file entirely in your browser. Your documents never touch our servers — what happens on your device, stays on your device.",
    },
    {
      q: "Are files deleted after upload?",
      a: "There is nothing to delete — files are never uploaded in the first place. Everything stays completely on your device.",
    },
    {
      q: "Is there a file size limit?",
      a: "Files under 25 MB download instantly for free. Files above 25 MB are not supported to ensure smooth performance on all devices including mobile.",
    },
    {
      q: "Does it support scanned PDFs?",
      a: "Currently Convert PDF works best with text-based PDFs. Scanned or image-only PDFs may produce limited results as OCR is not yet supported.",
    },
    {
      q: "Is the service free?",
      a: "Yes — Convert PDF is completely free to use. No account, no signup, no watermarks.",
    },
    {
      q: "Which file formats are supported?",
      a: "Currently we support PDF to Word (.docx) and Word (.docx) to PDF conversion, along with powerful image tools including JPG to PNG, PNG to JPG, compress, resize, rotate, watermark, and more.",
    },
    {
      q: "Do I need to create an account?",
      a: "No account needed at all. Just open the site, upload your file, convert, and download. It is that simple.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          sub="Everything you need to know."
        />
        <div className="mt-8 sm:mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left"
              >
                <span className="font-medium text-sm sm:text-base">{f.q}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm text-muted-foreground"
                >
                  {f.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto px-2 sm:px-0">
      <span className="inline-block px-3 py-1 rounded-full glass text-xs font-medium text-primary mb-3 sm:mb-4">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">{sub}</p>
    </div>
  );
}
