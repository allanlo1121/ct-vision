import { z } from "zod"

import {
  serialIdSchema,
  uuidSchema,
  tbmCodeSchema,
  timestampSchema,
  ringSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const ringRecordBaseSchema = z.object({
  id: serialIdSchema.meta({
    title: "ID",
    description: "记录的唯一ID",
  }),
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  tunnel_id: uuidSchema.meta({
    title: "隧道ID",
    description: "所属隧道的唯一ID",
  }),

  ring_no: ringSchema.meta({
    title: "环号",
    description: "掘进环号",
  }),

  start_chainage: z.number().nullable().meta({
    title: "起始里程",
    description: "连接状态的起始里程",
  }),

  end_chainage: z.number().nullable().meta({
    title: "结束里程",
    description: "连接状态的结束里程",
  }),

  started_at: timestampSchema.nullable().meta({
    title: "开始时间",
    description: "连接状态的开始时间",
  }),
  ended_at: timestampSchema.nullable().meta({
    title: "结束时间",
    description: "连接状态的结束时间",
  }),
})

export const ringRecordSchema = ringRecordBaseSchema.safeExtend({
  created_at: timestampSchema.meta({
    title: "创建时间",
    description: "连接状态历史的创建时间",
  }),
  updated_at: timestampSchema.nullable().meta({
    title: "更新时间",
    description: "连接状态历史的更新时间",
  }),
})

export const createRingRecordSchema = ringRecordBaseSchema.omit({
  id: true,
})

export const updateRingRecordSchema = ringRecordBaseSchema
  .omit({
    tbm_code: true,
  })
  .partial()

export type RingRecord = z.infer<typeof ringRecordBaseSchema>

export type RingRecordBase = z.infer<typeof ringRecordBaseSchema>

export type CreateRingRecordInput = z.input<typeof createRingRecordSchema>

export type CreateRingRecordOutput = z.output<typeof createRingRecordSchema>

export type UpdateRingRecordInput = z.input<typeof updateRingRecordSchema>
export type UpdateRingRecordOutput = z.output<typeof updateRingRecordSchema>

export type RingRecordFields = keyof z.infer<typeof ringRecordSchema>
