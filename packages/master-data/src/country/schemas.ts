import { z } from "zod"
import { auditSchema } from "@workspace/shared"
/**
 * 国家字段定义
 */
export const countryBaseSchema = z.object({
  code: z
    .string()
    .regex(/^[A-Z]{2}$/, "国家编码必须为两个大写字母")
    .meta({
      title: "编码",
      description: "ISO 3166-1 alpha-2 国家编码，主键",
    }),

  name: z
    .string()
    .min(2, "国家名称至少2个字符")
    .max(50, "国家名称最多50个字符")
    .meta({
      title: "国家名称",
      description: "国家的常用名称",
    }),

  full_name: z.string().max(100, "国家全称最多100个字符").nullable().meta({
    title: "国家全称",
    description: "国家的正式全称",
  }),

  sort_order: z.number().int().min(0).meta({
    title: "排序",
    description: "菜单排序值",
  }),

  is_disabled: z.boolean().meta({
    title: "是否禁用",
  }),
})

/**
 * 国家实体
 */
export const countrySchema = countryBaseSchema.safeExtend(auditSchema.shape)

export const createCountrySchema = countryBaseSchema
  .omit({
    is_disabled: true,
  })
  .extend({
    full_name: countrySchema.shape.full_name.optional(),
  })

export const updateCountrySchema = countryBaseSchema
  .omit({ code: true })
  .partial()

export type Country = z.infer<typeof countrySchema>

export type CreateCountryInput = z.input<typeof createCountrySchema>

export type CreateCountryOutput = z.output<typeof createCountrySchema>

export type UpdateCountryInput = z.input<typeof updateCountrySchema>

export type UpdateCountryOutput = z.output<typeof updateCountrySchema>

export type CountryFields = keyof z.infer<typeof countrySchema>
