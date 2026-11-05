import { z } from "zod"

export const mqttPermissionSchema = z.enum(["allow", "deny"])

export type MqttPermission = z.infer<typeof mqttPermissionSchema>

export const mqttPermissionLabels: Record<MqttPermission, string> = {
  allow: "允许",
  deny: "拒绝",
}

export const mqttPermissionOptions = Object.entries(mqttPermissionLabels).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export const mqttActionSchema = z.enum(["publish", "subscribe", "all"])

export type MqttAction = z.infer<typeof mqttActionSchema>

export const mqttActionLabels: Record<MqttAction, string> = {
  publish: "发布",
  subscribe: "订阅",
  all: "全部",
}

export const mqttActionOptions = mqttActionSchema.options.map(
  (value) => ({
    value,
    label: mqttActionLabels[value],
  })
)