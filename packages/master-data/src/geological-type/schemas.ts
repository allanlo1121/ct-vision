import { z } from "zod"
import { auditSchema } from "@workspace/shared"
/**
 * 基础字段规则
 */
export const geologicalTypeBaseSchema = z.object({
  code: z
    .string()
    .regex(/^[0-9]{8}$/, {
      message: "编码必须是8位数字",
    })
    .meta({
      title: "地区编码",
      description: "唯一标识，必须是8位数字",
    }),

  name: z.string().min(2, "名称至少2个字符").max(50, "名称最多50个字符").meta({
    title: "地质名称",
    description: "地质的名称",
  }),

  parent_code: z.string().nullable().meta({
    title: "上级地质分类",
    description: "上级地质分类的编码，如果没有则为null",
  }),

  is_disabled: z.boolean().meta({
    title: "是否禁用",
    description: "地质分类是否被禁用",
  }),
})

export const geologicalTypeSchema = geologicalTypeBaseSchema.safeExtend(
  auditSchema.shape
)

export const createGeologicalTypeSchema = geologicalTypeBaseSchema.omit({
  is_disabled: true,
})

export const updateGeologicalTypeSchema = geologicalTypeBaseSchema
  .omit({ code: true })
  .partial()

export const importGeologicalTypeSchema = geologicalTypeSchema

export type GeologicalType = z.infer<typeof geologicalTypeSchema>

export type CreateGeologicalTypeInput = z.input<
  typeof createGeologicalTypeSchema
>
export type CreateGeologicalTypeOutput = z.output<
  typeof createGeologicalTypeSchema
>

export type UpdateGeologicalTypeInput = z.input<
  typeof updateGeologicalTypeSchema
>
export type UpdateGeologicalTypeOutput = z.output<
  typeof updateGeologicalTypeSchema
>

export type ImportGeologicalTypeInput = z.infer<
  typeof importGeologicalTypeSchema
>

export type GeologicalTypeFields = keyof z.infer<typeof geologicalTypeSchema>
