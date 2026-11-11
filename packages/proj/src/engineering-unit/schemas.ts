import { z } from "zod"
import {
  uuidSchema,
  latitudeSchema,
  longitudeSchema,
  nameSchema,
  codeSchema,
  masterDataCodeSchema,
  sortOrderSchema,
  isDisabledSchema,
  auditSchema,
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const engineeringUnitBaseSchema = z.object({
  id: uuidSchema,

  project_id: uuidSchema.meta({
    title: "所属项目ID",
  }),

  name: nameSchema.meta({
    title: "工点名称",
    description: "工点的名称",
  }),

  full_name: z
    .string()
    .max(100, { message: "工点简称最多100个字符" })
    .nullable()
    .meta({
      title: "工点简称",
      description: "工点的简称",
    }),

  overview: z
    .string()
    .max(500, { message: "工点概述最多500个字符" })
    .nullable()
    .meta({
      title: "工点概述",
      description: "工点的概述信息",
    }),

  engineering_unit_type_code: masterDataCodeSchema.meta({
    title: "项目类型",
    description: "主数据-项目类型-ORG_TYPE-1011",
  }),

  province_code: codeSchema.nullable().meta({
    title: "省",
  }),

  city_code: codeSchema.nullable().meta({
    title: "市",
  }),

  district_code: codeSchema.nullable().meta({
    title: "区县",
  }),

  address: z
    .string()
    .max(200, { message: "地址最多200个字符" })
    .nullable()
    .meta({
      title: "地址",
    }),

  latitude: latitudeSchema.nullable().meta({
    title: "纬度",
  }),

  longitude: longitudeSchema.nullable().meta({
    title: "经度",
  }),

  sort_order: sortOrderSchema,

  is_disabled: isDisabledSchema,
})

export const engineeringUnitSchema = engineeringUnitBaseSchema.safeExtend(auditSchema.shape)

export const createEngineeringUnitSchema = engineeringUnitBaseSchema
  .omit({
    id: true,
    project_id: true,
    is_disabled: true,
  })
  .partial({
    province_code: true,
    city_code: true,
    district_code: true,
    address: true,
    latitude: true,
    longitude: true,
  })

export const updateEngineeringUnitSchema = engineeringUnitSchema
  .omit({
    id: true,
    project_id: true,
  })
  .partial()

export const importEngineeringUnitSchema = engineeringUnitSchema.omit({
  id: true,
  project_id: true,
  sort_order: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type EngineeringUnit = z.infer<typeof engineeringUnitSchema>

export type EngineeringUnitBase = z.infer<typeof engineeringUnitBaseSchema>

export type CreateEngineeringUnitInput = z.input<typeof createEngineeringUnitSchema>

export type CreateEngineeringUnitOutput = z.output<typeof createEngineeringUnitSchema>

export type ImportEngineeringUnitInput = z.input<typeof importEngineeringUnitSchema>
export type ImportEngineeringUnitOutput = z.output<typeof importEngineeringUnitSchema>

export type UpdateEngineeringUnitInput = z.input<typeof updateEngineeringUnitSchema>
export type UpdateEngineeringUnitOutput = z.output<typeof updateEngineeringUnitSchema>

export type EngineeringUnitFields = keyof z.infer<typeof engineeringUnitSchema>



export const createEngineeringUnitDefaults = {
  name: "",
  full_name: "",
  overview: "",
  engineering_unit_type_code: "",
  province_code: "",
  city_code: "",
  district_code: "",
  address: "",
  latitude: null,
  longitude: null,
  sort_order: 0,
} satisfies CreateEngineeringUnitInput