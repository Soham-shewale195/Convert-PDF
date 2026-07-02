export const MONETIZATION_CONFIG = {
  // Features toggle
  enableRewardedAds: true,
  enableBannerAds: false,

  // Limits
  freeTasksPerDay: 3, // Number of free downloads before ad is required
  adRequiredSizeMB: 10, // Files over 10MB require an ad
  warningSizeMB: 100, // Files over 100MB trigger a performance warning

  // Future integrations placeholders
  providers: {
    adsenseClientId: "", // e.g. "ca-pub-XXXXXXXXX"
    affiliateId: "",
  },
};
