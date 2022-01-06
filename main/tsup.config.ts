import { defineConfig } from "tsup"

const DEV = process.argv.includes("--watch")

export default defineConfig({
  entry: ["./src/index.ts", "./src/preload.ts"],
  format: ["cjs"],
  target: "node16",
  external: ["electron"],
  outDir: "./out",
  shims: false,
  splitting: true,
  sourcemap: DEV,
  env: {
    NODE_ENV: DEV ? "development" : "production",
  },
})
