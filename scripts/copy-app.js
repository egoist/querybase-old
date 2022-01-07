//@ts-check
import path from "path"
import fs from "fs"
import { nodeFileTrace } from "@vercel/nft"

/**
 *
 * @param {string} filepath
 * @param {any} content
 */
const outputFileSync = (filepath, content) => {
  const dir = path.dirname(filepath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filepath, content)
}

async function main() {
  await fs.promises.cp(path.resolve("main/out"), path.resolve("app"), {
    recursive: true,
  })
  const pkg = JSON.parse(
    fs.readFileSync(path.resolve("main/package.json"), "utf8")
  )
  outputFileSync(
    path.resolve("app/package.json"),
    JSON.stringify({
      private: true,
      name: "querybase",
      version: "0.0.0",
      dependencies: pkg.dependencies,
    })
  )

  const { fileList } = await nodeFileTrace(
    [path.resolve("main/out/index.js"), path.resolve("main/out/preload.js")],
    {
      ignore(name) {
        if (name.includes("node_modules/electron/")) return true
        return false
      },
    }
  )
  await Promise.all(
    [...fileList].map(async (file) => {
      if (file.includes("node_modules")) {
        const stat = await fs.promises.stat(file)
        if (stat.isDirectory()) return
        const outFile = path.join("app", file)
        outputFileSync(outFile, await fs.promises.readFile(file))
      }
    })
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
