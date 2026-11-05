import { z } from "zod"
import {
  serialIdSchema,
  isDisabledSchema,
  auditSchema,
  uuidSchema,
  ringSchema,
  masterDataCodeSchema,
  thresholdTypeSchema,
  tbmCodeSchema,
  codeSchema
} from "@workspace/shared/schemas"

import type { ParameterCode, SeverityCode, TbmCode } from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const parameterThresholdBaseSchema = z.object({
  id: serialIdSchema,

  tbm_parameter_id: serialIdSchema,

  tunnel_id: uuidSchema.nullable(),

  start_ring: ringSchema,

  end_ring: ringSchema,

  threshold_type: thresholdTypeSchema,

  severity_code: masterDataCodeSchema,

  reference_value: z.number().nullable(),
  threshold_value: z.number(),

  min_record_delta: z.number().min(0).meta({
    title: "最小记录波动值",
    description: "与上一条报警记录的数值差达到此值时新增记录，0表示不启用",
  }),

  min_record_interval_ms: z.int32().nonnegative().meta({
    title: "最小记录间隔",
    description: "距离上一条报警记录达到指定毫秒数时新增记录，0表示不启用",
  }),


  remark: z.string().max(50, { message: "描述最多50个字符" }).nullable().meta({
    title: "描述",
    description: "参数阀值的描述",
  }),

  is_disabled: isDisabledSchema,
})

export const parameterThresholdSchema = parameterThresholdBaseSchema.safeExtend(
  auditSchema.shape
)

export const createParameterThresholdSchema =
  parameterThresholdBaseSchema
    .omit({
      id: true,
      is_disabled: true,
    })
export const updateParameterThresholdSchema = parameterThresholdSchema
  .omit({
    id: true,
    tbm_parameter_id: true,
  })
  .partial()

export const importParameterThresholdSchema = parameterThresholdSchema.omit({
  id: true,
  is_disabled: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type ParameterThreshold = z.infer<typeof parameterThresholdSchema>

export type ParameterThresholdBase = z.infer<
  typeof parameterThresholdBaseSchema
>

export type CreateParameterThresholdInput = z.input<
  typeof createParameterThresholdSchema
>

export type CreateParameterThresholdOutput = z.output<
  typeof createParameterThresholdSchema
>

export type ImportParameterThresholdInput = z.input<
  typeof importParameterThresholdSchema
>
export type ImportParameterThresholdOutput = z.output<
  typeof importParameterThresholdSchema
>

export type UpdateParameterThresholdInput = z.input<
  typeof updateParameterThresholdSchema
>
export type UpdateParameterThresholdOutput = z.output<
  typeof updateParameterThresholdSchema
>

export type ParameterThresholdFields = keyof z.infer<
  typeof parameterThresholdSchema
>

export const parameterRuleSnapshotSchema = parameterThresholdBaseSchema.pick({
  start_ring: true,
  end_ring: true,
  threshold_type: true,
  reference_value: true,
  threshold_value: true,
})

export const thresholdRuleSchema = parameterThresholdBaseSchema
  .pick({
    start_ring: true,
    end_ring: true,
    threshold_type: true,
    reference_value: true,
    threshold_value: true,
    min_record_delta: true,
    min_record_interval_ms: true,
    severity_code: true
  }).safeExtend({
    parameter_code: codeSchema,
    parameter_name: z.string(),
    parameter_unit: z.string(),
    severity_name: z.string()
  })

export type ThresholdRule = z.infer<typeof thresholdRuleSchema>

export const tbmThresholdRuleSchema = thresholdRuleSchema.safeExtend({
  tbm_code: tbmCodeSchema
})

export type TbmThresholdRule = z.infer<typeof tbmThresholdRuleSchema>





// 按报警等级分组
export type ThresholdRulesBySeverity = Partial<
  Record<SeverityCode, ThresholdRule[]>
>

// 按参数编码分组
export type ThresholdRulesByParameter = Record<
  ParameterCode,
  ThresholdRulesBySeverity
>


// 一台 TBM 的所有参数规则
export type ThresholdRulesByTbm = Record<TbmCode, ThresholdRulesByParameter>
