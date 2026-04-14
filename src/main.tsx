import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare const __APP_VERSION__: string;

const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isPreviewHost || isInIframe) {
  // Unregister any SW in preview/editor so stale caches don't interfere
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
} else {
  let updateInProgress = false;

  const applyUpdate = async () => {
    if (updateInProgress) return;
    updateInProgress = true;

    // Show the update banner in the UI
    window.dispatchEvent(new Event("ik-updating"));

    // Flag so the app shows "What's New" after reload
    try { localStorage.setItem("ik-just-updated", "1"); } catch {}

    // Small delay so user sees the banner before the reload
    await new Promise((r) => setTimeout(r, 1200));

    window.location.reload();
  };

  // With autoUpdate + skipWaiting:true, the new SW takes control immediately
  // and fires controllerchange — the most reliable cross-platform update signal.
  navigator.serviceWorker?.addEventListener("controllerchange", () => {
    void applyUpdate();
  });

  const checkPublishedVersion = async () => {
    try {
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = (await response.json()) as { version?: string };
      if (data.version && data.version !== __APP_VERSION__) {
        // version.json changed — force the SW to check for an update
        const reg = await navigator.serviceWorker?.getRegistration();
        await reg?.update();
        // Safety net: if the SW was already current, reload anyway after 2s
        setTimeout(() => void applyUpdate(), 2000);
      }
    } catch {
      // ignore transient network issues
    }
  };

  // Check immediately on load, then every 60 seconds
  void checkPublishedVersion();
  setInterval(() => {
    void checkPublishedVersion();
  }, 60 * 1000);
}

createRoot(document.getElementById("root")!).render(<App />);
