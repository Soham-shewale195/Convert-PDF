import { ReactNode, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { Footer } from "@/components/Sections";
import { Toaster } from "sonner";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { ToolSchema } from "@/components/schema/Schema";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  children: ReactNode;
  /** Optional content sections rendered below the tool panel */
  contentSections?: ReactNode;
}

export default function ToolPageLayout({
  title,
  description,
  icon: Icon,
  accent,
  children,
  contentSections,
}: ToolPageLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col relative z-0">
      <ToolSchema title={title} description={description} urlPath={location.pathname} />
      <Background />
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Tool header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10"
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center mx-auto mb-4 shadow-lg`}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              {description}
            </p>
          </motion.div>

          {/* Tool panel container — matches Tools.tsx active panel styling */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-3xl p-5 sm:p-8 glow-ring"
          >
            {children}
          </motion.div>

          {/* Privacy badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-[10px] sm:text-xs font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% private — files never leave your device</span>
            </div>
          </motion.div>

          {/* Content sections (below the fold) */}
          {contentSections}
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
