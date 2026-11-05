import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError,appErrors } from "@workspace/errors"

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

  async findOptions() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .select("id, name")
      .order("sort_order")

    assertNoError(error)

    return data ?? []
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
    console.log("Creating role with input:", input)

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .insert(input)
      .select("*")
      .single()

    console.log("Role creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建角色失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }

    return data
  },
  async update(id: string, input: UpdateRoleInput) {
    const supabase = await createClient()

    const { error, count } = await supabase
      .schema("iam")
      .from("roles")
      .update(input, { count: "exact" })
      .eq("id", id)

    assertNoError(error)
    if (count !== 1) {
      throw appErrors.operationNotApplied("角色不存在或没有修改权限")
    }
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
