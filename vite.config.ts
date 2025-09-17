import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

const repoBase = process.env.VITE_BASE_URL ?? "/techcompare-products/" 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
