"use server"

import type { ActionResult } from "@workspace/shared"

import { subsystemRepository } from "./repository"
import type {
  CreateSubsystemInput,
  UpdateSubsystemInput,
} from "@workspace/tbm/parameter"

export async function createSubsystem(
  input: CreateSubsystemInput
): Promise<ActionResult> {
  try {
    await subsystemRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_SUBSYSTEM_FAILED",
    }
  }
}

export async function updateSubsystem(
  id: string,
  input: UpdateSubsystemInput
): Promise<ActionResult> {
  try {
    await subsystemRepository.update(id, input)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_SUBSYSTEM_FAILED",
    }
  }
}

export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await subsystemRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_SUBSYSTEM_FAILED",
    }
  }
}

export async function deleteSubsystem(code: string): Promise<ActionResult> {
  try {
    await subsystemRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_SUBSYSTEM_FAILED",
    }
  }
}
