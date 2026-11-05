import { z } from "zod"

import {
  tbmCodeSchema,
  timestampSchema,
  ringSchema,
  tbmPhaseTypeSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const tbmOperatingStatusBaseSchema = z.object({
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  ring_no: ringSchema.nullable().meta({
    title: "环号",
    description: "掘进环号",
  }),

  chainage: z.number().nullable().meta({
    title: "里程",
    description: "TBM当前里程",
  }),

  tbm_phase_type: tbmPhaseTypeSchema.meta({
    title: "相位类型编码",
    description: "连接状态的相位类型编码",
  }),
  thrust_speed: z.number().nullable().meta({
    title: "推进速度",
    description: "TBM推进速度",
  }),
  thrust_pressure: z.number().nullable().meta({
    title: "推进压力",
    description: "TBM推进压力",
  }),
  thrust_cylinder_stroke: z.number().nullable().meta({
    title: "推进缸行程",
    description: "TBM推进缸行程",
  }),
  cutter_speed: z.number().nullable().meta({
    title: "刀盘转速",
    description: "TBM刀盘转速",
  }),
  cutter_torque: z.number().nullable().meta({
    title: "刀盘扭矩",
    description: "TBM刀盘扭矩",
  }),
  penetration_rate: z.number().nullable().meta({
    title: "掘进速度",
    description: "TBM掘进速度",
  }),
  total_thrust: z.number().nullable().meta({
    title: "总推进力",
    description: "TBM总推进力",
  }),
  sampled_at: timestampSchema.meta({
    title: "采样时间",
    description: "TBM状态的采样时间",
  }),
})

export const tbmOperatingStatusSchema = tbmOperatingStatusBaseSchema.safeExtend(
  {
    created_at: timestampSchema.meta({
      title: "创建时间",
      description: "TBM状态的创建时间",
    }),
    updated_at: timestampSchema.meta({
      title: "更新时间",
      description: "TBM状态的更新时间",
    }),
  }
)

export const createTbmOperatingStatusSchema = tbmOperatingStatusBaseSchema

export const updateTbmOperatingStatusSchema = tbmOperatingStatusBaseSchema
  .omit({
    tbm_code: true,
  })
  .partial()

export type TbmOperatingStatus = z.infer<typeof tbmOperatingStatusBaseSchema>

export type TbmOperatingStatusBase = z.infer<
  typeof tbmOperatingStatusBaseSchema
>

export type CreateTbmOperatingStatusInput = z.input<
  typeof createTbmOperatingStatusSchema
>

export type CreateTbmOperatingStatusOutput = z.output<
  typeof createTbmOperatingStatusSchema
>

export type UpdateTbmOperatingStatusInput = z.input<
  typeof updateTbmOperatingStatusSchema
>
export type UpdateTbmOperatingStatusOutput = z.output<
  typeof updateTbmOperatingStatusSchema
>

export type TbmOperatingStatusFields = keyof z.infer<
  typeof tbmOperatingStatusSchema
>
