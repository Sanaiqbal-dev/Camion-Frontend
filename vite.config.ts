import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Make sure this points to your src directory
    },
  },
});
