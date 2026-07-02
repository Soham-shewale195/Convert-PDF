import { MONETIZATION_CONFIG } from "@/config/monetization";

const STORAGE_KEY = "convertease_usage_data";
const SECRET_SALT = "cvrt_ez_26";

interface UsageData {
  tasksCompleted: number;
  lastResetDate: string; // ISO date string without time
}

const getTodayDateString = () => new Date().toISOString().split("T")[0];

const generateChecksum = (data: UsageData): string => {
  // Simple checksum to deter casual tampering
  let hash = 0;
  const str = `${data.tasksCompleted}:${data.lastResetDate}:${SECRET_SALT}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
};

const getUsageData = (): UsageData => {
  if (typeof window === "undefined")
    return { tasksCompleted: 0, lastResetDate: getTodayDateString() };

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { tasksCompleted: 0, lastResetDate: getTodayDateString() };

  try {
    const decoded = atob(raw);
    const parsed = JSON.parse(decoded);

    // Validate Checksum
    if (
      parsed.checksum !==
      generateChecksum({
        tasksCompleted: parsed.tasksCompleted,
        lastResetDate: parsed.lastResetDate,
      })
    ) {
      throw new Error("Checksum mismatch");
    }

    const data: UsageData = {
      tasksCompleted: parsed.tasksCompleted,
      lastResetDate: parsed.lastResetDate,
    };

    // Reset if it's a new day
    if (data.lastResetDate !== getTodayDateString()) {
      return { tasksCompleted: 0, lastResetDate: getTodayDateString() };
    }
    return data;
  } catch (e) {
    // On any tampering or error, reset to 0
    return { tasksCompleted: 0, lastResetDate: getTodayDateString() };
  }
};

const saveUsageData = (data: UsageData) => {
  if (typeof window !== "undefined") {
    const payload = {
      ...data,
      checksum: generateChecksum(data),
    };
    localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(payload)));

    // Dispatch a custom event for same-tab sync
    window.dispatchEvent(new Event("convertease:usage_updated"));
  }
};

// Cross-tab synchronization
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      window.dispatchEvent(new Event("convertease:usage_updated"));
    }
  });
}

export const recordTaskCompletion = () => {
  const data = getUsageData();
  data.tasksCompleted += 1;
  saveUsageData(data);
};

export const checkRequiresAd = (fileSizeInBytes: number): boolean => {
  if (!MONETIZATION_CONFIG.enableRewardedAds) return false;

  // Rule B: If file is over 10MB (but under 100MB handled by same limit)
  const sizeMB = fileSizeInBytes / (1024 * 1024);
  if (sizeMB >= MONETIZATION_CONFIG.adRequiredSizeMB) {
    return true;
  }

  // Rule C: Exceeded free daily usage limit
  const data = getUsageData();
  return data.tasksCompleted >= MONETIZATION_CONFIG.freeTasksPerDay;
};

export const checkRequiresWarning = (fileSizeInBytes: number): boolean => {
  const sizeMB = fileSizeInBytes / (1024 * 1024);
  return sizeMB >= MONETIZATION_CONFIG.warningSizeMB;
};
