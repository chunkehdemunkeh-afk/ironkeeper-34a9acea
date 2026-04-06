import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Auto-bump version.json on every production build
function autoBumpVersion() {
  return {
    name: "auto-bump-version",
    buildStart() {
      const versionFile = path.resolve(__dirname, "public/version.json");
      const buildTime = new Date().toISOString();
      // Use timestamp as version to guarantee uniqueness per build
      const version = `1.0.${Date.now()}`;
      fs.writeFileSync(versionFile, JSON.stringify({ version, buildTime }, null, 2));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && autoBumpVersion(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico"],
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
        clientsClaim: true,
        skipWaiting: false,
      },
      manifest: {
        name: "Iron Keeper",
        short_name: "Iron Keeper",
        description: "Track your workouts and crush your goals",
        theme_color: "#111318",
        background_color: "#111318",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
