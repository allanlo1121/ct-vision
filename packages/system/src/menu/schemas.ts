import { z } from "zod"

import { auditSchema } from "@workspace/shared"

/**
 * 菜单基础 Schema
 *
 * 对应数据库中的完整菜单实体
 * 不在这里设置创建默认值
 */
export const menuBaseSchema = z.object({
  id: z.uuid(),

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

  parent_id: z.uuid().nullable().meta({
    title: "上级菜单",
    description: "为空表示顶级菜单",
  }),

  path_url: z
    .string()
    .regex(/^\/[a-z0-9_/.-]*$/, {
      message:
        "路径URL必须以 / 开头，并且只能包含小写字母、数字、下划线、中划线和小数点",
    })
    .nullable()
    .meta({
      title: "路径URL",
      description: "菜单对应的页面路径",
    }),

  icon: z.string().nullable().meta({
    title: "图标",
    description: "菜单的图标",
  }),

  app_code: z.string().max(10, "菜单范围最多10个字符").meta({
    title: "应用编码",
    description: "菜单所属的应用编码",
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

export const menuSchema = menuBaseSchema.safeExtend(auditSchema.shape)

/**
 * 创建菜单 Schema
 *
 * 排除数据库自动生成和维护的字段
 * 设置创建时的默认值
 */
export const createMenuSchema = menuBaseSchema.omit({
  id: true,
  is_disabled: true,
  is_visible: true,
})

/**
 * 更新菜单 Schema
 *
 * 支持部分字段更新
 */
export const updateMenuSchema = menuBaseSchema.omit({
  id: true,
}).partial()

/**
 * 导入菜单 Schema
 *
 * 不要求提供数据库生成的 ID 和审计字段
 * 复用创建菜单的验证规则
 */
export const importMenuSchema = createMenuSchema

/**
 * Types
 */

// 数据库完整实体
export type Menu = z.infer<typeof menuSchema>

// 创建输入：允许省略有默认值的字段
export type CreateMenuInput = z.input<typeof createMenuSchema>

// 创建解析后的数据：默认值已填充
export type CreateMenuData = z.output<typeof createMenuSchema>

// 更新输入
export type UpdateMenuInput = z.input<typeof updateMenuSchema>

// 导入输入
export type ImportMenuInput = z.input<typeof importMenuSchema>

// 菜单字段名
export type MenuFields = keyof z.infer<typeof menuSchema>


