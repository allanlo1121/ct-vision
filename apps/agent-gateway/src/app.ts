import Fastify from "fastify"
import swagger from "@fastify/swagger"
import { ZodError } from "zod"

import { healthRoutes } from "./routes/health"
import { tbmRoutes } from "./routes/tbm"

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  jsonSchemaTransformObject,
} from "fastify-type-provider-zod"

import { errorHandler } from "./errors/error-handler"

export async function buildApp() {
  const app = Fastify({
    logger: true,
    bodyLimit: 1024 * 1024,
    requestTimeout: 30_000,

    // 防止以后重复注册错误处理器
    allowErrorHandlerOverride: false,
  })

  // 1. Zod 校验
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  // 2. 统一错误处理
  app.setErrorHandler(errorHandler)

  // 3. Swagger
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Chengtong Vision Agent API",
        description: "盾构生产智能体查询接口",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://129.28.39.68:3100",
        },
      ],
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "X-API-Key",
          },
        },
      },
      security: [{ ApiKeyAuth: [] }],
    },

    transform: jsonSchemaTransform,
    transformObject: jsonSchemaTransformObject,
  })

  // 4. 注册业务路由
  await app.register(healthRoutes)

  await app.register(tbmRoutes, {
    prefix: "/api/agent/tbm",
  })

  return app
}