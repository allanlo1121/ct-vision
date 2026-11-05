import { z } from "zod"

import { auditSchema, serialIdSchema, isDisabledSchema, nameSchema, descriptionSchema, notificationChannelSchema, sortOrderSchema } from "@workspace/shared"



/**
 * 通知事件信息模版 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */

export const notificationTemplateBaseSchema = z.object({
  id: serialIdSchema,
  name: nameSchema,
  description: descriptionSchema,
  channel: notificationChannelSchema,
  title_template: z.string().min(1),
  body_template: z.string().min(1),
  sort_order: sortOrderSchema,
  is_disabled: isDisabledSchema

})

export type NotificationTemplateBase = z.infer<typeof notificationTemplateBaseSchema>

export const notificationTemplateSchema = notificationTemplateBaseSchema.safeExtend(auditSchema.shape)

// 数据库完整实体
export type NotificationTemplate = z.infer<typeof notificationTemplateSchema>

// 创建输入：允许省略有默认值的字段

export const createNotificationTemplateSchema = notificationTemplateBaseSchema.omit({
  id: true,
})


export type CreateNotificationTemplateInput = z.input<
  typeof createNotificationTemplateSchema
>

// 创建解析后的数据：默认值已填充
export type CreateNotificationTemplateOutput = z.output<
  typeof createNotificationTemplateSchema
>
export const updateNotificationTemplateSchema = notificationTemplateBaseSchema.omit({
  id: true,
})

// 更新输入
export type UpdateNotificationTemplateInput = z.input<
  typeof updateNotificationTemplateSchema
>

export type UpdateNotificationTemplateOutput = z.output<
  typeof updateNotificationTemplateSchema
>

// 菜单字段名
export type NotificationTemplateFields = keyof z.infer<
  typeof notificationTemplateSchema
>

