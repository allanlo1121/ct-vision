
import Fastify from "fastify"
import { healthRoutes } from "./routes/health"
import { tbmRoutes } from "./routes/tbm"

export function buildApp() {
  const app = Fastify({
    logger: true,
    bodyLimit: 1024 * 1024,
    requestTimeout: 30_000,
  })

  // 健康检查
  app.register(healthRoutes)

  // TBM AI 工具接口
  app.register(tbmRoutes, {
    prefix: "/api/agent/tbm",
  })

  // 统一异常处理
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error)

    const statusCode =
      error.statusCode && error.statusCode >= 400 &&
      error.statusCode < 500
        ? error.statusCode
        : 500

    reply.status(statusCode).send({
      success: false,
      message:
        statusCode === 500
          ? "Internal Server Error"
          : error.message,
    })
  })

  return app
}
