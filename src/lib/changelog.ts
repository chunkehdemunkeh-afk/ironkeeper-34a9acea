export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

/**
 * Add new entries at the TOP of this array.
 * The first entry is treated as the "latest" release.
 * Keep it short — 3-6 bullet points per release.
 */
export const changelog: ChangelogEntry[] = [
  {
    version: "1.5.0",
    date: "2026-04-14",
    title: "Barcode Scanner & Meal Copy",
    changes: [
      "Improved barcode scanner focus on iPhone with zoom slider",
      "Copy/duplicate meals from previous days",
      "Edit logged food items inline",
      "Favourite foods for quick re-logging",
      "Weekly nutrition averages now exclude untracked days",
      "Auto-update system for installed apps",
    ],
  },
];

export function getLatestChangelog(): ChangelogEntry | null {
  return changelog[0] ?? null;
}

const SEEN_KEY = "ik-changelog-seen";

export function hasSeenVersion(version: string): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === version;
  } catch {
    return true;
  }
}

export function markVersionSeen(version: string): void {
  try {
    localStorage.setItem(SEEN_KEY, version);
  } catch {
    // storage unavailable
  }
}
