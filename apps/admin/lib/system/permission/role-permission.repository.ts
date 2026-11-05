import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError, appErrors } from "@workspace/errors"

import type {
  RolePermissionRepository,
  RoleWithPermissions,
} from "@workspace/system/role-permission"
import { permissionBaseSchema } from "@workspace/system/permission"

export const rolePermissionRepository: RolePermissionRepository = {
  async findPermissionIds(roleId: string): Promise<string[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("role_permissions")
      .select("permission_id")
      .eq("role_id", roleId)

    assertNoError(error)

    return data.map((item) => item.permission_id)
  },

  async sync(roleId: string, permissionIds: string[]): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
      .schema("api")
      .rpc("sync_role_permissions", {
        p_role_id: roleId,
        p_permission_ids: permissionIds,
      })

    assertNoError(error)
  },
  async findWithPermissions(roleId: string): Promise<RoleWithPermissions> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .select(
        `
      id,
      code,
      name,
      description,
      sort_order,
      is_disabled,
      created_at,
      updated_at,
      created_by,
      updated_by,
      role_permissions (
        permissions (
          id,
          name,
          module,
          action,
          description,
          sort_order,
          is_disabled
        )
      )
    `
      )
      .eq("id", roleId)
      .single()

    assertNoError(error)

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      description: data.description,
      sort_order: data.sort_order,
      is_disabled: data.is_disabled,
      created_at: data.created_at,
      updated_at: data.updated_at,
      created_by: data.created_by,
      updated_by: data.updated_by,
      permissions: data.role_permissions.flatMap((item) =>
        item.permissions ? [permissionBaseSchema.parse(item.permissions)] : []
      ),
    }
  },
  async findAllWithPermissions(): Promise<RoleWithPermissions[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
      .schema("iam")
      .from("roles")
      .select(
        `
      id,
      code,
      name,
      description,
      sort_order,
      is_disabled,
      created_at,
      updated_at,
      created_by,
      updated_by,
      role_permissions (
        permissions (
          id,
          module,
          action,
          name,
          module,
          description,
          sort_order,
          is_disabled
        )
      )
    `
      )

    assertNoError(error)

    return data.map((role) => ({
      id: role.id,
      code: role.code,
      name: role.name,
      description: role.description,
      sort_order: role.sort_order,
      is_disabled: role.is_disabled,
      created_at: role.created_at,
      updated_at: role.updated_at,
      created_by: role.created_by,
      updated_by: role.updated_by,
      permissions: role.role_permissions.flatMap((item) =>
        item.permissions ? [permissionBaseSchema.parse(item.permissions)] : []
      ),
    }))
  }

}
