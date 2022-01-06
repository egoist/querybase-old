// @ts-check
import path from "path"
import packager from "electron-packager"

async function pack() {
  await packager({
    dir: path.resolve("main"),
    name: "QueryBase",
    out: "dist",
    overwrite: true,
    platform: ["darwin"],
    arch: ["x64", "arm64"],
    ignore(p) {
      if (!p) return false
      return (
        !p.includes("node_modules") &&
        !p.startsWith("/out") &&
        p !== "/package.json"
      )
    },
  })
}

pack().catch((error) => {
  console.error(error)
  process.exit(1)
})
