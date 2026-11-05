import { z } from "zod"

import { auditSchema, codeSchema, jsonObjectSchema, notificationDeliveryStatusSchema, nonNegativeIntSchema, serialIdSchema, timestampSchema, uuidSchema, notificationChannelSchema, positiveIntSchema, } from "@workspace/shared"


/**
 * 通知事件 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const notificationOutboxBaseSchema = z.object({
  id: serialIdSchema,
  event_id: serialIdSchema,
  rule_id: serialIdSchema.nullable(),
  channel: notificationChannelSchema,
  recipient: z.string(),
  title: z.string(),
  content: z.string(),
  dedup_key: z.string(),
  status: notificationDeliveryStatusSchema,
  attempt_count: positiveIntSchema,
  next_retry_at: timestampSchema.nullable(),
  last_error: z.string().nullable(),
  processing_at: timestampSchema.nullable(),
  sent_at: timestampSchema.nullable(),
  provider_message_id: z.string().nullable()

})

export const notificationOutboxSchema = notificationOutboxBaseSchema.safeExtend({
  created_at: timestampSchema,
  updated_at: timestampSchema
})
export const createNotificationOutboxSchema = notificationOutboxBaseSchema.omit({
  id: true,
  next_retry_at: true,
  last_error: true,
  processing_at: true,
  sent_at: true,
  provider_message_id: true
}).extend({
  status:notificationDeliveryStatusSchema.default("pending"),
  rule_id: z.number().nullable().optional(),
  attempt_count: positiveIntSchema.default(0)
})

/**
 * 更新菜单 Schema
 *
 * 支持部分字段更新
 */
export const updateNotificationOutboxSchema = notificationOutboxBaseSchema.omit({
  id: true,
}).partial()

/**
 * 导入菜单 Schema
 *
 * 不要求提供数据库生成的 ID 和审计字段
 * 复用创建菜单的验证规则
 */
export const importNotificationOutboxSchema = createNotificationOutboxSchema

/**
 * Types
 */

// 数据库完整实体
export type NotificationOutbox = z.infer<typeof notificationOutboxSchema>

// 创建输入：允许省略有默认值的字段
export type CreateNotificationOutboxInput = z.input<
  typeof createNotificationOutboxSchema
>

// 创建解析后的数据：默认值已填充
export type CreateNotificationOutboxOutput = z.output<
  typeof createNotificationOutboxSchema
>

// 更新输入
export type UpdateNotificationOutboxInput = z.input<
  typeof updateNotificationOutboxSchema
>

export type UpdateNotificationOutboxOutput = z.output<
  typeof updateNotificationOutboxSchema
>

// 导入输入
export type ImportNotificationOutboxInput = z.input<
  typeof importNotificationOutboxSchema
>

// 菜单字段名
export type NotificationOutboxFields = keyof z.infer<
  typeof notificationOutboxSchema
>

