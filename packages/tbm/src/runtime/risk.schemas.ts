import { z } from "zod"

import {
  uuidSchema,
  tbmCodeSchema,
  timestampSchema,
  ringSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const tunnelRiskStateBaseSchema = z.object({
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  risk_id: uuidSchema.meta({
    title: "隧道ID",
    description: "所属隧道的唯一ID",
  }),

  ring_no: ringSchema.nullable().meta({
    title: "环号",
    description: "掘进环号",
  }),

  chainage: z.number().nullable().meta({
    title: "里程",
    description: "当前里程",
  }),

  enter_distance: z.number().nullable().meta({
    title: "距离风险距离",
    description: "距离风险距离",
  }),

  exit_distance: z.number().nullable().meta({
    title: "脱离风险距离",
    description: "脱离风险距离",
  }),
})

export const tunnelRiskStateSchema = tunnelRiskStateBaseSchema.safeExtend({
  updated_at: timestampSchema.meta({
    title: "更新时间",
    description: "连接状态历史的更新时间",
  }),
})

export const createTunnelRiskStateSchema = tunnelRiskStateBaseSchema

export const updateTunnelRiskStateSchema = tunnelRiskStateBaseSchema
  .omit({
    tbm_code: true,
    risk_id: true,
  })
  .partial()

export type TunnelRiskState = z.infer<typeof tunnelRiskStateBaseSchema>

export type TunnelRiskStateBase = z.infer<typeof tunnelRiskStateBaseSchema>

export type CreateTunnelRiskStateInput = z.input<
  typeof createTunnelRiskStateSchema
>

export type CreateTunnelRiskStateOutput = z.output<
  typeof createTunnelRiskStateSchema
>

export type UpdateTunnelRiskStateInput = z.input<
  typeof updateTunnelRiskStateSchema
>
export type UpdateTunnelRiskStateOutput = z.output<
  typeof updateTunnelRiskStateSchema
>

export type TunnelRiskStateFields = keyof z.infer<typeof tunnelRiskStateSchema>
