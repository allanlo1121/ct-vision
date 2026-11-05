"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateTbmAssignmentInput,
  UpdateTbmAssignmentInput,
} from "@workspace/tbm/tbm"
import { tbmAssignmentRepository } from "./repository"

export async function createTbmAssignment(
  input: CreateTbmAssignmentInput
): Promise<ActionResult> {
  try {
    await tbmAssignmentRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_TBM_ASSIGNMENT_FAILED",
    }
  }
}

export async function updateTbmAssignment(
  id: string,
  input: UpdateTbmAssignmentInput
): Promise<ActionResult> {
  try {
    await tbmAssignmentRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_TBM_ASSIGNMENT_FAILED",
    }
  }
}

export async function deleteTbmAssignment(id: string): Promise<ActionResult> {
  try {
    await tbmAssignmentRepository.delete(id)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_TBM_ASSIGNMENT_FAILED",
    }
  }
}
