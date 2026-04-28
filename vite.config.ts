import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Candid",
        short_name: "Candid",
        description: "Be real. Be you. Posts vanish in 24hrs.",
        theme_color: "#6C63FF",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/icon-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "icons/icon-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  // ✅ Add this
 build: {
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      manualChunks: (id: string) => {
        if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
          return "react";
        }
        if (id.includes("node_modules/recharts") || id.includes("node_modules/react-is")) {
          return "recharts";
        }
        if (id.includes("node_modules/framer-motion")) {
          return "framer";
        }
        if (id.includes("node_modules/lucide-react")) {
          return "lucide";
        }
      },
    },
  },
},
});