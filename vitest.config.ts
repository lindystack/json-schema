/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    globals: true,
  },
  resolve: {
    alias: {
      "json-schema": path.resolve(__dirname, "/src"),
    },
  },
});
