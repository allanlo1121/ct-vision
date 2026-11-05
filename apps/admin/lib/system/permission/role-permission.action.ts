"use server"

import { z } from "zod"
import { rolePermissionRepository } from "./role-permission.repository"
import { revalidatePath } from "next/cache"

const syncRolePermissionsSchema = z.object({
  roleId: z.uuid(),
  permissionIds: z.array(z.uuid()).max(100),
})

export async function syncRolePermissions(roleId: string, permissionIds: string[]) {
  try {
    const input = syncRolePermissionsSchema.parse({
      roleId,
      permissionIds,
    })

    await rolePermissionRepository.sync(input.roleId, [...new Set(input.permissionIds)])

    revalidatePath("/system/roles")

    return { success: true as const }
  } catch (error) {
    console.error("syncRolePermissions failed:", error)

    return {
      success: false as const,
      message: "角色权限更新失败",
    }
  }
}
