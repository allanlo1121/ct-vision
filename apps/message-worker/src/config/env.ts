

import "dotenv/config"
import { z } from "zod"

const retryDelaysSchema = z.string()
  .transform((value) =>
    value.split(",").map((item) => Number(item.trim()))
  )
  .pipe(z.array(z.number().int().positive()))

const envSchema = z.object({
  // 数据库
  DATABASE_URL: z.url(),
  SUPABASE_SECRET_KEY: z.string().min(1),

  // Worker 轮询间隔，单位毫秒
  NOTIFICATION_EVENT_POLL_MS:
    z.coerce.number().int().positive().default(5000),

  NOTIFICATION_DELIVERY_POLL_MS:
    z.coerce.number().int().positive().default(2000),

  // SMS
  SMS_ENDPOINT: z.url(),
  SMS_USERNAME: z.string().min(1),
  SMS_PASSWORD: z.string().min(1),
  SMS_PREFIX: z.string().default("【成都相传劳务】"),

  SMS_TIMEOUT_MS:
    z.coerce.number().int().positive().default(10000),

  SMS_MAX_ATTEMPTS:
    z.coerce.number().int().min(1).default(3),

  SMS_RETRY_DELAYS:
    retryDelaysSchema.prefault("1,5"),

  // WeCom
  WECHAT_WEBHOOK_URL: z.url(),

  WECOM_TIMEOUT_MS:
    z.coerce.number().int().positive().default(10000),

  WECOM_MAX_ATTEMPTS:
    z.coerce.number().int().min(1).default(5),

  WECOM_RETRY_DELAYS:
    retryDelaysSchema.prefault("1,2,5,10"),
}).superRefine((data, ctx) => {
  // SMS 重试间隔数量校验
  if (
    data.SMS_RETRY_DELAYS.length !==
    data.SMS_MAX_ATTEMPTS - 1
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["SMS_RETRY_DELAYS"],
      message: "SMS_RETRY_DELAYS 数量必须等于 SMS_MAX_ATTEMPTS - 1",
    })
  }

  // WeCom 重试间隔数量校验
  if (
    data.WECOM_RETRY_DELAYS.length !==
    data.WECOM_MAX_ATTEMPTS - 1
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["WECOM_RETRY_DELAYS"],
      message: "WECOM_RETRY_DELAYS 数量必须等于 WECOM_MAX_ATTEMPTS - 1",
    })
  }
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>