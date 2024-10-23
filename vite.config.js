import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://43.203.123.32:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
