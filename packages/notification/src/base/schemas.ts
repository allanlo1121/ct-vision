import { z } from "zod"

import { auditSchema, codeSchema, jsonObjectSchema, notificationEventLevelSchema, nonNegativeIntSchema, serialIdSchema, timestampSchema, uuidSchema } from "@workspace/shared"


/**
 * 通知事件 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const notificationEventBaseSchema = z.object({
  id: serialIdSchema,
  source_type_code: codeSchema,
  source_id: z.string().min(1),
  event_type_code: codeSchema,
  level: notificationEventLevelSchema,
  organization_id: uuidSchema.nullable(),
  project_id: uuidSchema.nullable(),
  payload: jsonObjectSchema,
  occurred_at: timestampSchema,
  processed_at: timestampSchema.nullable(),
  processing_error: z.string().nullable(),
  retry_count: nonNegativeIntSchema
})

export const notificationEventSchema = notificationEventBaseSchema.safeExtend(auditSchema.shape)
export const createNotificationEventSchema = notificationEventBaseSchema.omit({
  id: true,
})

/**
 * 更新菜单 Schema
 *
 * 支持部分字段更新
 */
export const updateNotificationEventSchema = notificationEventBaseSchema.omit({
  id: true,
}).partial()

/**
 * 导入菜单 Schema
 *
 * 不要求提供数据库生成的 ID 和审计字段
 * 复用创建菜单的验证规则
 */
export const importNotificationEventSchema = createNotificationEventSchema

/**
 * Types
 */

// 数据库完整实体
export type NotificationEvent = z.infer<typeof notificationEventSchema>

// 创建输入：允许省略有默认值的字段
export type CreateNotificationEventInput = z.input<
  typeof createNotificationEventSchema
>

// 创建解析后的数据：默认值已填充
export type CreateNotificationEventOutput = z.output<
  typeof createNotificationEventSchema
>

// 更新输入
export type UpdateNotificationEventInput = z.input<
  typeof updateNotificationEventSchema
>

export type UpdateNotificationEventOutput = z.output<
  typeof updateNotificationEventSchema
>

// 导入输入
export type ImportNotificationEventInput = z.input<
  typeof importNotificationEventSchema
>

// 菜单字段名
export type NotificationEventFields = keyof z.infer<
  typeof notificationEventSchema
>




export type NotificationTaskInput = {
  channel: "wecom" | "sms"
  recipient: string
  title: string
  content: string
}
