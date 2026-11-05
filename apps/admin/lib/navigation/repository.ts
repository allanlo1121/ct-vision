import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

// import { MenuScope, MenuTreeRow } from "../system/navigation/types"

import type {
  MenuRepository,
  MenuOption,
  CreateMenuInput,
  UpdateMenuInput,
  Menu,
} from "@workspace/system/menu"

export const menuRepository: MenuRepository = {
  async findById(id) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data
  },

  async findByScope(scope) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("*")
      .eq("menu_scope", scope)
      .eq("is_visible", true)
      .eq("is_disabled", false)
      .order("sort_order")

    assertNoError(error)

    return data ?? []
  },

  async findOptions(scope): Promise<MenuOption[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("id, name, parent_id, sort_order")
      .eq("menu_scope", scope)
      .eq("is_disabled", false)
      .order("sort_order")

    if (error) throw error

    return (data ?? []).map((menu) => ({
      id: menu.id,
      name: menu.name,
      parentId: menu.parent_id,
      sortOrder: menu.sort_order,
    }))
  },

  async findAll() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("*")
      .eq("is_disabled", false)
      .order("sort_order")

    assertNoError(error)

    return data ?? []
  },
  async paginate(query) {
    const supabase = await createClient()

    const { page, pageSize, keyword, is_disabled } = query

    const offset = (page - 1) * pageSize

    let dbQuery = supabase
      .schema("system")
      .from("menus")
      .select("*", { count: "exact" })

    // 关键词搜索
    const search = keyword?.trim()

    if (search) {
      dbQuery = dbQuery.or(`name.ilike.%${search}%,code.ilike.%${search}%`)
    }

    // 禁用状态筛选
    if (is_disabled !== undefined) {
      dbQuery = dbQuery.eq("is_disabled", is_disabled)
    }

    // 排序和分页
    const { data, error, count } = await dbQuery
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1)

    assertNoError(error)

    const total = count ?? 0

    return {
      data: data ?? [],
      total,
      page,
      pageSize: pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  },

  async create(input: CreateMenuInput): Promise<Menu> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .insert(input)
      .select("*")
      .single()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建菜单失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }

    return data
  },
  async update(id: string, input: UpdateMenuInput): Promise<Menu> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .update(input)
      .eq("id", id)
      .select("*")
      .single()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新菜单失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }

    return data
  },
  async delete(id) {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("system")
      .from("menus")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
