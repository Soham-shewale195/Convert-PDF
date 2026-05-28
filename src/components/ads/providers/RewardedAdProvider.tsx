import { adConfig } from "@/config/ads";
import { RewardedAdModal } from "@/components/ads/RewardedAdModal";

interface RewardedAdProviderProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function RewardedAdProvider({ isOpen, onClose, onComplete }: RewardedAdProviderProps) {
  const provider = adConfig.providers.rewarded;

  if (provider === "mock") {
    return <RewardedAdModal isOpen={isOpen} onClose={onClose} onComplete={onComplete} />;
  }

  if (provider === "custom") {
    // Future integration point for a custom rewarded video network SDK
    return null;
  }

  return null;
}
