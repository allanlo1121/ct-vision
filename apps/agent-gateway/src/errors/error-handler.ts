import type {
    FastifyError,
    FastifyReply,
    FastifyRequest,
} from "fastify"
import { ZodError } from "zod"

type ErrorWithDetails = Error & {
    code?: string
    statusCode?: number
    validation?: unknown
    details?: string | null
    hint?: string | null
}

export function errorHandler(
    error: FastifyError | ErrorWithDetails,
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestId = request.id

    request.log.error({ err: error }, "Request failed")

    // 1. 手动执行 schema.parse() 引发的错误
    if (error instanceof ZodError) {
        return reply.status(400).send({
            success: false,
            code: "VALIDATION_ERROR",
            message: "请求参数校验失败",
            requestId,
            details: error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        })
    }

    // 2. Fastify 自动请求参数校验错误
    if ("validation" in error && error.validation) {
        return reply.status(400).send({
            success: false,
            code: "VALIDATION_ERROR",
            message: "请求参数校验失败",
            requestId,
            details: [{
                field: "request",
                message: error.message,
            }],
        })
    }

    // 3. 已知业务错误：例如 RPC 明确指出 TBM 列表为空
    if (
        error.code === "P0001" &&
        error.message === "p_tbm_codes cannot be empty"
    ) {
        return reply.status(400).send({
            success: false,
            code: "TBM_CODES_EMPTY",
            message: "TBM设备编号不能为空，请检查设备查询范围",
            requestId,
        })
    }

    // 4. Supabase / PostgreSQL 错误
    if (
        typeof error.code === "string" &&
        (
            error.code.startsWith("PGRST") ||
            /^[A-Z0-9]{5}$/.test(error.code)
        )
    ) {
        return reply.status(500).send({
            success: false,
            code: "DATABASE_ERROR",
            message: "数据库查询失败，请根据 requestId 检查服务器日志",
            requestId,
        })
    }

    // 5. 其他客户端请求错误
    if (
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
    ) {
        return reply.status(error.statusCode).send({
            success: false,
            code: error.code || "BAD_REQUEST",
            message: error.message,
            requestId,
        })
    }

    // 6. 其他未知异常
    return reply.status(500).send({
        success: false,
        code: "INTERNAL_ERROR",
        message: "服务器内部错误，请根据 requestId 检查服务器日志",
        requestId,
    })
}