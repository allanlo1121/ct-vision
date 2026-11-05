import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],

  format: ["esm"],
  platform: "node",
  target: "node22",

  outDir: "dist",
  clean: true,

  bundle: true,
  splitting: false,

  // 将 Monorepo 内部包编译进入产物
  noExternal: [/^@workspace\//],

  sourcemap: true,
  dts: false,
})