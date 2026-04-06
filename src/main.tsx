import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

// Register service worker with periodic update checks for iOS
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a toast/banner prompting the user to update
    const confirmed = window.confirm(
      "A new version of Iron Keeper is available. Update now?"
    );
    if (confirmed) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("Iron Keeper is ready to work offline.");
  },
});

// Periodically check for updates every 60 seconds (helps iOS)
setInterval(() => {
  updateSW();
}, 60 * 1000);

createRoot(document.getElementById("root")!).render(<App />);
