import { z } from "zod"
import {
  nameSchema,
  codeSchema,
  isDisabledSchema,
  auditSchema,
  sortOrderSchema,
  parameterDataTypeSchema
} from "@workspace/shared/schemas"


/**
 * 基础字段规则
 */
export const parameterBaseSchema = z.object({
  code: codeSchema,

  subsystem_code: codeSchema.meta({
    title: "子系统",
    description: "主数据-子系统-SUBSYSTEM-XXXX",
  }),
  name: nameSchema.meta({
    title: "工点名称",
    description: "工点的名称",
  }),

  data_type: parameterDataTypeSchema,

  digits: z
    .number()
    .int({ message: "小数位数必须为整数" })
    .min(0, { message: "小数位数不能小于0" })
    .nullable()
    .meta({
      title: "小数位数",
      description: "数据的小数位数",
    }),

  unit: z.string().max(50, { message: "单位最多50个字符" }).nullable().meta({
    title: "单位",
    description: "数据的单位",
  }),

  description: z.string().max(200, { message: "描述最多200个字符" }).nullable().meta({
    title: "描述",
    description: "参数的描述",
  }),

  is_disabled: isDisabledSchema,

  sort_order: sortOrderSchema
})

export const parameterSchema = parameterBaseSchema.safeExtend(auditSchema.shape)

export const createParameterSchema = parameterBaseSchema
  .omit({
    is_disabled: true,
  })
  .partial({
    digits: true,
    unit: true,
  })

export const updateParameterSchema = parameterSchema
  .omit({
    code: true,
  })
  .partial()

export const importParameterSchema = parameterSchema.omit({
  code: true,
  subsystem_code: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Parameter = z.infer<typeof parameterSchema>

export type ParameterBase = z.infer<typeof parameterBaseSchema>

export type CreateParameterInput = z.input<typeof createParameterSchema>

export type CreateParameterOutput = z.output<typeof createParameterSchema>

export type ImportParameterInput = z.input<typeof importParameterSchema>
export type ImportParameterOutput = z.output<typeof importParameterSchema>

export type UpdateParameterInput = z.input<typeof updateParameterSchema>
export type UpdateParameterOutput = z.output<typeof updateParameterSchema>

export type ParameterFields = keyof z.infer<typeof parameterSchema>
