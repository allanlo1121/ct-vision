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