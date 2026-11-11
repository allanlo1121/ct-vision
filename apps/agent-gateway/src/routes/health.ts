
import type { FastifyPluginAsync } from "fastify"
import { buildInfo } from "../build-info"

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "agent-gateway",
      version: buildInfo.version,
      commit: buildInfo.commit,
      buildTime: buildInfo.buildTime,
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    }
  })
}