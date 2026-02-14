import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    env: {
      VITE_AUTH_TOKEN: "fake-token",
    },
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
