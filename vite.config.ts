import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Resolve the requested public imports to the verified, local source revision.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: { entries: ["index.html"] },
  resolve: {
    alias: [
      { find: "@designcodeio/threeui/style.css", replacement: fileURLToPath(new URL("./src/shaders/threeui.css", import.meta.url)) },
      { find: "@designcodeio/threeui", replacement: fileURLToPath(new URL("./src/shaders/landing-pages/CompleteShelfLandingPage.tsx", import.meta.url)) },
    ],
  },
});
