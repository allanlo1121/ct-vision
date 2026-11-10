import "dotenv/config"
import { writeFile } from "node:fs/promises"
import { buildApp } from "../src/app.js"

async function main() {
  const app = await buildApp()

  try {
    await app.ready()

    const openapi = app.swagger()

    await writeFile("openapi.json", JSON.stringify(openapi, null, 2), "utf8")

    console.log("OpenAPI exported: openapi.json")
  } finally {
    await app.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
