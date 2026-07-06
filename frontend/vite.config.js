import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // 🔥 ESTA ES LA CLAVE PARA ARREGLAR EL 404 DE IMPORTACION-CAJA
  preview: {
    port: 4173,
  },
});
