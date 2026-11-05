import { z } from "zod"

import {
  tbmCodeSchema,
  timestampSchema,
  ringSchema,
  tbmPhaseTypeSchema,
  uuidSchema,
  tbmPhaseChangeTypeSchema,
  tbmRingWarningTypeSchema,
  serialIdSchema,
  auditSchema,
  chainageSchema,
} from "@workspace/shared/schemas"

export const ringPhaseRecordBaseSchema = z.object({
  id: serialIdSchema,
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "所属TBM的唯一编码",
  }),

  tunnel_id: uuidSchema.meta({
    title: "隧道ID",
    description: "所属隧道的唯一ID",
  }),

  ring_no: ringSchema.meta({
    title: "环号",
    description: "掘进环号",
  }),

  start_chainage: chainageSchema,

  tbm_phase_type: tbmPhaseTypeSchema.meta({
    title: "相位类型编码",
    description: "连接状态的相位类型编码",
  }),

  started_at: timestampSchema.meta({
    title: "开始时间",
    description: "连接状态的开始时间",
  }),
  ended_at: timestampSchema.nullable().meta({
    title: "结束时间",
    description: "连接状态的结束时间",
  }),
})

export const ringPhaseRecordSchema = ringPhaseRecordBaseSchema.safeExtend(
  auditSchema.shape
)

export const createRingPhaseRecordSchema = ringPhaseRecordBaseSchema
  .omit({
    id: true,
  })
  .partial({ ended_at: true })

export const updateRingPhaseRecordSchema = ringPhaseRecordSchema
  .omit({
    id: true,
  })
  .partial()

export type RingPhaseRecord = z.infer<typeof ringPhaseRecordSchema>

export type RingPhaseRecordBase = z.infer<typeof ringPhaseRecordBaseSchema>

export type CreateRingPhaseRecordInput = z.input<
  typeof createRingPhaseRecordSchema
>

export type UpdateRingPhaseRecordInput = z.input<
  typeof updateRingPhaseRecordSchema
>

export type RingPhaseRecordFields = keyof z.infer<typeof ringPhaseRecordSchema>

export const applyRingPhaseSchema = ringPhaseRecordBaseSchema
  .pick({
    tbm_code: true,
    tunnel_id: true,
    ring_no: true,
    tbm_phase_type: true,
    start_chainage: true,
    started_at: true,
  })
  .extend({})

export type ApplyRingPhaseInput = z.infer<typeof applyRingPhaseSchema>

export const applyRingPhaseResultSchema = z.object({
  inserted: z.boolean(),

  ringChanged: z.boolean(),
  phaseChanged: z.boolean(),
  ringDelta: z.number().nullable(),
  error: z.string().nullable()

})

export type ApplyRingPhaseResult = z.infer<typeof applyRingPhaseResultSchema>
