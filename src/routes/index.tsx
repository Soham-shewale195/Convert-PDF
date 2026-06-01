import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { FileText, FileType2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Converter, { type Mode } from "@/components/Converter";
import { Features, HowItWorks, Testimonials, FAQ, Footer } from "@/components/Sections";
import Tools from "@/components/Tools";
import ImageTools from "@/components/ImageTools";
import { BannerAdProvider } from "@/components/ads/providers/BannerAdProvider";
import { WebsiteSchema, OrganizationSchema } from "@/components/schema/Schema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Convert PDF — Convert PDF and Word Files Instantly" },
      { name: "description", content: "Fast, secure, browser-based PDF to Word and Word to PDF conversion. No uploads, no watermarks, no signup." },
      { property: "og:title", content: "Convert PDF — Premium PDF ↔ Word Converter" },
      { property: "og:description", content: "Convert PDF and Word files instantly, right in your browser." },
    ],
  }),
  component: Index,
});

function Index() {
  const [converterMode, setConverterMode] = useState<Mode>("pdf2word");

  const scrollToConverter = (mode: Mode) => {
    setConverterMode(mode);
    document.getElementById("converter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen">
      <WebsiteSchema />
      <OrganizationSchema />
      <Background />
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Premium document toolkit
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05]"
          >
            Convert <span className="gradient-text">PDF and Word</span><br className="hidden sm:block" /><span className="sm:hidden"> </span>files instantly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Fast, secure, and high-quality document conversion that runs entirely in your browser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button onClick={() => scrollToConverter("pdf2word")} className="btn-gradient px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium inline-flex items-center justify-center gap-2 text-sm sm:text-base">
              <FileText className="w-4 h-4" /> Convert PDF to Word
            </button>
            <button onClick={() => scrollToConverter("word2pdf")} className="glass px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium hover:bg-white/10 transition inline-flex items-center justify-center gap-2 text-sm sm:text-base">
              <FileType2 className="w-4 h-4" /> Convert Word to PDF
            </button>
          </motion.div>

          {/* Floating doc icons */}
          <div className="relative mt-16 max-w-4xl mx-auto">
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [-6, -4, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 sm:left-10 top-8 glass rounded-2xl p-4 hidden sm:block"
            >
              <FileText className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [6, 4, 6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 sm:right-10 top-16 glass rounded-2xl p-4 hidden sm:block"
            >
              <FileType2 className="w-8 h-8 text-accent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Converter mode={converterMode} setMode={setConverterMode} />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 sm:mt-24"
          >
            <BannerAdProvider placement="hero" />
          </motion.div>
        </div>
      </section>

      <Tools />
      <ImageTools />
      <Features />
      
      <section className="py-12 px-4">
        <BannerAdProvider placement="mid" />
      </section>
      
      <HowItWorks />

      <Testimonials />
      <FAQ />
      
      <section className="py-8 px-4">
        <BannerAdProvider placement="footer" />
      </section>
      
      <Footer />
    </div>
  );
}
