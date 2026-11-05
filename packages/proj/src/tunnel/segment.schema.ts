import { z } from "zod"
import {
  uuidSchema,
  nameSchema,
  sortOrderSchema,
  isDisabledSchema,
  auditSchema,
  positiveIntSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const segmentBaseSchema = z.object({
  id: uuidSchema,

  tunnel_id: uuidSchema.meta({
    title: "所属管片ID",
  }),

  name: nameSchema.meta({
    title: "管片段名称",
    description: "管片段的名称",
  }),

  start_ring: positiveIntSchema.meta({
    title: "起始环号",
    description: "隧道的起始环号",
  }),
  end_ring: positiveIntSchema.meta({
    title: "结束环号",
    description: "隧道的结束环号",
  }),

  ring_width: z.number().nullable().meta({
    title: "环宽",
    description: "隧道的环宽",
  }),

  ring_thickness: z.number().nullable().meta({
    title: "环厚",
    description: "隧道的环厚",
  }),

  inner_diameter: z.number().nullable().meta({
    title: "管片内径",
    description: "管片的内径",
  }),
  outer_diameter: z.number().nullable().meta({
    title: "管片外径",
    description: "管片的外径",
  }),
  sort_order: sortOrderSchema,

  is_disabled: isDisabledSchema,
})

export const segmentSchema = segmentBaseSchema.safeExtend(auditSchema.shape)

export const createSegmentSchema = segmentBaseSchema
  .omit({
    id: true,
    is_disabled: true,
  })
  .partial({
    outer_diameter: true,
  })

export const updateSegmentSchema = segmentSchema
  .omit({
    id: true  
  })
  .partial()

export const importSegmentSchema = segmentSchema.omit({
  id: true,
  tunnel_id: true,
  sort_order: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Segment = z.infer<typeof segmentSchema>

export type SegmentBase = z.infer<typeof segmentBaseSchema>

export type CreateSegmentInput = z.input<typeof createSegmentSchema>

export type CreateSegmentOutput = z.output<typeof createSegmentSchema>

export type ImportSegmentInput = z.input<typeof importSegmentSchema>
export type ImportSegmentOutput = z.output<typeof importSegmentSchema>

export type UpdateSegmentInput = z.input<typeof updateSegmentSchema>
export type UpdateSegmentOutput = z.output<typeof updateSegmentSchema>

export type SegmentFields = keyof z.infer<typeof segmentSchema>
