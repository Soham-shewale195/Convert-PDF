import { ReactNode, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Footer } from "@/components/Sections";
import { motion } from "framer-motion";

export default function PageLayout({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col relative z-0">
      <Background />
      <Navbar />
      
      <main className="flex-1 px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 pb-4 border-b border-white/10 text-white">{title}</h1>
            <div className="space-y-6 text-sm sm:text-base text-white/90 leading-relaxed font-medium">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
