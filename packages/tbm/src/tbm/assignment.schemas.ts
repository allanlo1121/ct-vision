import { z } from "zod"

import {
  uuidSchema,
  auditSchema,
  tbmCodeSchema,
  advanceDirectionSchema,
  dateSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const tbmAssignmentBaseSchema = z.object({
  id: uuidSchema.meta({
    title: "ID",
  }),
  tbm_code: tbmCodeSchema,
  tunnel_id: uuidSchema.meta({
    title: "隧道ID",
  }),
  advance_direction: advanceDirectionSchema.meta({
    title: "推进方向",
  }),
  start_date: dateSchema.meta({
    title: "开始日期",
  }),
  end_date: dateSchema.nullable().meta({
    title: "结束日期",
  }),

  remark: z.string().nullable().meta({
    title: "备注",
  }),
})

export const tbmAssignmentSchema = tbmAssignmentBaseSchema.safeExtend(
  auditSchema.shape
)

export const createTbmAssignmentSchema = tbmAssignmentBaseSchema.omit({
  id: true,
})

export const updateTbmAssignmentSchema = tbmAssignmentSchema
  .omit({
    id: true,
  })
  .partial()

export type TbmAssignment = z.infer<typeof tbmAssignmentSchema>

export type TbmAssignmentBase = z.infer<typeof tbmAssignmentBaseSchema>

export type CreateTbmAssignmentInput = z.input<typeof createTbmAssignmentSchema>

export type CreateTbmAssignmentOutput = z.output<
  typeof createTbmAssignmentSchema
>

export type UpdateTbmAssignmentInput = z.input<typeof updateTbmAssignmentSchema>
export type UpdateTbmAssignmentOutput = z.output<
  typeof updateTbmAssignmentSchema
>

export type TbmAssignmentFields = keyof z.infer<typeof tbmAssignmentSchema>

export type TbmAssignmentListItem = TbmAssignmentBase & {
  tbm_name: string | null
  tunnel_name: string | null
}
