import { z } from "zod"
import {
  serialIdSchema,
  isDisabledSchema,
  auditSchema,
  tbmCodeSchema,
  sortOrderSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const mqttUserBaseSchema = z.object({
  id: serialIdSchema,
  username: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  password_hash: z.string().max(255).meta({
    title: "密码哈希",
    description: "用户密码的哈希值",
  }),
  salt: z.string().max(255).meta({
    title: "盐值",
    description: "用于密码哈希的盐值",
  }),
  is_superuser: z.boolean().meta({
    title: "超级用户",
    description: "是否为超级用户",
  }),
  sort_order: sortOrderSchema,
  is_disabled: isDisabledSchema,
})

export const mqttUserSchema = mqttUserBaseSchema
  .omit({ password_hash: true, salt: true })
  .safeExtend(auditSchema.shape)

export const createMqttUserSchema = mqttUserBaseSchema
  .omit({
    id: true,
    is_disabled: true,
    password_hash: true,
    salt: true,
  })
  .safeExtend({
    password: z.string().min(8).max(255).meta({
      title: "密码",
      description: "用户密码",
    }),
  })

export const createMqttUserRecordSchema = mqttUserBaseSchema.omit({
  id: true,
  is_disabled: true,
})

export const updateMqttUserSchema = mqttUserBaseSchema
  .omit({
    id: true
  })
  .partial()

export type MqttUser = z.infer<typeof mqttUserSchema>

export type MqttUserBase = z.infer<typeof mqttUserBaseSchema>

export type CreateMqttUserInput = z.input<typeof createMqttUserSchema>

export type CreateMqttUserOutput = z.output<typeof createMqttUserSchema>

export type CreateMqttUserRecordInput = z.infer<
  typeof createMqttUserRecordSchema
>

export type UpdateMqttUserInput = z.input<typeof updateMqttUserSchema>
export type UpdateMqttUserOutput = z.output<typeof updateMqttUserSchema>

export type MqttUserFields = keyof z.infer<typeof mqttUserSchema>
