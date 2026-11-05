import { z } from "zod"

import { auditSchema } from "@workspace/shared"

/**
 * 字典类型基础 Schema
 *
 * 对应数据库中的完整字典类型实体
 * 不在这里设置创建默认值
 */
export const dictionaryTypeBaseSchema = z.object({
  code: z
    .string()
    .min(1, "请输入字典类型编码")
    .regex(/^\d{4}$/, {
      message: "编码必须是4位数字",
    })
    .meta({
      title: "编码",
      description: "字典类型的唯一标识",
    }),

  name: z
    .string()
    .min(2, "字典类型名称至少2个字符")
    .max(10, "字典类型名称最多10个字符")
    .meta({
      title: "字典类型名称",
      description: "字典类型的名称",
    }),

  description: z.string().nullable().meta({
    title: "描述",
    description: "字典类型的描述",
  }),


  is_disabled: z.boolean().meta({
    title: "是否禁用",
  }),
})

export const dictionaryTypeSchema = dictionaryTypeBaseSchema.safeExtend(
  auditSchema.shape
)

/**
 * 创建字典类型 Schema
 *
 * 排除数据库自动生成和维护的字段
 * 设置创建时的默认值
 */
export const createDictionaryTypeSchema = dictionaryTypeBaseSchema.omit({ 
  is_disabled: true,
})

/**
 * 更新字典类型 Schema
 *
 * 支持部分字段更新
 */
export const updateDictionaryTypeSchema = dictionaryTypeBaseSchema
  .omit({ code: true })
  .partial()

/**
 * 导入字典类型 Schema
 *
 * 不要求提供数据库生成的 ID 和审计字段
 * 复用创建字典类型的验证规则
 */
export const importDictionaryTypeSchema = createDictionaryTypeSchema

/**
 * Types
 */



// 数据库完整实体
export type DictionaryType = z.infer<typeof dictionaryTypeSchema>

// 创建输入：允许省略有默认值的字段
export type CreateDictionaryTypeInput = z.input<typeof createDictionaryTypeSchema>

// 创建解析后的数据：默认值已填充
export type CreateDictionaryTypeData = z.output<typeof createDictionaryTypeSchema>

// 更新输入
export type UpdateDictionaryTypeInput = z.input<typeof updateDictionaryTypeSchema>

// 导入输入
export type ImportDictionaryTypeInput = z.input<typeof importDictionaryTypeSchema>

// 应用字段名
export type DictionaryTypeFields = keyof z.infer<typeof dictionaryTypeSchema>

// export const applicationQuerySchema = paginationQuerySchema.extend({
//   keyword: z.string().trim().optional(),

//   is_disabled: z.boolean().optional(),
// })

// export type ApplicationQuery = z.output<typeof applicationQuerySchema>
