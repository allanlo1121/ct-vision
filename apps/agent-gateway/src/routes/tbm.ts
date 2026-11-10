
import { timingSafeEqual } from "node:crypto"
import type { FastifyPluginAsync } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { ApiErrorSchema, ApiSuccessSchema, apiSuccess } from "@workspace/shared"
import {
    getRingProgressSchema,
    ringProgressResultSchema,
    getRingPhaseSchema,
    ringPhaseResultSchema
} from "@workspace/tbm/ring"
import {
    tbmAssignmentDetailResultSchema,
    getTbmAssignmentDetailSchema
} from "@workspace/tbm/tbm"

import {
    tbmAlarmDetailResultSchema,
    getTbmAlarmDetailSchema
} from "@workspace/tbm/runtime"




import { getTbmAssignmentDetails } from "../tools/get-tbm-assignment"
import { getRingProgress }
    from "../tools/get-ring-progress"
import { getRingPhase }
    from "../tools/get-ring-phase"
import { getTbmAlarmDetails }
    from "../tools/get-tbm-alarm"

function verifyApiKey(token: string | undefined): boolean {
    const expectedKey = process.env.AGENT_API_KEY

    if (!expectedKey || !token) {
        return false
    }

    const expected = Buffer.from(expectedKey)
    const actual = Buffer.from(token)

    if (expected.length !== actual.length) {
        return false
    }

    return timingSafeEqual(expected, actual)
}

export const tbmRoutes: FastifyPluginAsync = async (app) => {
    const router = app.withTypeProvider<ZodTypeProvider>()
    // 所有 TBM 路由统一认证
    app.addHook("onRequest", async (request, reply) => {
        const token = request.headers["x-api-key"]

        if (
            typeof token !== "string" ||
            !verifyApiKey(token)
        ) {
            return reply.code(401).send({
                success: false,
                message: "Unauthorized",
            })
        }
    })

    // 查询 盾构机 施工任务信息
    router.post(
        "/tbm-assignment",
        {
            schema: {
                operationId: "get_tbm_assignment",
                tags: ["TBM"],
                summary: "查询盾构机施工隧道相关信息",
                description:
                    "查询指定时间范围内正在施工的盾构机,及相关隧道\工点\工程项目\经理部等信息。",
                body: getTbmAssignmentDetailSchema,
                response: {
                    200: ApiSuccessSchema(tbmAssignmentDetailResultSchema),
                    400: ApiErrorSchema,
                    500: ApiErrorSchema,
                },
            },
        },
        async (request) => {
            const data = await getTbmAssignmentDetails(request.body)

            return apiSuccess(data)
        }
    )

    // 统计完成环数
    router.post(
        "/ring-progress",
        {
            schema: {
                operationId: "get_ring_progress",
                tags: ["TBM"],
                summary: "查询盾构机环号",
                description:
                    "查询指定时间范围内实际出现的环号数组、最小环号、最大环号及环号跨度。不代表实际完成环数。",
                body: getRingProgressSchema,
                response: {
                    200: ApiSuccessSchema(ringProgressResultSchema),
                    400: ApiErrorSchema,
                    500: ApiErrorSchema,
                },
            },
        },
        async (request) => {
            const data = await getRingProgress(request.body)

            return apiSuccess(data)
        }
    )

    // 统计完成环数
    router.post(
        "/ring-phase",
        {
            schema: {
                operationId: "get_ring_phase",
                tags: ["TBM"],
                summary: "查询盾构机施工每环状态时长",
                description:
                    "查询指定时间范围内实际出现的环号施工各阶段时长。",
                body: getRingPhaseSchema,
                response: {
                    200: ApiSuccessSchema(ringPhaseResultSchema),
                    400: ApiErrorSchema,
                    500: ApiErrorSchema,
                },
            },
        },
        async (request) => {
            const data = await getRingPhase(request.body)

            return apiSuccess(data)
        }
    )

    // 查询时间内的盾构机报警
    router.post(
        "/tbm-alarm",
        {
            schema: {
                operationId: "get_tbm_alarm",
                tags: ["TBM"],
                summary: "查询盾构机施工报警信息,主要是推进参数的报警",
                description:
                    "查询指定时间范围内盾构机推进参数报警,及相关隧道\工点\工程项目\经理部等信息。",
                body: getTbmAlarmDetailSchema,
                response: {
                    200: ApiSuccessSchema(tbmAlarmDetailResultSchema),
                    400: ApiErrorSchema,
                    500: ApiErrorSchema,
                },
            },
        },
        async (request) => {
            const data = await getTbmAlarmDetails(request.body)

            return apiSuccess(data)
        }
    )

}
