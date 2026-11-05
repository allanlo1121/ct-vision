"use server"
import type { CreateRoleInput, UpdateRoleInput } from "@workspace/system/role"
import type { ActionResult } from "@workspace/shared"
import { roleRepository } from "./role.repository"

export async function createRole(
  input: CreateRoleInput
): Promise<ActionResult> {
  try {
    console.log("Creating role with input:", input)
    const result = await roleRepository.create(input)
    console.log("Role creation result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_ROLE_FAILED",
    }
  }
}

export async function updateRole(
  id: string,
  input: UpdateRoleInput
): Promise<ActionResult> {
  try {
    console.log("Updating role with input:", input)
    const result = await roleRepository.update(id, input)
    console.log("Role update result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_ROLE_FAILED",
    }
  }
}

export async function setRoleDisabled(
  id: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    console.log("Updating role with input:", input)
    await roleRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_ROLE_FAILED",
    }
  }
}

export async function deleteRole(id: string): Promise<ActionResult> {
  try {
    await roleRepository.delete(id)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_ROLE_FAILED",
    }
  }
}
