import { readFileSync, writeFileSync } from "node:fs"
import { execFileSync } from "node:child_process"

const pkg = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
)

let commit = "unknown"

try {
  commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
    encoding: "utf8",
  }).trim()
} catch {
  // 构建环境没有 Git 时使用 unknown
}

writeFileSync(
  new URL("../src/build-info.ts", import.meta.url),
  `export const buildInfo = ${JSON.stringify(
    {
      version: pkg.version,
      commit,
      buildTime: new Date().toISOString(),
    },
    null,
    2
  )} as const`
)
