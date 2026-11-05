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

    async findByAppCode(appCode) {
        const supabase = await createClient()

        const { data, error } = await supabase
            .schema("system")
            .from("menus")
            .select("*")
            .eq("app_code", appCode)
            .eq("is_visible", true)
            .eq("is_disabled", false)
            .order("sort_order")

        assertNoError(error)

        return data ?? []
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
