"use server"

import { z } from "zod"
import { userRoleRepository } from "./user-role.repository"
import { revalidatePath } from "next/cache"

const syncUserRolesSchema = z.object({
  userId: z.uuid(),
  roleIds: z.array(z.uuid()).max(100),
})

export async function syncUserRoles(userId: string, roleIds: string[]) {
  try {
    const input = syncUserRolesSchema.parse({
      userId,
      roleIds,
    })

    await userRoleRepository.sync(input.userId, [...new Set(input.roleIds)])

    revalidatePath("/system/users")

    return { success: true as const }
  } catch (error) {
    console.error("syncUserRoles failed:", error)

    return {
      success: false as const,
      message: "用户角色更新失败",
    }
  }
}
