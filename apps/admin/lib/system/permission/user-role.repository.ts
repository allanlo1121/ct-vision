import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError, appErrors } from "@workspace/errors"

import type {
  UserRoleRepository,
  UserRoleQuery,
  UserRoleListItem,
} from "@workspace/system/user-role"

export const userRoleRepository: UserRoleRepository = {
  async findRoleIds(userId) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("user_roles")
      .select("role_id")
      .eq("user_id", userId)

    assertNoError(error)

    return data.map((item) => item.role_id)
  },

  async assign(userId: string, roleId: string): Promise<void> {
    const supabase = await createClient()


    const { data, error } = await supabase
      .schema("iam")
      .from("user_roles")
      .insert({
        user_id: userId,
        role_id: roleId,
      })
      .select("*")
      .single()


    assertNoError(error)

    if (!data) {
      throw new AppError({
        message: "分配角色失败：数据库未返回记录",
        code: "INTERNAL_ERROR",
      })
    }
  },
  async revoke(userId: string, roleId: string): Promise<void> {
    const supabase = await createClient()

    const { error, count } = await supabase
      .schema("iam")
      .from("user_roles")
      .delete({ count: "exact" })
      .eq("user_id", userId)
      .eq("role_id", roleId)

    assertNoError(error)

    if (count !== 1) {
      throw appErrors.operationNotApplied("用户角色不存在或没有修改权限")
    }
  },
  async replace(userId: string, roleIds: string[]): Promise<void> {
    const supabase = await createClient()

    // 1. 删除用户原有的所有角色关联
    const { error: deleteError } = await supabase
      .schema("iam")
      .from("user_roles")
      .delete()
      .eq("user_id", userId)

    assertNoError(deleteError)

    // 2. 如果没有选择角色，直接结束
    if (roleIds.length === 0) return

    // 3. 插入新的角色关联
    const { error: insertError } = await supabase
      .schema("iam")
      .from("user_roles")
      .insert(
        [...new Set(roleIds)].map((roleId) => ({
          user_id: userId,
          role_id: roleId,
        }))
      )

    assertNoError(insertError)
  },
  async sync(userId: string, roleIds: string[]): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .schema("api")
    .rpc("sync_user_roles", {
      p_user_id: userId,
      p_role_ids: roleIds,
    })

  assertNoError(error)
}
}
