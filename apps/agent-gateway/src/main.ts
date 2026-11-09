
import "dotenv/config"
import { buildApp } from "./app"

console.log("ENV CHECK:", {
  cwd: process.cwd(),
  hasApiKey: !!process.env.AGENT_API_KEY,
  apiKeyLength: process.env.AGENT_API_KEY?.length,
})

const app = buildApp()

async function main() {
  try {
    const port = Number(process.env.PORT ?? 3100)
    const host = process.env.HOST ?? "0.0.0.0"

    await app.listen({ port, host })

    app.log.info(`Agent Gateway listening on ${host}:${port}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

async function shutdown() {
  try {
    await app.close()
    process.exit(0)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

void main()
