import { z } from "zod"
import {
  uuidSchema,
  nameSchema,
  sortOrderSchema,
  isDisabledSchema,
  auditSchema,
  positiveIntSchema,
  codeSchema,
  latitudeSchema,
  longitudeSchema,
  masterDataCodeSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const riskBaseSchema = z.object({
  id: uuidSchema,

  tunnel_id: uuidSchema.meta({
    title: "所属隧道ID",
  }),

  name: nameSchema.meta({
    title: "风险名称",
    description: "风险的名称",
  }),

  description: z.string().nullable().meta({
    title: "风险描述",
    description: "隧道的风险描述",
  }),
  risk_level_code: masterDataCodeSchema.meta({
    title: "风险等级",
    description: "隧道的风险等级",
  }),

  start_chainage: z.number().meta({
    title: "起始里程",
    description: "隧道的起始里程",
  }),

  end_chainage: z.number().meta({
    title: "结束里程",
    description: "隧道的结束里程",
  }),

  latitude: latitudeSchema.nullable().meta({
    title: "纬度",
  }),

  longitude: longitudeSchema.nullable().meta({
    title: "经度",
  }),

  is_disabled: isDisabledSchema.meta({
    title: "是否禁用",
    description: "隧道的风险是否被禁用",
  }),
})

export const riskSchema = riskBaseSchema.safeExtend(auditSchema.shape)

export const createRiskSchema = riskBaseSchema.omit({
  id: true,
  is_disabled: true,
})

export const updateRiskSchema = riskSchema
  .omit({
    id: true,
  })
  .partial()

export const importRiskSchema = riskSchema.omit({
  id: true,
  tunnel_id: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Risk = z.infer<typeof riskSchema>

export type RiskBase = z.infer<typeof riskBaseSchema>

export type CreateRiskInput = z.input<typeof createRiskSchema>

export type CreateRiskOutput = z.output<typeof createRiskSchema>

export type ImportRiskInput = z.input<typeof importRiskSchema>
export type ImportRiskOutput = z.output<typeof importRiskSchema>

export type UpdateRiskInput = z.input<typeof updateRiskSchema>
export type UpdateRiskOutput = z.output<typeof updateRiskSchema>

export type RiskFields = keyof z.infer<typeof riskSchema>
