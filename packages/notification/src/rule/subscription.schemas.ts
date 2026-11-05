import { z } from "zod"

import { auditSchema, codeSchema,  notificationEventLevelSchema, serialIdSchema, timestampSchema, uuidSchema, isDisabledSchema, scopeTypeSchema,  } from "@workspace/shared"


/**
 * 通知事件订阅 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const notificationSubscriptionBaseSchema = z.object({
  id: serialIdSchema,
  employee_id: uuidSchema,
  source_type_code: codeSchema,
  event_type_code: codeSchema,
  min_level: notificationEventLevelSchema,
  project_id: uuidSchema,
  is_disabled: isDisabledSchema


})


export type NotificationSubscriptionBase = z.infer<typeof notificationSubscriptionBaseSchema>

export const notificationSubscriptionSchema = notificationSubscriptionBaseSchema.safeExtend(auditSchema.shape)

export type NotificationSubscription = z.infer<typeof notificationSubscriptionSchema>

export const createNotificationSubscriptionSchema = notificationSubscriptionBaseSchema.omit({
  id: true,
})

export type CreateNotificationSubscriptionInput = z.input<typeof createNotificationSubscriptionSchema>
export type CreateNotificationSubscriptionOutput = z.output<typeof createNotificationSubscriptionSchema>

export const updateNotificationSubscriptionSchema = notificationSubscriptionBaseSchema.omit({
  id: true,
}).partial()

export type UpdateNotificationSubscriptionInput = z.input<typeof updateNotificationSubscriptionSchema>
export type UpdateNotificationSubscriptionOutput = z.output<typeof updateNotificationSubscriptionSchema>




export const findNotificationRecipientsSchema = notificationSubscriptionBaseSchema.pick(
  {
    source_type_code: true,
    event_type_code: true,
    project_id: true
  }
).safeExtend({
  level: notificationEventLevelSchema
})

export type FindNotificationRecipientsInput = z.input<typeof findNotificationRecipientsSchema>


