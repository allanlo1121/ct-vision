import { z } from "zod"

// 短信发送结果
export const smsResponseDataSchema = z.object({
    smsCount: z.number().int(),
    batchId: z.number(),
})

export const smsApiResponseSchema = z.object({
    code: z.number(),
    message: z.string().optional(),
    msg: z.string().optional(),
    data: smsResponseDataSchema.optional(),
})

export type SmsApiResponse = z.infer<typeof smsApiResponseSchema>

// wecom result { errcode: 0, errmsg: 'ok' }


export const wecomApiResponseSchema = z.object({
    errcode: z.number(),
    errmsg: z.string().optional(),
})

export type WecomApiResponse = z.infer<typeof wecomApiResponseSchema>


export const notificationSendResultSchema = z.object({
  code: z.number().int(),
  message: z.string(),
  messageId: z.string().nullable(),
})

export type NotificationSendResult =
  z.infer<typeof notificationSendResultSchema>



/**
 * API 成功响应
 */
export const ApiSuccessSchema = <T extends z.ZodType>(
  dataSchema: T
) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  })

/**
 * API 失败响应
 */
export const ApiErrorSchema = z.object({
  success: z.literal(false),

  code: z.string(),

  message: z.string(),

  requestId: z.string().optional(),

  details: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
    })
  ).optional(),
})

/**
 * API 完整响应
 */
export const ApiResponseSchema = <T extends z.ZodType>(
  dataSchema: T
) =>
  z.discriminatedUnion("success", [
    ApiSuccessSchema(dataSchema),
    ApiErrorSchema,
  ])

/**
 * TypeScript 类型
 */
export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiError = z.infer<typeof ApiErrorSchema>

export type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiError