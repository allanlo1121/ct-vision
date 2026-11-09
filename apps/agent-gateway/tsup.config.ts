import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/main.ts"],

  format: ["esm"],
  platform: "node",
  target: "node22",

  outDir: "dist",
  clean: true,

  bundle: true,
  splitting: false,

  // 强制打包 Monorepo 内部包
  noExternal: [/^@workspace\//],

  // 生成 Source Map，方便排查生产错误
  sourcemap: true,

  // 不生成声明文件
  dts: false,
})