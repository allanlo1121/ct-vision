
import { timingSafeEqual } from "node:crypto"
import type { FastifyPluginAsync } from "fastify"
import { getTbmOverview } from "../tools/get-tbm-overview"
import { GetRingProgressSchema, getRingProgress }
  from "../tools/get-ring-progress"

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

  // 查询 TBM 概览
  app.get("/overview", async () => {
    const result = await getTbmOverview()

    return {
      success: true,
      data: result,
    }
  })

  // 统计完成环数
app.post("/ring-progress", async (request) => {
  const input = GetRingProgressSchema.parse(request.body)

  const data = await getRingProgress(input)

  return {
    success: true,
    data,
  }
})
  
}
