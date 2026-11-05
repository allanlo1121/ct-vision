
import { z } from "zod"

export const notificationEventLevelSchema = z.enum([
    "info",
    "warning",
    "error",
    "critical"
])

export type NotificationEventLevel = z.infer<
    typeof notificationEventLevelSchema
>

export const NotificationEventLevelLabels: Record<
    NotificationEventLevel,
    string
> = {
    info: "信息",
    warning: "警告",
    error: "报错",
    critical: "紧急"
}

export const NotificationEventLevelOptions =
    notificationEventLevelSchema.options.map((value) => ({
        value,
        label: NotificationEventLevelLabels[value],
    }))

export const notificationLevelOrder = {
    info: 0,
    warning: 1,
    error: 2,
    critical: 3,
} as const



export function isLevelMatched(
    eventLevel: NotificationEventLevel,
    minLevel: NotificationEventLevel
): boolean {
    return (
        notificationLevelOrder[eventLevel] >=
        notificationLevelOrder[minLevel]
    )
}

// 获取所有符合条件的最低等级
export function getMatchingMinLevels(
    level: NotificationEventLevel
): NotificationEventLevel[] {
    return notificationEventLevelSchema.options.filter(
        (minLevel) => isLevelMatched(level, minLevel)
    )
}


export const notificationChannelSchema = z.enum([
    "wecom",
    "sms",
    "in_app"
])

export type NotificationChannel = z.infer<
    typeof notificationChannelSchema
>

export const NotificationChannelLabels: Record<
    NotificationChannel,
    string
> = {
    wecom: "企业微信",
    sms: "短信",
    in_app: "站内信息"
}

export const NotificationChannelOptions =
    notificationChannelSchema.options.map((value) => ({
        value,
        label: NotificationChannelLabels[value],
    }))

export const notificationDeliveryStatusSchema = z.enum([
    "pending",
    "processing",
    "sent",
    "failed",
]).meta({
    title: "发送状态",
    description: "通知消息的发送处理状态",
})

export type NotificationDeliveryStatus =
    z.infer<typeof notificationDeliveryStatusSchema>


export const NotificationDeliveryStatusLabels = {
    pending: "待发送",
    processing: "发送中",
    sent: "已发送",
    failed: "发送失败",
} as const satisfies Record<NotificationDeliveryStatus, string>

export const NotificationDeliveryStatusOptions =
    notificationDeliveryStatusSchema.options.map((value) => ({
        value,
        label: NotificationDeliveryStatusLabels[value],
    }))


export const notificationAttemptStatusSchema = z
    .enum([
        "sending",
        "success",
        "failed",
    ])
    .meta({
        title: "发送尝试状态",
        description: "单次通知发送尝试的状态",
    })

export type NotificationAttemptStatus =
    z.infer<typeof notificationAttemptStatusSchema>


export const NotificationAttemptStatusLabels = {
    sending: "发送中",
    success: "发送成功",
    failed: "发送失败",
} as const satisfies Record<NotificationAttemptStatus, string>