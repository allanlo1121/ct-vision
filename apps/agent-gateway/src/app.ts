import Fastify from "fastify"
import { ZodError } from "zod"

import { healthRoutes } from "./routes/health"
import { tbmRoutes } from "./routes/tbm"

export function buildApp() {
    const app = Fastify({
        logger: true,
        bodyLimit: 1024 * 1024,
        requestTimeout: 30_000,
    })

    app.register(healthRoutes)

    app.register(tbmRoutes, {
        prefix: "/api/agent/tbm",
    })

    app.setErrorHandler((error, request, reply) => {
        // 记录完整错误到服务器日志
        request.log.error({ err: error }, "Request failed")

        // Zod 参数校验失败
        if (error instanceof ZodError) {
            return reply.status(400).send({
                success: false,
                message: "请求参数验证失败",
                errors: error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message,
                })),
            })
        }

        // 其他异常
        const status =
            error instanceof Error &&
                "statusCode" in error &&
                typeof error.statusCode === "number"
                ? error.statusCode
                : 500

        const statusCode =
            status >= 400 && status < 500 ? status : 500

        return reply.status(statusCode).send({
            success: false,
            message:
                statusCode === 500
                    ? "Internal Server Error"
                    : error instanceof Error
                        ? error.message
                        : "Request failed",
        })
    })

    return app
}