import { z } from "zod"
import {
  isDisabledSchema,
  auditSchema,
  serialIdSchema,
  tbmCodeSchema,
  sortOrderSchema,
} from "@workspace/shared/schemas"

import { mqttPermissionSchema, mqttActionSchema } from "@workspace/shared"

/**
 * 基础字段规则
 */
export const mqttAclBaseSchema = z.object({
  id: serialIdSchema,
  username: tbmCodeSchema,
  permission: mqttPermissionSchema,
  action: mqttActionSchema,
  topic: z.string().max(200, { message: "主题最多200个字符" }).meta({
    title: "主题",
    description: "MQTT主题",
  }),

  sort_order: sortOrderSchema,
  is_disabled: isDisabledSchema,
})

export const mqttAclSchema = mqttAclBaseSchema.safeExtend(auditSchema.shape)

export const createMqttAclSchema = mqttAclBaseSchema.omit({
  id: true,
  is_disabled: true,
})

export const updateMqttAclSchema = mqttAclSchema
  .omit({
    id: true,
  })
  .partial()

export type MqttAcl = z.infer<typeof mqttAclSchema>

export type MqttAclBase = z.infer<typeof mqttAclBaseSchema>

export type CreateMqttAclInput = z.input<typeof createMqttAclSchema>

export type CreateMqttAclOutput = z.output<typeof createMqttAclSchema>

export type UpdateMqttAclInput = z.input<typeof updateMqttAclSchema>
export type UpdateMqttAclOutput = z.output<typeof updateMqttAclSchema>

export type MqttAclFields = keyof z.infer<typeof mqttAclSchema>
