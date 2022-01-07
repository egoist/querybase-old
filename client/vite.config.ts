import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig((ctx) => {
  return {
    base: "./",
    plugins: [react(), tsconfigPaths()],
    build: {
      outDir: "../main/out/client",
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
