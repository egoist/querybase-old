import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-refresh"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig((ctx) => {
  return {
    base: "./",
    plugins: [react(), tsconfigPaths()],
    esbuild: {
      jsxInject: `import React from "react"`,
    },
    build: {
      outDir: "../main/out/client",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        ...(ctx.mode === "production"
          ? {
              react: "preact/compat",
              "react-dom": "preact/compat",
            }
          : {}),
      },
    },
  }
})
