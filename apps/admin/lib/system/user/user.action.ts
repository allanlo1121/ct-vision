"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { userRoleRepository } from "@/lib/system/permission/user-role.repository"

const inputSchema = z.object({
  userId: z.uuid(),
  roleId: z.uuid(),
})

const replaceInputSchema = z.object({
  userId: z.uuid(),
  roleIds: z.array(z.uuid()),
})

export async function assignUserRole(userId: string, roleId: string) {
  try {
    const input = inputSchema.parse({ userId, roleId })

    await userRoleRepository.assign(input.userId, input.roleId)

    revalidatePath("/system/users")

    return { success: true as const }
  } catch {
    return {
      success: false as const,
      message: "分配角色失败，请检查操作权限",
    }
  }
}

export async function revokeUserRole(userId: string, roleId: string) {
  try {
    const input = inputSchema.parse({ userId, roleId })

    await userRoleRepository.revoke(input.userId, input.roleId)

    revalidatePath("/system/users")

    return { success: true as const }
  } catch {
    return {
      success: false as const,
      message: "撤销角色失败，请检查操作权限",
    }
  }
}

export async function replaceUserRoles(userId: string, roleIds: string[]) {
  try {
    const input = replaceInputSchema.parse({ userId, roleIds })

    await userRoleRepository.replace(input.userId, input.roleIds)

    revalidatePath("/system/users")

    return { success: true as const }
  } catch {
    return {
      success: false as const,
      message: "替换角色失败，请检查操作权限",
    }
  }
}
