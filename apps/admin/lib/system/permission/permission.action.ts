"use server"
import type { CreatePermissionInput, UpdatePermissionInput } from "@workspace/system/permission"
import type { ActionResult } from "@workspace/shared"
import { permissionRepository } from "./permission.repository"

export async function createPermission(
  input: CreatePermissionInput
): Promise<ActionResult> {
  try {
    console.log("Creating Permission with input:", input)
    const result = await permissionRepository.create(input)
    console.log("Permission creation result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_Permission_FAILED",
    }
  }
}

export async function updatePermission(
  id: string,
  input: UpdatePermissionInput
): Promise<ActionResult> {
  try {
    console.log("Updating Permission with input:", input)
    const result = await permissionRepository.update(id, input)
    console.log("Permission update result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_Permission_FAILED",
    }
  }
}

export async function setPermissionDisabled(
  id: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    console.log("Updating Permission with input:", input)
    await permissionRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_Permission_FAILED",
    }
  }
}

export async function deletePermission(id: string): Promise<ActionResult> {
  try {
    await permissionRepository.delete(id)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_Permission_FAILED",
    }
  }
}
