import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
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

const confirmUpdate = () =>
  window.confirm("A new version of Iron Keeper is available. Update now?");

if (isPreviewHost || isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
} else {
  let promptingForUpdate = false;
  let updateSW: ReturnType<typeof registerSW> | null = null;

  const applyUpdate = async () => {
    try {
      await updateSW?.(true);
    } finally {
      window.location.reload();
    }
  };

  const maybePromptForUpdate = () => {
    if (promptingForUpdate) return;
    promptingForUpdate = true;

    if (confirmUpdate()) {
      void applyUpdate();
      return;
    }

    promptingForUpdate = false;
  };

  updateSW = registerSW({
    onNeedRefresh() {
      maybePromptForUpdate();
    },
    onOfflineReady() {
      console.log("Iron Keeper is ready to work offline.");
    },
  });

  const checkPublishedVersion = async () => {
    try {
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = (await response.json()) as { version?: string };
      if (data.version && data.version !== __APP_VERSION__) {
        maybePromptForUpdate();
      }
    } catch {
      // ignore transient network issues
    }
  };

  void checkPublishedVersion();
  setInterval(() => {
    void updateSW?.();
    void checkPublishedVersion();
  }, 60 * 1000);
}

createRoot(document.getElementById("root")!).render(<App />);
