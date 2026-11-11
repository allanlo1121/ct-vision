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
export const projectBaseSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.nullable().meta({
    title: "所属组织ID",
  }),
  name: nameSchema.meta({
    title: "项目名称",
    description: "项目机构的名称",
  }),

  code: codeSchema
    .regex(/^[A-Z0-9_-]+$/, {
      message: "编码只能包含大写字母、数字、下划线和中划线",
    })
    .meta({
      title: "编码",
      description: "唯一标识，建议使用大写字母、数字和下划线",
    }),

  full_name: z.string().max(100, { message: "项目简称最多100个字符" }).meta({
    title: "项目简称",
    description: "项目机构的简称",
  }),

  overview: z.string().max(1000, { message: "项目概述最多500个字符" }).nullable().meta({
    title: "项目概述",
    description: "项目的概述信息",
  }),

  key_points: z.string().max(2000, { message: "项目关键点最多1000个字符" }).nullable().meta({
    title: "项目关键点",
    description: "项目的关键点信息",
  }),


  project_type_code: masterDataCodeSchema.meta({
    title: "项目类型",
    description: "主数据-项目类型-ORG_TYPE-1011",
  }),
  project_sub_type_code: masterDataCodeSchema.nullable().meta({
    title: "项目子类型",
    description: "主数据-项目子类型-ORG_SUB_TYPE-2055",
  }),
  management_mode_code: masterDataCodeSchema.meta({
    title: "管理模式",
    description: "主数据-管理模式-MANAGEMENT_MODE-1021",
  }),

  region_code: codeSchema.nullable().meta({
    title: "区域代码-1009",
  }),

  country_code: codeSchema.nullable().meta({
    title: "国家代码",
    description: "国家代码，默认为CN",
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
  external_id: z.string().nullable().meta({
    title: "外部ID",
  }),

  external_version: z.number().nullable().meta({
    title: "外部版本",
  }),
})

export const projectSchema = projectBaseSchema.safeExtend(auditSchema.shape)

export const createProjectSchema = projectBaseSchema
  .omit({
    id: true,
    organization_id: true,
    external_id: true,
    external_version: true,
    is_disabled: true,
  })
  .extend({
    sort_order: sortOrderSchema.default(0),
  })

export const updateProjectSchema = projectSchema
  .omit({
    id: true,
  })
  .partial()

export const importProjectSchema = projectSchema.omit({
  id: true,
  organization_id: true,
  sort_order: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Project = z.infer<typeof projectSchema>

export type ProjectBase = z.infer<typeof projectBaseSchema>

export type CreateProjectInput = z.input<typeof createProjectSchema>

export type CreateProjectOutput = z.output<typeof createProjectSchema>

export type ImportProjectInput = z.input<typeof importProjectSchema>
export type ImportProjectOutput = z.output<typeof importProjectSchema>

export type UpdateProjectInput = z.input<typeof updateProjectSchema>
export type UpdateProjectOutput = z.output<typeof updateProjectSchema>

export type ProjectFields = keyof z.infer<typeof projectSchema>



export const createProjectDefaults = {
  code: "",
  name: "",
  full_name: "",
  overview: "",
  key_points: "",
  project_type_code: "",
  project_sub_type_code: "",
  management_mode_code: "",
  region_code: "",
  province_code: "",
  city_code: "",
  district_code: "",
  address: "",
  country_code: "CN",
  latitude: null,
  longitude: null,
  sort_order: 0,
} satisfies CreateProjectInput
