import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import minify from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), minify({})],
  build: {
    rollupOptions: {
      input: "./src/main.tsx",
      output: {
        entryFileNames: "app-[name].js",
        assetFileNames: "app-[name].css",
      },
    },

    outDir: "../build",
    emptyOutDir: true,
  },
  root: "./src",
});
