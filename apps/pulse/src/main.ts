import "dotenv/config"

import Fastify from "fastify"
import cors from "@fastify/cors"


import { tbmContextManager } from "./context"
import { startMqtt, stopMqtt } from "./mqtt/client"
import { tbmRealtimeContextStore } from "./context/store"

const PORT = Number(process.env.PORT ?? 4000)

const app = Fastify({
  logger: false,
})

let stopping = false

async function bootstrap(): Promise<void> {
  try {
    // 1. 注册 Fastify 插件
    await app.register(cors, {
      origin: true,
    })

    // 2. 健康检查
    app.get("/health", async () => {
      return {
        ok: true,
        service: "pulse",
        timestamp: new Date().toISOString(),
      }
    })


    // 4. 启动 HTTP 服务
    await app.listen({
      port: PORT,
      host: "0.0.0.0",
    })

    console.log(`[Pulse] HTTP server started on :${PORT}`)

    // 5. 初始化 TBM 配置上下文
    await tbmContextManager.start()

    console.log("[Pulse] TBM context initialized")
    console.dir(tbmRealtimeContextStore.values(), {
      depth: null,
      colors: true,
    })

    // 6. 启动 MQTT 数据接收
    await startMqtt()

    // console.log("[Pulse] MQTT startup initiated")
    // console.log("[Pulse] Startup completed")
  } catch (error) {
    console.error("[Pulse] Startup failed", error)

    process.exitCode = 1
    await shutdown()
  }
}

// 优雅关闭
async function shutdown(): Promise<void> {
  if (stopping) return
  stopping = true

  console.log("[Pulse] Shutting down...")

  // 1. 停止接收 MQTT 消息
  try {
    await stopMqtt()
  } catch (error) {
    console.error("[Pulse] MQTT shutdown failed", error)
    process.exitCode = 1
  }

  // 2. 停止 Realtime 订阅
  try {
    await tbmContextManager.stop()
  } catch (error) {
    console.error("[Pulse] Context shutdown failed", error)
    process.exitCode = 1
  }

  // 3. 关闭 HTTP 和 Socket.IO 关联资源
  try {
    await app.close()
  } catch (error) {
    console.error("[Pulse] HTTP shutdown failed", error)
    process.exitCode = 1
  }

  console.log("[Pulse] Shutdown completed")
}

process.once("SIGINT", () => {
  void shutdown()
})

process.once("SIGTERM", () => {
  void shutdown()
})

void bootstrap()
