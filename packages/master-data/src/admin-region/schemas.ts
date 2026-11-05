import { z } from "zod"
import { auditSchema } from "@workspace/shared"
/**
 * 基础字段规则
 */
export const adminRegionBaseSchema = z.object({
  code: z
    .string()
    .regex(/^[0-9]{6}$/, {
      message: "编码必须是6位数字",
    })
    .meta({
      title: "地区编码",
      description: "唯一标识，必须是6位数字",
    }),

  name: z.string().min(2, "名称至少2个字符").max(50, "名称最多50个字符").meta({
    title: "名称",
    description: "地区的名称",
  }),

  short_name: z
    .string()
    .max(20, { message: "地区简称最多20个字符" })   
    .meta({
      title: "地区简称",
      description: "地区的简称",
    }),

  full_name: z.string().max(50, "地名全称最多50个字符").meta({
    title: "地名全称",
    description: "地名的正式全称",
  }),

  parent_code: z.string().nullable().meta({
    title: "上级地区",
    description: "上级行政区的编码，如果没有则为null",
  }),

  pinyin_code: z.string().max(50, "拼音码最多50个字符").meta({
    title: "拼音码",
    description: "地区名称的拼音码",
  }),

  level: z.number().int().min(1, "层级最小为1").max(3, "层级最大为3").meta({
    title: "层级",
    description: "行政区的层级，例如省、市、区县等",
  }),

  is_disabled: z.boolean().meta({
    title: "是否禁用",
    description: "行政区是否被禁用",
  }),
})

export const adminRegionSchema = adminRegionBaseSchema.safeExtend(
  auditSchema.shape
)

export const createAdminRegionSchema = adminRegionBaseSchema
  .omit({
    is_disabled: true,
  })

export const updateAdminRegionSchema = adminRegionBaseSchema
  .omit({ code: true })
  .partial()

export const importAdminRegionSchema = adminRegionSchema

export type AdminRegion = z.infer<typeof adminRegionSchema>

export type CreateAdminRegionInput = z.input<typeof createAdminRegionSchema>
export type CreateAdminRegionOutput = z.output<typeof createAdminRegionSchema>

export type UpdateAdminRegionInput = z.input<typeof updateAdminRegionSchema>
export type UpdateAdminRegionOutput = z.output<typeof updateAdminRegionSchema>

export type ImportAdminRegionInput = z.infer<typeof importAdminRegionSchema>

export type AdminRegionFields = keyof z.infer<typeof adminRegionSchema>
