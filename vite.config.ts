import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.join(__dirname, "src"),
      },
      {
        find: /^~/,
        replacement: "",
      },
    ],
  },
});
