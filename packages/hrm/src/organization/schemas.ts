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
export const organizationBaseSchema = z.object({
  id: uuidSchema,
  name: nameSchema.meta({
    title: "组织名称",
    description: "组织机构的名称",
  }),

  code: codeSchema
    .regex(/^[A-Z0-9_-]+$/, {
      message: "编码只能包含大写字母、数字、下划线和中划线",
    })
    .meta({
      title: "编码",
      description: "唯一标识，建议使用大写字母、数字和下划线",
    }),

  full_name: z.string().max(100, { message: "组织简称最多100个字符" }).meta({
    title: "组织简称",
    description: "组织机构的简称",
  }),

  parent_id: uuidSchema.nullable().meta({
    title: "上级组织",
  }),

  org_type_code: masterDataCodeSchema.meta({
    title: "组织类型",
    description: "主数据-组织类型-ORG_TYPE",
  }),
  org_category_code: masterDataCodeSchema.nullable().meta({
    title: "机构类型",
    description: "主数据-机构类型-ORG_CATEGORY",
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

export const organizationSchema = organizationBaseSchema.safeExtend(
  auditSchema.shape
)

export const createOrganizationSchema = organizationBaseSchema.omit({
  id: true,
  external_id: true,
  external_version: true,
  is_disabled: true,
}).extend({
  sort_order: sortOrderSchema.default(0),
})

export const updateOrganizationSchema = organizationSchema.omit({
  id: true,
}).partial()

export const importOrganizationSchema = organizationSchema.omit({
  id: true,
  updated_at: true,
  created_by: true,
  updated_by: true,
})

export type Organization = z.infer<typeof organizationSchema>

export type OrganizationBase = z.infer<typeof organizationBaseSchema>

export type CreateOrganizationInput = z.input<typeof createOrganizationSchema>

export type CreateOrganizationOutput = z.output<typeof createOrganizationSchema>

export type ImportOrganizationInput = z.input<typeof importOrganizationSchema>
export type ImportOrganizationOutput = z.output<typeof importOrganizationSchema>

export type UpdateOrganizationInput = z.input<typeof updateOrganizationSchema>
export type UpdateOrganizationOutput = z.output<typeof updateOrganizationSchema>

export type OrganizationFields = keyof z.infer<typeof organizationSchema>
