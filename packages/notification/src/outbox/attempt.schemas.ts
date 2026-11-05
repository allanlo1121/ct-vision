import { z } from "zod"

import { auditSchema, codeSchema, jsonObjectSchema, notificationAttemptStatusSchema, nonNegativeIntSchema, serialIdSchema, timestampSchema, uuidSchema, notificationChannelSchema, positiveIntSchema, } from "@workspace/shared"


/**
 * 通知事件 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const notificationAttemptBaseSchema = z.object({
  id: serialIdSchema,
  outbox_id: serialIdSchema,
  attempt_no: positiveIntSchema,
  status: notificationAttemptStatusSchema,
  provider_message_id: z.string().nullable(),
  response_code: z.string().nullable(),
  error_message: z.string().nullable(),
  started_at: timestampSchema,
  finished_at: timestampSchema

})

export const notificationAttemptSchema = notificationAttemptBaseSchema
export const createNotificationAttemptSchema = notificationAttemptBaseSchema.omit({
  id: true,
  started_at: true,
  finished_at: true
})

/**
 * 更新菜单 Schema
 *
 * 支持部分字段更新
 */
export const updateNotificationAttemptSchema = notificationAttemptBaseSchema.omit({
  id: true,
}).partial()

/**
 * 导入菜单 Schema
 *
 * 不要求提供数据库生成的 ID 和审计字段
 * 复用创建菜单的验证规则
 */
export const importNotificationAttemptSchema = createNotificationAttemptSchema

/**
 * Types
 */

// 数据库完整实体
export type NotificationAttempt = z.infer<typeof notificationAttemptSchema>

// 创建输入：允许省略有默认值的字段
export type CreateNotificationAttemptInput = z.input<
  typeof createNotificationAttemptSchema
>

// 创建解析后的数据：默认值已填充
export type CreateNotificationAttemptOutput = z.output<
  typeof createNotificationAttemptSchema
>

// 更新输入
export type UpdateNotificationAttemptInput = z.input<
  typeof updateNotificationAttemptSchema
>

export type UpdateNotificationAttemptOutput = z.output<
  typeof updateNotificationAttemptSchema
>

// 导入输入
export type ImportNotificationAttemptInput = z.input<
  typeof importNotificationAttemptSchema
>

// 菜单字段名
export type NotificationAttemptFields = keyof z.infer<
  typeof notificationAttemptSchema
>

