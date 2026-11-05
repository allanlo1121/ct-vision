import { z } from "zod"

import { auditSchema, codeSchema, notificationEventLevelSchema, serialIdSchema, isDisabledSchema, nameSchema, descriptionSchema, notificationChannelSchema, sortOrderSchema } from "@workspace/shared"



/**
 * 通知事件规则 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */

export const notificationRuleBaseSchema = z.object({
  id: serialIdSchema,
  name: nameSchema,
  description: descriptionSchema,
  source_type_code: codeSchema,
  event_type_code: codeSchema,
  min_level: notificationEventLevelSchema,
  channel: notificationChannelSchema,
  template_id: serialIdSchema,
  sort_order: sortOrderSchema,
  is_disabled: isDisabledSchema

})

export type NotificationRuleBase = z.infer<typeof notificationRuleBaseSchema>

export const notificationRuleSchema = notificationRuleBaseSchema.safeExtend(auditSchema.shape)

// 数据库完整实体
export type NotificationRule = z.infer<typeof notificationRuleSchema>

// 创建输入：允许省略有默认值的字段

export const createNotificationRuleSchema = notificationRuleBaseSchema.omit({
  id: true,
})


export type CreateNotificationRuleInput = z.input<
  typeof createNotificationRuleSchema
>

// 创建解析后的数据：默认值已填充
export type CreateNotificationRuleOutput = z.output<
  typeof createNotificationRuleSchema
>
export const updateNotificationRuleSchema = notificationRuleBaseSchema.omit({
  id: true,
})

// 更新输入
export type UpdateNotificationRuleInput = z.input<
  typeof updateNotificationRuleSchema
>

export type UpdateNotificationRuleOutput = z.output<
  typeof updateNotificationRuleSchema
>

// 菜单字段名
export type NotificationRuleFields = keyof z.infer<
  typeof notificationRuleSchema
>




export const findNotificationRulesSchema = notificationRuleBaseSchema.pick(
  {
    source_type_code: true,
    event_type_code: true
  }
).safeExtend({
  level: notificationEventLevelSchema
})

export type FindNotificationRulesInput = z.input<typeof findNotificationRulesSchema>