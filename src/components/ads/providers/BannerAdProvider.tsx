import { adConfig, AdPlacement } from "@/config/ads";
import { PremiumAd } from "@/components/ads/PremiumAd";

interface BannerAdProviderProps {
  placement: AdPlacement;
}

export function BannerAdProvider({ placement }: BannerAdProviderProps) {
  const provider = adConfig.providers.banner;

  if (provider === "mock") {
    return <PremiumAd type={placement} />;
  }

  if (provider === "adsense") {
    // This is a future placeholder for the Google AdSense integration.
    // E.g., <ins className="adsbygoogle" style={{ display: "block" }} ... />
    return (
      <div 
        className="w-full h-full flex items-center justify-center border border-dashed border-white/20 bg-white/5 rounded-3xl"
        style={{ minHeight: adConfig.slots[placement].height }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">AdSense Slot: {placement}</span>
      </div>
    );
  }

  return null;
}
