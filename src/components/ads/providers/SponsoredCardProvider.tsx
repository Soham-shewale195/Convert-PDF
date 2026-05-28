import { adConfig } from "@/config/ads";

export function SponsoredCardProvider() {
  const provider = adConfig.providers.sponsoredCard;

  if (provider === "mock") {
    return (
      <div className="p-4 rounded-2xl glass-strong border border-white/10 bg-white/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            🌟
          </div>
          <span className="text-sm font-bold">Sponsored Tool</span>
        </div>
        <p className="text-xs text-muted-foreground">This is a mock sponsored card placement.</p>
      </div>
    );
  }

  return null;
}
