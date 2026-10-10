import {
  adminRegionCodeSchema,
  countryCodeSchema,
  EntityReferenceSchema,
  idSchema,
  latitudeSchema,
  longitudeSchema,
} from "@/lib/shared/schema"
import { FormFieldMeta } from "@/lib/shared/form-engine/types"

import { z } from "zod"

/**
 * 基础字段规则
 */
export const OrganizationFormSchema = {
  id: z.uuid(),
  name: z
    .string()
    .min(6, "组织名称至少6个字符")
    .max(50, "组织名称最多50个字符")
    .meta({
      title: "组织名称",
      description: "组织机构的名称",
    }),

  code: z
    .string()
    .regex(/^[A-Z0-9_-]+$/, {
      message: "编码只能包含大写字母、数字、下划线和中划线",
    })
    .meta({
      title: "编码",
      description: "唯一标识，建议使用大写字母、数字和下划线",
    }),

  shortName: z
    .string()
    .max(20, { message: "组织简称最多20个字符" })
    .optional()
    .meta({
      title: "组织简称",
      description: "组织机构的简称",
    }),

  description: z
    .string()
    .max(200, { message: "描述最多200个字符" })
    .optional()
    .nullable()
    .meta({
      title: "组织描述",
    }),

  parentId: z.uuid().meta({
    title: "上级组织"
  }),

  orgTypeId: z.uuid().meta({
    title: "组织类型",
    description: "主数据-组织类型-ORG_TYPE",
  } ),
  orgCategoryId: z.uuid()
    .nullable()
    .optional()
    .meta({
      title: "机构类型",
      description: "主数据-机构类型-ORG_CATEGORY",
    }),

  businessId: z.uuid()
    .nullable()
    .optional()
    .meta({
      title: "业务类型",
      description: "主数据-业务类型-ORG_BUSINESS",
    }),

  countryCode: z.string().default("CN").meta({
    title: "国家代码",
    description: "国家代码，默认为CN",
  }),

  provinceCode: adminRegionCodeSchema.meta({
    label: "省",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    optionSource: {
      source: "admin_regions",
      level: 1,
    },
  } satisfies FormFieldMeta),

  cityCode: adminRegionCodeSchema.meta({
    label: "市",
    component: "select",
    section: "地理信息",
    colSpan: 1,
    dependsOn: ["provinceCode"],
    optionSource: (v: any) => ({
      source: "admin_regions",
      level: 2,
      parentCode: v.provinceCode,
    }),
  } satisfies FormFieldMeta),

  districtCode: adminRegionCodeSchema.meta({
    label: "区县",
    component: "select",
    section: "地理信息",
    dependsOn: ["cityCode"],
    optionSource: (v: any) => ({
      source: "admin_regions",
      level: 3,
      parentCode: v.cityCode,
    }),
  } satisfies FormFieldMeta),

  address: z
    .string()
    .max(200, { message: "地址最多200个字符" })
    .optional()
    .nullable()
    .meta({
      label: "地址",
      component: "input",
      section: "地理信息",
      colSpan: 2,
    } satisfies FormFieldMeta),

  latitude: latitudeSchema
    .optional()
    .nullable()
    .meta({
      label: "纬度",
      component: "input",
      section: "地理信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  longitude: longitudeSchema
    .optional()
    .nullable()
    .meta({
      label: "经度",
      component: "input",
      section: "地理信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  sortOrder: z.coerce
    .number()
    .default(0)
    .meta({
      label: "排序",
      component: "input",
      section: "其他信息",
      type: "number",
      colSpan: 1,
    } satisfies FormFieldMeta),

  isDisabled: z.coerce
    .boolean()
    .default(false)
    .meta({
      label: "是否禁用",
      component: "switch",
      section: "其他信息",
      colSpan: 1,
    } satisfies FormFieldMeta),

  externalId: z
    .string()
    .nullable()
    .optional()
    .meta({
      label: "外部ID",
      component: "input",
      readonly: true,
      section: "系统字段",
      colSpan: 1,
    } satisfies FormFieldMeta),

  externalVersion: z.coerce
    .number()
    .nullable()
    .optional()
    .meta({
      label: "外部版本",
      component: "input",
      readonly: true,
      section: "系统字段",
      colSpan: 1,
    } satisfies FormFieldMeta),
}

export const OrganizationSchema = z.object(OrganizationFormSchema)

export const CreateOrganizationSchema = OrganizationSchema

export const ImportOrganizationSchema = OrganizationSchema

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>

export type ImportOrganizationInput = z.infer<typeof ImportOrganizationSchema>

export const UpdateOrganizationSchema = OrganizationSchema.extend({
  id: idSchema,
})

export type UpdateOrganizationInput = z.infer<typeof UpdateOrganizationSchema>

export type OrganizationFields = keyof z.infer<typeof OrganizationSchema>
