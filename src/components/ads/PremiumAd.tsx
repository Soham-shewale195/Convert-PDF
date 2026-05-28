import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

type AdType = "hero" | "mid" | "footer";

export function PremiumAd({ type }: { type: AdType }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full relative overflow-hidden rounded-3xl glass-strong border border-white/5 bg-white/[0.02] ${
            type === "hero" ? "h-32 max-w-4xl mx-auto" :
            type === "mid" ? "h-64 sm:h-80 max-w-2xl mx-auto" :
            "h-24 max-w-3xl mx-auto"
          }`}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </motion.div>
      ) : (
        <motion.div
          key="ad-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2, scale: 1.01 }}
          transition={{ duration: 0.4 }}
      className={`relative group overflow-hidden rounded-3xl glass-strong border border-white/10 bg-white/[0.03] transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-primary/30 flex items-center justify-center text-center ${
        type === "hero" ? "h-32 sm:h-40 max-w-4xl mx-auto p-6" :
        type === "mid" ? "h-64 sm:h-80 max-w-2xl mx-auto p-8" :
        "h-24 sm:h-28 max-w-3xl mx-auto p-4"
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Labels */}
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/5 text-muted-foreground border border-white/10">
          Sponsored
        </span>
      </div>
      {type !== "footer" && (
        <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs text-primary/70 font-medium">
          <Sparkles className="w-3.5 h-3.5" /> Recommended
        </div>
      )}

      {/* Placeholder Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        {type === "hero" && (
          <div className="flex items-center gap-6 text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">Premium Ad Placement</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">This horizontal banner area is reserved for high-converting sponsors. Blends seamlessly with the UI.</p>
            </div>
          </div>
        )}

        {type === "mid" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center shrink-0 mb-4">
              <span className="text-3xl">✨</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Featured Partner</h4>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">A medium rectangle ad slot perfect for showcasing premium tools, software, or services to your engaged audience.</p>
            <button className="px-6 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 flex items-center gap-2">
              Learn More <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {type === "footer" && (
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shrink-0">
                <span className="text-lg">💎</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">Compact Ad Slot</h4>
                <p className="text-xs text-muted-foreground hidden sm:block">Minimal footer placement.</p>
              </div>
            </div>
            <button className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
              Visit
            </button>
          </div>
        )}
      </div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
