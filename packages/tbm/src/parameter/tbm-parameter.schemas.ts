import { z } from "zod"
import {
  serialIdSchema,
  nameSchema,
  codeSchema,
  isDisabledSchema,
  auditSchema,
  tbmCodeSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const tbmParameterBaseSchema = z.object({
  id: serialIdSchema,
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  parameter_code: codeSchema.meta({
    title: "参数编码",
    description: "主数据-参数-PARAMETER-XXXX",
  }),
  custom_name: nameSchema.nullable().meta({
    title: "自定义参数名称",
    description: "自定义参数的名称",
  }),
  custom_unit: z
    .string()
    .max(50, { message: "自定义单位最多50个字符" })
    .nullable()
    .meta({
      title: "自定义单位",
      description: "自定义参数的单位",
    }),
  value_max: z.number().nullable().meta({
    title: "最大值",
    description: "参数的最大值",
  }),
  value_min: z.number().nullable().meta({
    title: "最小值",
    description: "参数的最小值",
  }),

  remark: z.string().max(50, { message: "备注最多50个字符" }).nullable().meta({
    title: "备注",
    description: "参数的备注信息",
  }),

  is_disabled: isDisabledSchema,
})

export const tbmParameterSchema = tbmParameterBaseSchema.safeExtend(
  auditSchema.shape
)

export const createTbmParameterSchema = tbmParameterBaseSchema
  .omit({
    id: true,
    is_disabled: true,
  })
  .partial({
    custom_name: true,
    custom_unit: true,
    value_max: true,
    value_min: true,
    remark: true,
  })

export const updateTbmParameterSchema = tbmParameterBaseSchema
  .omit({
    id: true,
  })
  .partial()

export const importTbmParameterSchema = tbmParameterSchema.omit({
  id: true,
  tbm_code: true,
  is_disabled: true,
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type TbmParameter = z.infer<typeof tbmParameterBaseSchema>

export type TbmParameterBase = z.infer<typeof tbmParameterBaseSchema>

export type CreateTbmParameterInput = z.input<typeof createTbmParameterSchema>

export type CreateTbmParameterOutput = z.output<typeof createTbmParameterSchema>

export type ImportTbmParameterInput = z.input<typeof importTbmParameterSchema>
export type ImportTbmParameterOutput = z.output<typeof importTbmParameterSchema>

export type UpdateTbmParameterInput = z.input<typeof updateTbmParameterSchema>
export type UpdateTbmParameterOutput = z.output<typeof updateTbmParameterSchema>

export type TbmParameterFields = keyof z.infer<typeof tbmParameterSchema>
