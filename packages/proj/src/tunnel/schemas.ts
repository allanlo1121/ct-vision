import { z } from "zod"
import {
  uuidSchema,
  nameSchema,
  sortOrderSchema,
  isDisabledSchema,
  auditSchema,
  positiveIntSchema,
  chainageSchema
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const tunnelBaseSchema = z.object({
  id: uuidSchema,

  engineering_unit_id: uuidSchema.meta({
    title: "所属工程单元ID",
  }),

  name: nameSchema.nullable().meta({
    title: "隧道名称后缀",
    description: "隧道的名称,如XX左线,右线,上行线等",
  }),

  full_name: nameSchema.nullable().meta({
    title: "隧道全称",
    description: "隧道的全称",
  }),

  overview: z
    .string()
    .max(500, { message: "隧道概述最多500个字符" })
    .nullable()
    .meta({
      title: "隧道概述",
      description: "隧道的概述信息",
    }),

  chainage_prefix: z
    .string()
    .max(10, { message: "里程前缀最多10个字符" })
    .meta({
      title: "里程前缀",
      description: "隧道的里程前缀",
    }),

  start_chainage: chainageSchema.meta({
    title: "起始里程",
    description: "隧道的起始里程",
  }),
  end_chainage: chainageSchema.meta({
    title: "结束里程",
    description: "隧道的结束里程",
  }),

  start_ring: positiveIntSchema.meta({
    title: "起始环号",
    description: "隧道的起始环号",
  }),
  end_ring: positiveIntSchema.meta({
    title: "结束环号",
    description: "隧道的结束环号",
  }),

  chainage_adjustment: z.number().meta({
    title: "里程调整",
    description: "隧道的里程调整",
  }),
  excavation_diameter: z.number().nullable().meta({
    title: "开挖直径",
    description: "隧道的开挖直径",
  }),
  sort_order: sortOrderSchema,

  is_disabled: isDisabledSchema,
})

export const tunnelSchema = tunnelBaseSchema.safeExtend(auditSchema.shape)

export const createTunnelSchema = tunnelBaseSchema
  .omit({
    id: true,
    is_disabled: true,
  })
  .partial({
    excavation_diameter: true,
  })

export const updateTunnelSchema = tunnelSchema
  .omit({
    id: true,
    engineering_unit_id: true,
  })
  .partial()

export const importTunnelSchema = tunnelSchema.omit({
  id: true,
  engineering_unit_id: true,
  sort_order: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Tunnel = z.infer<typeof tunnelSchema>

export type TunnelBase = z.infer<typeof tunnelBaseSchema>

export type CreateTunnelInput = z.input<typeof createTunnelSchema>

export type CreateTunnelOutput = z.output<typeof createTunnelSchema>

export type ImportTunnelInput = z.input<typeof importTunnelSchema>
export type ImportTunnelOutput = z.output<typeof importTunnelSchema>

export type UpdateTunnelInput = z.input<typeof updateTunnelSchema>
export type UpdateTunnelOutput = z.output<typeof updateTunnelSchema>

export type TunnelFields = keyof z.infer<typeof tunnelSchema>
