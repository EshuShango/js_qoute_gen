/// <reference types="vitest" />
import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";

export default defineConfig({
  //* vitest config
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
  //* vite config
  clearScreen: false,
  envPrefix: "APP_",
  // Choose which message to display on startup.
  logLevel: "info",
  envDir: "env",
  server: {
    // opens the browser automatically
    open: "index.html",
    port: 3000,
    // if you want to restrict the server to a specific ip address
    strictPort: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  css: {
    devSourcemap: true,
  },
});
