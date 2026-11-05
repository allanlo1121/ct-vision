import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError } from "@workspace/errors"

import type {
  PermissionRepository,
  CreatePermissionInput,
  UpdatePermissionInput,
  Permission,
} from "@workspace/system/permission"
import { permissionSchema, permissionListSchema } from "@workspace/system/permission"
import { z } from "zod"

export const permissionRepository: PermissionRepository = {
  async findById(id) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("permissions")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .overrideTypes<Permission>()

    assertNoError(error)

     return data ? permissionSchema.parse(data) : null
  },

  async findAll() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("permissions")
      .select("*")
      .order("sort_order")

    console.log("permissions data:", data)
    console.log("permissions error:", error)

    assertNoError(error)

    return permissionListSchema.parse(data ?? [])
  },

  async create(input: CreatePermissionInput): Promise<Permission> {
    const supabase = await createClient()
    console.log("Creating permission with input:", input)

    const { data, error } = await supabase
      .schema("iam")
      .from("permissions")
      .insert(input)
      .select("*")
      .single()

    console.log("Permission creation error:", error)
    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "创建权限失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }

    return permissionSchema.parse(data)
  },
  async update(id: string, input: UpdatePermissionInput): Promise<Permission> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("permissions")
      .update(input)
      .eq("id", id)
      .select("*")
      .single()

    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "更新权限失败：记录不存在或未返回数据",
        code: "INTERNAL_ERROR",
      })
    }

    return permissionSchema.parse(data)
  },
  async delete(id) {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("iam")
      .from("permissions")
      .delete()
      .eq("id", id)

    assertNoError(error)
  },
}
