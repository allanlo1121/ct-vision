import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  MenuRepository,
  CreateMenuInput,
  UpdateMenuInput,
  Menu,
} from "@workspace/system/menu"
import { menuSchema } from "@workspace/system/menu"
import { z } from "zod"

export const menuRepository: MenuRepository = {
  async findById(id) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .overrideTypes<Menu>()

    assertNoError(error)

    return data ? menuSchema.parse(data) : null
  },

  async findByAppCode(appCode: string): Promise<Menu[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("*")
      .eq("app_code", appCode)
      .order("sort_order")

    assertNoError(error)

    return data ?? []
  },

  async findOptions(appCode: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .select("id, name,parent_id, sort_order")
      .eq("app_code", appCode)
      .order("sort_order")

    assertNoError(error)

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
      .order("sort_order")

    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateMenuInput): Promise<Menu> {
    const supabase = await createClient()
    console.log("Creating permission with input:", input)

    const { data, error } = await supabase
      .schema("system")
      .from("menus")
      .insert(input)
      .select("*")
      .single()

    console.log("Menu creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建菜单失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }

    return menuSchema.parse(data)
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

    return menuSchema.parse(data)
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
