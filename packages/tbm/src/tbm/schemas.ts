import { z } from "zod"

import {
  uuidSchema,
  nameSchema,
  masterDataCodeSchema,
  isDisabledSchema,
  auditSchema,
  tbmCodeSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const tbmBaseSchema = z.object({
  code: tbmCodeSchema,
  device_id: uuidSchema.nullable().meta({
    title: "所属设备ID",
  }),
  name: nameSchema.meta({
    title: "TBM名称",
    description: "TBM名称",
  }),

  tbm_type_code: masterDataCodeSchema.meta({
    title: "TBM类型",
    description: "主数据-TBM类型-TBM_TYPE-XXXX",
  }),

  diameter: z.number().nullable().meta({
    title: "TBM直径",
  }),

  

  is_disabled: isDisabledSchema,
})

export const tbmSchema = tbmBaseSchema.safeExtend(auditSchema.shape)

export const createTbmSchema = tbmBaseSchema.omit({
  device_id: true,
  is_disabled: true,
})

export const updateTbmSchema = tbmSchema
  .omit({
    code: true,
  })
  .partial()

export const importTbmSchema = tbmSchema.omit({
  is_disabled: true,
  device_id: true,
  created_at: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Tbm = z.infer<typeof tbmSchema>

export type TbmBase = z.infer<typeof tbmBaseSchema>

export type CreateTbmInput = z.input<typeof createTbmSchema>

export type CreateTbmOutput = z.output<typeof createTbmSchema>

export type ImportTbmInput = z.input<typeof importTbmSchema>
export type ImportTbmOutput = z.output<typeof importTbmSchema>

export type UpdateTbmInput = z.input<typeof updateTbmSchema>
export type UpdateTbmOutput = z.output<typeof updateTbmSchema>

export type TbmFields = keyof z.infer<typeof tbmSchema>
