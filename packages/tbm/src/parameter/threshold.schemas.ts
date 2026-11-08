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
  codeSchema,
  nonNegativeIntSchema,
  parameterDataTypeSchema
} from "@workspace/shared/schemas"

import type { ParameterCode, SeverityCode, TbmCode } from "@workspace/shared/schemas"
import { parameterBaseSchema } from "./schemas";
import { tbmParameterSchema } from "./tbm-parameter.schemas"

/**
 * 参数阀值基础字段规则
 */
export const parameterThresholdBaseSchema = z.object({

  parameter_code: codeSchema,

  threshold_type: thresholdTypeSchema,

  severity_code: masterDataCodeSchema,

  reference_value: z.number().nullable(),
  threshold_value: z.number(),

  min_record_delta: z.number().min(0).meta({
    title: "最小记录波动值",
    description: "与上一条报警记录的数值差达到此值时新增记录，0表示不启用",
  }),

  min_record_interval_seconds: z.int32().nonnegative().meta({
    title: "最小记录间隔",
    description: "距离上一条报警记录达到指定秒数时新增记录，0表示不启用",
  }),


  remark: z.string().max(50, { message: "描述最多50个字符" }).nullable().meta({
    title: "描述",
    description: "参数阀值的描述",
  }),

  is_disabled: isDisabledSchema,
})

/**
 * 通用参数阈值
 */
export const parameterThresholdDefaultBaseSchema =
  parameterThresholdBaseSchema.safeExtend({
    id: serialIdSchema,
    parameter_code: z.string(),
  })

export const parameterThresholdDefaultSchema = parameterThresholdDefaultBaseSchema.safeExtend(
  auditSchema.shape
)

export const parameterThresholdDefaultWithBaseSchema = parameterThresholdDefaultSchema.safeExtend({
  parameter: parameterBaseSchema
})

export const createParameterThresholdDefaultSchema =
  parameterThresholdDefaultBaseSchema
    .omit({
      id: true,
      is_disabled: true,
    })
export const updateParameterThresholdDefaultSchema = parameterThresholdDefaultSchema
  .omit({
    id: true
  })
  .partial()

export const importParameterThresholdDefaultSchema = parameterThresholdDefaultSchema.omit({
  id: true,
  is_disabled: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type ParameterThresholdDefault = z.infer<typeof parameterThresholdDefaultSchema>

export type ParameterThresholdDefaultWithBase = z.infer<typeof parameterThresholdDefaultWithBaseSchema>

export type ParameterThresholdDefaultBase = z.infer<
  typeof parameterThresholdDefaultBaseSchema
>

export type CreateParameterThresholdDefaultInput = z.input<
  typeof createParameterThresholdDefaultSchema
>

export type CreateParameterThresholdDefaultOutput = z.output<
  typeof createParameterThresholdDefaultSchema
>

export type ImportParameterThresholdDefaultInput = z.input<
  typeof importParameterThresholdDefaultSchema
>
export type ImportParameterThresholdDefaultOutput = z.output<
  typeof importParameterThresholdDefaultSchema
>

export type UpdateParameterThresholdDefaultInput = z.input<
  typeof updateParameterThresholdDefaultSchema
>
export type UpdateParameterThresholdDefaultOutput = z.output<
  typeof updateParameterThresholdDefaultSchema
>

export type ParameterThresholdDefaultFields = keyof z.infer<
  typeof parameterThresholdDefaultSchema
>


/**
 * tbm 专属阀值字段规则
 */
export const tbmParameterThresholdBaseSchema = parameterThresholdBaseSchema.omit({
  parameter_code: true
}).safeExtend({
  id: serialIdSchema,
  tbm_parameter_id: serialIdSchema,
  tunnel_id: uuidSchema.nullable(),
  start_ring: ringSchema,
  end_ring: ringSchema,

})


export const tbmParameterThresholdSchema = tbmParameterThresholdBaseSchema.safeExtend(
  auditSchema.shape
)

export const tbmParameterThresholdWithBaseSchema =
  tbmParameterThresholdSchema.safeExtend({
    tbm_parameter: tbmParameterSchema.safeExtend({
      parameter: parameterBaseSchema,
    }),
  })

export const createTbmParameterThresholdSchema =
  tbmParameterThresholdBaseSchema
    .omit({
      id: true,
      is_disabled: true,
    })
export const updateTbmParameterThresholdSchema = tbmParameterThresholdSchema
  .omit({
    id: true,
    tbm_parameter_id: true,
  })
  .partial()

export const importTbmParameterThresholdSchema = tbmParameterThresholdSchema.omit({
  id: true,
  is_disabled: true,
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type TbmParameterThreshold = z.infer<typeof tbmParameterThresholdSchema>

export type TbmParameterThresholdWithBase = z.infer<typeof tbmParameterThresholdWithBaseSchema>

export type TbmParameterThresholdBase = z.infer<
  typeof tbmParameterThresholdBaseSchema
>

export type CreateTbmParameterThresholdInput = z.input<
  typeof createTbmParameterThresholdSchema
>

export type CreateTbmParameterThresholdOutput = z.output<
  typeof createTbmParameterThresholdSchema
>

export type ImportTbmParameterThresholdInput = z.input<
  typeof importTbmParameterThresholdSchema
>
export type ImportTbmParameterThresholdOutput = z.output<
  typeof importTbmParameterThresholdSchema
>

export type UpdateTbmParameterThresholdInput = z.input<
  typeof updateTbmParameterThresholdSchema
>
export type UpdateTbmParameterThresholdOutput = z.output<
  typeof updateTbmParameterThresholdSchema
>

export type ParameterThresholdFields = keyof z.infer<
  typeof tbmParameterThresholdSchema
>

export const parameterRuleSnapshotSchema = tbmParameterThresholdBaseSchema.pick({
  start_ring: true,
  end_ring: true,
  threshold_type: true,
  reference_value: true,
  threshold_value: true,
})

export const thresholdRuleSchema = tbmParameterThresholdBaseSchema
  .pick({
    start_ring: true,
    end_ring: true,
    threshold_type: true,
    reference_value: true,
    threshold_value: true,
    min_record_delta: true,
    min_record_interval_seconds: true,
    severity_code: true
  }).extend({
    start_ring: ringSchema.nullable(),
    end_ring: ringSchema.nullable(),
    parameter_code: codeSchema,
    parameter_name: z.string(),
    parameter_unit: z.string(),
    severity_name: z.string(),
    digits: nonNegativeIntSchema.nullable()
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


export const tbmThresholdRuleListSchema = tbmThresholdRuleSchema.safeExtend({
  subsystem_code: codeSchema,
  value_max: z.number().nullable(),
  value_min: z.number().nullable(),
  data_type: parameterDataTypeSchema,

})

export type TbmThresholdRuleList = z.infer<typeof tbmThresholdRuleListSchema>

















