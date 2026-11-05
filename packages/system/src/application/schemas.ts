import { z } from "zod"

import { auditSchema } from "@workspace/shared"

/**
 * 菜单基础 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const applicationBaseSchema = z.object({
  code: z
    .string()
    .min(1, "请输入菜单编码")
    .regex(/^[a-z0-9_.-]+$/, {
      message: "编码只能包含小写字母、数字、下划线、中划线和小数点",
    })
    .meta({
      title: "编码",
      description: "菜单的唯一标识",
    }),

  name: z
    .string()
    .min(2, "菜单名称至少2个字符")
    .max(10, "菜单名称最多10个字符")
    .meta({
      title: "菜单名称",
      description: "菜单的名称",
    }),

  base_url: z
    .url({
      protocol: /^https?$/,
      error: "请输入有效的 HTTP/HTTPS 地址",
    })
    .meta({
      title: "应用地址",
      description: "应用访问入口，例如 https://admin.example.com",
    }),

  icon: z.string().nullable().meta({
    title: "图标",
    description: "菜单的图标",
  }),

  description: z.string().nullable().meta({
    title: "描述",
    description: "菜单的描述",
  }),

  is_visible: z.boolean().meta({
    title: "是否可见",
    description: "是否在导航菜单中显示",
  }),

  sort_order: z.number().int().min(0).meta({
    title: "排序",
    description: "菜单排序值",
  }),

  is_disabled: z.boolean().meta({
    title: "是否禁用",
  }),
})

export const applicationSchema = applicationBaseSchema.safeExtend(
  auditSchema.shape
)

/**
 * 创建菜单 Schema
 *
 * 排除数据库自动生成和维护的字段
 * 设置创建时的默认值
 */
export const createApplicationSchema = applicationBaseSchema.omit({
  is_visible: true,
  is_disabled: true,
})

/**
 * 更新菜单 Schema
 *
 * 支持部分字段更新
 */
export const updateApplicationSchema = applicationBaseSchema
  .omit({ code: true })
  .partial()

/**
 * 导入菜单 Schema
 *
 * 不要求提供数据库生成的 ID 和审计字段
 * 复用创建菜单的验证规则
 */
export const importApplicationSchema = createApplicationSchema

/**
 * Types
 */

// 数据库完整实体
export type Application = z.infer<typeof applicationSchema>

// 创建输入：允许省略有默认值的字段
export type CreateApplicationInput = z.input<typeof createApplicationSchema>

// 创建解析后的数据：默认值已填充
export type CreateApplicationData = z.output<typeof createApplicationSchema>

// 更新输入
export type UpdateApplicationInput = z.input<typeof updateApplicationSchema>

// 导入输入
export type ImportApplicationInput = z.input<typeof importApplicationSchema>

// 应用字段名
export type ApplicationFields = keyof z.infer<typeof applicationSchema>

// export const applicationQuerySchema = paginationQuerySchema.extend({
//   keyword: z.string().trim().optional(),

//   is_disabled: z.boolean().optional(),
// })

// export type ApplicationQuery = z.output<typeof applicationQuerySchema>
