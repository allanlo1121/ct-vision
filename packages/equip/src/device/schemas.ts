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
export const deviceBaseSchema = z.object({
  id: uuidSchema,
  device_number: z.string().meta({
    title: "设备编号",
  }),
  name: nameSchema.meta({
    title: "设备名称",
    description: "设备名称",
  }),

  license_number: z.string().nullable().meta({
    title: "许可证号",
  }),

  spec: z.string().nullable().meta({
    title: "规格",
  }),

  model: z.string().nullable().meta({
    title: "型号",
  }),

  unit: z.string().nullable().meta({
    title: "单位",
  }),

  qr_code: z.string().nullable().meta({
    title: "二维码",
  }),

  source_code: z.string().nullable().meta({
    title: "来源编码",
  }),

  state_code: z.string().nullable().meta({
    title: "状态编码",
  }),

  is_disabled: isDisabledSchema,
})

export const deviceSchema = deviceBaseSchema.safeExtend(auditSchema.shape)

export const createDeviceSchema = deviceBaseSchema.omit({
  is_disabled: true,
})

export const updateDeviceSchema = deviceSchema.omit({}).partial()

export const importDeviceSchema = deviceSchema.omit({
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Device = z.infer<typeof deviceSchema>

export type DeviceBase = z.infer<typeof deviceBaseSchema>

export type CreateDeviceInput = z.input<typeof createDeviceSchema>

export type CreateDeviceOutput = z.output<typeof createDeviceSchema>

export type ImportDeviceInput = z.input<typeof importDeviceSchema>
export type ImportDeviceOutput = z.output<typeof importDeviceSchema>

export type UpdateDeviceInput = z.input<typeof updateDeviceSchema>
export type UpdateDeviceOutput = z.output<typeof updateDeviceSchema>

export type DeviceFields = keyof z.infer<typeof deviceSchema>
