import "dotenv/config"
import { buildApp } from "./app"
import type { FastifyInstance } from "fastify"

let app: FastifyInstance | undefined
let shuttingDown = false

async function main() {
    try {
        app = await buildApp()

        const port = Number(process.env.PORT ?? 3100)
        const host = process.env.HOST ?? "0.0.0.0"

        await app.listen({ port, host })

        app.log.info(`Agent Gateway listening on ${host}:${port}`)
    } catch (error) {
        if (app) {
            app.log.error({ err: error }, "Agent Gateway startup failed")
            await app.close().catch(() => { })
        } else {
            console.error("Agent Gateway startup failed:", error)
        }

        process.exitCode = 1
    }
}

async function shutdown(signal: string) {
    // 防止 SIGINT、SIGTERM 重复触发关闭
    if (shuttingDown) return
    shuttingDown = true

    if (!app) {
        process.exitCode = 0
        return
    }

    try {
        app.log.info({ signal }, "Shutting down Agent Gateway")

        // 等待正在处理的 HTTP 请求完成并关闭服务
        await app.close()

        app.log.info("Agent Gateway stopped")
        process.exitCode = 0
    } catch (error) {
        app.log.error({ err: error }, "Agent Gateway shutdown failed")
        process.exitCode = 1
    }
}

process.once("SIGINT", () => {
    void shutdown("SIGINT")
})

process.once("SIGTERM", () => {
    void shutdown("SIGTERM")
})

void main()