import { createClient } from "@/lib/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  RoleRepository,
  CreateRoleInput,
  UpdateRoleInput,
  Role,
} from "@workspace/system/role"

export const roleRepository: RoleRepository = {
  async findById(id) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data
  },

  async findAll() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .select("*")
      .order("sort_order")

    console.log("roles data:", data)
    console.log("roles error:", error)

    assertNoError(error)

    return data ?? []
  },

  async create(input: CreateRoleInput): Promise<Role> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .insert(input)
      .select("*")
      .single()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建角色失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }

    return data
  },
  async update(id: string, input: UpdateRoleInput): Promise<Role> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .update(input)
      .eq("id", id)
      .select("*")
      .single()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新角色失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }

    return data
  },
  async delete(id) {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("iam")
      .from("roles")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
