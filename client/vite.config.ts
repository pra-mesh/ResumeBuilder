import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 9002,
    cors: {
      origin: "*",
    },
  },
  build: {
    outDir: "dist", // Ensures output goes to `dist/`
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "images/[name]-[hash][extname]"; // Places images in `dist/images/`
          }
          return "assets/[name]-[hash][extname]"; // Default for other assets
        },
      },
    },
  },
});
