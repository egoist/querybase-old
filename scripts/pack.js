// @ts-check
import path from "path"
import packager from "electron-packager"

async function pack() {
  await packager({
    dir: path.resolve("app"),
    name: "QueryBase",
    out: "dist",
    overwrite: true,
    platform: ["darwin"],
    arch: ["x64", "arm64"],
  })
}

pack().catch((error) => {
  console.error(error)
  process.exit(1)
})
