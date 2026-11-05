"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { userProfileRepository } from "@/lib/system/user/user-profile.repository"
import type { SaveUserProfileInput } from "@workspace/system/user-profile"

export async function saveUserProfile(
  userId: string,
  input: SaveUserProfileInput
) {
  try {
    await userProfileRepository.save(userId, input)

    revalidatePath("/system/users")

    return { success: true as const }
  } catch (error) {
    console.error("saveUserProfile failed:", error)
    return {
      success: false as const,
      message: "保存用户资料失败，请检查操作权限",
    }
  }
}
