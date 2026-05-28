export type AdProvider = "mock" | "adsense" | "custom";
export type AdPlacement = "hero" | "mid" | "footer";

export interface AdConfig {
  providers: {
    banner: AdProvider;
    rewarded: AdProvider;
    sponsoredCard: AdProvider;
  };
  slots: {
    hero: { width: string; height: string };
    mid: { width: string; height: string };
    footer: { width: string; height: string };
  };
}

export const adConfig: AdConfig = {
  providers: {
    // Defaults to mock if env variable is not set
    banner: (import.meta.env.VITE_BANNER_PROVIDER as AdProvider) || "mock",
    rewarded: (import.meta.env.VITE_REWARDED_PROVIDER as AdProvider) || "mock",
    sponsoredCard: (import.meta.env.VITE_SPONSORED_PROVIDER as AdProvider) || "mock",
  },
  slots: {
    hero: { width: "100%", height: "160px" },
    mid: { width: "300px", height: "250px" }, // standard medium rectangle
    footer: { width: "100%", height: "90px" }, // standard leaderboard
  },
};
