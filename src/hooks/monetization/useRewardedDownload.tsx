import { useState, useCallback, useRef, useEffect } from "react";
import { checkRequiresAd, recordTaskCompletion } from "@/utils/monetization";
import { downloadBlob } from "@/lib/image-utils";
import { toast } from "sonner";
import { RewardedAdProvider } from "@/components/ads/providers/RewardedAdProvider";
import { FreeBadge, PremiumBadge } from "@/components/ads/MonetizationBadges";
import { Download, FileImage } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReadyFile {
  blob: Blob;
  name: string;
  requiresAd: boolean;
}

export function useRewardedDownload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readyFile, setReadyFile] = useState<ReadyFile | null>(null);
  const isDownloading = useRef(false);

  // Sync state if other tabs update monetization data
  useEffect(() => {
    const handleSync = () => {
      if (readyFile && readyFile.requiresAd) {
        // Re-check requirement in case they finished tasks in another tab
        const stillRequires = checkRequiresAd(readyFile.blob.size);
        if (!stillRequires) {
          setReadyFile({ ...readyFile, requiresAd: false });
        }
      }
    };
    window.addEventListener("convertease:usage_updated", handleSync);
    return () => window.removeEventListener("convertease:usage_updated", handleSync);
  }, [readyFile]);

  const prepareDownload = useCallback((blob: Blob, name: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const requiresAd = checkRequiresAd(blob.size);
      setReadyFile({ blob, name, requiresAd });
      resolve(true); // Return true to let tool know it can set state="success"
    });
  }, []);

  const executeDownload = useCallback(() => {
    if (!readyFile || isDownloading.current) return;

    if (readyFile.requiresAd) {
      setIsModalOpen(true);
    } else {
      isDownloading.current = true;
      recordTaskCompletion();
      downloadBlob(readyFile.blob, readyFile.name);
      toast.success("Downloaded Successfully");
      setTimeout(() => { window.location.href = "/"; }, 1500);
    }
  }, [readyFile]);

  const handleAdComplete = useCallback(() => {
    if (readyFile && !isDownloading.current) {
      isDownloading.current = true;
      recordTaskCompletion();
      downloadBlob(readyFile.blob, readyFile.name);
      toast.success("Unlocked & Downloaded Successfully");
      setTimeout(() => { window.location.href = "/"; }, 1500);
    }
    setIsModalOpen(false);
  }, [readyFile]);

  const handleAdClose = useCallback(() => {
    setIsModalOpen(false);
    toast.error("Download Cancelled. Please wait for the unlock timer.");
  }, []);

  const renderModal = () => (
    <RewardedAdProvider 
      isOpen={isModalOpen} 
      onClose={handleAdClose} 
      onComplete={handleAdComplete} 
    />
  );

  const renderStatusCard = () => {
    if (!readyFile) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="mt-6 glass-strong border border-primary/20 rounded-2xl p-5 sm:p-6 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center shrink-0 shadow-sm">
                <FileImage className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-base sm:text-lg">Ready to Download</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-[150px] sm:max-w-[250px]">{readyFile.name}</p>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <p className="text-xs sm:text-sm text-muted-foreground">{(readyFile.blob.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
            
            <div className="shrink-0">
              {readyFile.requiresAd ? <PremiumBadge /> : <FreeBadge />}
            </div>
          </div>

          <button 
            onClick={executeDownload}
            className="relative z-10 w-full btn-gradient py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2 group"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" /> 
            {readyFile.requiresAd ? "Unlock & Download" : "Free Download"}
          </button>
        </motion.div>
      </AnimatePresence>
    );
  };

  return {
    prepareDownload,
    renderStatusCard,
    renderModal
  };
}
