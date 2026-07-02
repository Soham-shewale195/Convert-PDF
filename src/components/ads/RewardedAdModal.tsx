import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Check, X, Shield, Sparkles, Loader2, AlertCircle, Download } from "lucide-react";

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type AdState = "idle" | "loading" | "watching" | "completed" | "unlocked";

export function RewardedAdModal({ isOpen, onClose, onComplete }: RewardedAdModalProps) {
  const [adState, setAdState] = useState<AdState>("idle");
  const [timeLeft, setTimeLeft] = useState(5);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const adStartTime = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAdState("loading");
      setTimeLeft(5);
      setShowConfirmClose(false);
      adStartTime.current = null;

      // Simulate ad load time
      const loadTimer = setTimeout(() => {
        setAdState("watching");
        adStartTime.current = Date.now();
      }, 1500);

      return () => clearTimeout(loadTimer);
    } else {
      setAdState("idle");
    }
  }, [isOpen]);

  useEffect(() => {
    if (adState !== "watching" || showConfirmClose || !adStartTime.current) return;

    const timer = setInterval(() => {
      // Use real time to prevent speedhacks via simple timeouts
      const elapsed = Math.floor((Date.now() - adStartTime.current!) / 1000);
      const remaining = Math.max(0, 5 - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        setAdState("completed");
      }
    }, 100);

    return () => clearInterval(timer);
  }, [adState, showConfirmClose]);

  const handleCloseAttempt = () => {
    if (adState === "completed" || adState === "unlocked") {
      onClose();
    } else {
      setShowConfirmClose(true);
    }
  };

  const confirmClose = () => {
    setShowConfirmClose(false);
    onClose();
  };

  const resumeAd = () => {
    setShowConfirmClose(false);
    // adjust start time so countdown continues correctly
    if (adStartTime.current) {
      adStartTime.current = Date.now() - (5 - timeLeft) * 1000;
    }
  };

  const handleUnlockClick = () => {
    // Final check to prevent any timing manipulation
    if (adStartTime.current && Date.now() - adStartTime.current < 5000) {
      return;
    }

    setAdState("unlocked");
    // Small delay to show the unlock animation before triggering complete
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg glass-strong border border-primary/20 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.15)]"
          >
            {/* Ad Banner Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                Premium Sponsor
              </div>
              {adState !== "completed" && adState !== "unlocked" && (
                <button
                  onClick={handleCloseAttempt}
                  className="p-1.5 rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="p-6 relative overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/10 pointer-events-none" />

              <AnimatePresence mode="wait">
                {showConfirmClose ? (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 mx-auto flex items-center justify-center mb-4">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Close Video?</h3>
                    <p className="text-sm text-muted-foreground mb-8 max-w-[280px] mx-auto">
                      You will lose your reward and the file will not be downloaded.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={confirmClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-white/5 transition-colors"
                      >
                        Close Video
                      </button>
                      <button
                        onClick={resumeAd}
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold btn-gradient shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all"
                      >
                        Resume Video
                      </button>
                    </div>
                  </motion.div>
                ) : adState === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="py-12 flex flex-col items-center justify-center"
                  >
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <h3 className="text-lg font-bold">Loading Sponsor Message...</h3>
                    <p className="text-sm text-muted-foreground">Please wait a moment.</p>
                  </motion.div>
                ) : adState === "watching" ? (
                  <motion.div
                    key="watching"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Simulated Ad Provider Container */}
                    <div className="relative w-full aspect-video bg-black/40 rounded-2xl overflow-hidden mb-6 border border-white/10 flex flex-col items-center justify-center shadow-inner group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 opacity-50" />

                      {/* Pulse Animation */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-3 z-10"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                          <Play className="w-5 h-5 text-primary ml-1" />
                        </div>
                        <span className="text-xs tracking-widest text-primary/70 uppercase font-medium">
                          Ad Space Placeholder
                        </span>
                      </motion.div>

                      {/* Countdown Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-xl">
                        <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                        <span className="text-xs font-mono font-medium">Reward in {timeLeft}s</span>
                      </div>

                      {/* Linear Progress Bar overlayed on video bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-500"
                          initial={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
                          animate={{ width: `${((5 - timeLeft + 1) / 5) * 100}%` }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-1">Unlock Your Download</h3>
                      <p className="text-sm text-muted-foreground">
                        Supporting our sponsors through this quick message keeps our premium tools
                        100% free for everyone.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="py-6 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-6 relative group">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl group-hover:blur-2xl transition-all opacity-50" />
                      <div className="relative w-full h-full rounded-full border border-emerald-500/30 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <Check className="w-10 h-10" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      Reward Unlocked!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8 max-w-[280px] mx-auto">
                      Thank you for your support. Your file is ready to be saved to your device.
                    </p>
                    <button
                      onClick={handleUnlockClick}
                      disabled={adState === "unlocked"}
                      className="w-full btn-gradient py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {adState === "unlocked" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      )}
                      {adState === "unlocked" ? "Downloading..." : "Download File Now"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-black/30 p-4 flex justify-center items-center gap-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold">
              <Shield className="w-3.5 h-3.5" />
              Local Processing • Safe & Secure
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
