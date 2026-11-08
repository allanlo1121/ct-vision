import { z } from "zod"
import {
  nameSchema,
  codeSchema,
  isDisabledSchema,
  auditSchema,
  sortOrderSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const subsystemBaseSchema = z.object({
  code: codeSchema,

  name: nameSchema.meta({
    title: "TBM子系统名称",
    description: "TBM子系统的名称",
  }),

  description: z
    .string()
    .max(255, { message: "描述最多255个字符" })
    .nullable()
    .meta({
      title: "描述",
      description: "TBM子系统的描述",
    }),

  is_disabled: isDisabledSchema,
  sort_order: sortOrderSchema
})

export const subsystemSchema = subsystemBaseSchema.safeExtend(auditSchema.shape)

export const createSubsystemSchema = subsystemBaseSchema
  .omit({
    is_disabled: true,
  })
  .partial({
    description: true,
  })

export const updateSubsystemSchema = subsystemSchema
  .omit({
    code: true
  })
  .partial()

export const importSubsystemSchema = subsystemSchema.omit({
  code: true,
  is_disabled: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Subsystem = z.infer<typeof subsystemSchema>

export type SubsystemBase = z.infer<typeof subsystemBaseSchema>

export type CreateSubsystemInput = z.input<typeof createSubsystemSchema>

export type CreateSubsystemOutput = z.output<typeof createSubsystemSchema>

export type ImportSubsystemInput = z.input<typeof importSubsystemSchema>
export type ImportSubsystemOutput = z.output<typeof importSubsystemSchema>

export type UpdateSubsystemInput = z.input<typeof updateSubsystemSchema>
export type UpdateSubsystemOutput = z.output<typeof updateSubsystemSchema>

export type SubsystemFields = keyof z.infer<typeof subsystemSchema>
