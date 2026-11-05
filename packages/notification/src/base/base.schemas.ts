import { z } from "zod"

import { codeSchema, descriptionSchema, nameSchema, sortOrderSchema, isDisabledSchema, notificationEventLevelSchema } from "@workspace/shared"

/**
 * 通知事件来源 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const notificationSourceSchema = z.object({
    code: codeSchema,
    name: nameSchema,
    description: descriptionSchema,
    sort_order: sortOrderSchema,
    is_disabled: isDisabledSchema
})

export type NotificationSource = z.infer<typeof notificationEventLevelSchema>


export const createNotificationSourceSchema = notificationSourceSchema.extend({
    is_disabled: isDisabledSchema.default(false),
})

export type CreateNotificationSourceInput =
    z.input<typeof createNotificationSourceSchema>

export type CreateNotificationSourceOutput =
    z.output<typeof createNotificationSourceSchema>

export const updateNotificationSourceSchema = notificationSourceSchema.omit({
    code: true
})

export type UpdateNotificationSourceInput =
    z.input<typeof updateNotificationSourceSchema>

export type UpdateNotificationSourceOutput =
    z.output<typeof updateNotificationSourceSchema>


/**
 * 通知事件类型 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */

export const notificationEventTypeSchema = z.object({
    code: codeSchema,
    name: nameSchema,
    description: descriptionSchema,
    default_level: notificationEventLevelSchema,
    sort_order: sortOrderSchema,
    is_disabled: isDisabledSchema
})


export type NotificationEventType = z.infer<typeof notificationEventLevelSchema>


export const createNotificationEventTypeSchema = notificationEventTypeSchema.extend({
    is_disabled: isDisabledSchema.default(false),
})

export type CreateNotificationEventTypeInput =
    z.input<typeof createNotificationEventTypeSchema>

export type CreateNotificationEventTypeOutput =
    z.output<typeof createNotificationEventTypeSchema>

export const updateNotificationEventTypeSchema = notificationEventTypeSchema.omit({
    code: true
})

export type UpdateNotificationEventTypeInput =
    z.input<typeof updateNotificationEventTypeSchema>

export type UpdateNotificationEventTypeOutput =
    z.output<typeof updateNotificationEventTypeSchema>