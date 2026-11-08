"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateTbmAssignmentInput,
  UpdateTbmAssignmentInput,
} from "@workspace/tbm/tbm"
import { tbmAssignmentRepository } from "./repository"
import { ENTITY } from "./constants"

export async function create(
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
      code: `CREATE_${ENTITY.code}_FAILED`,
    }
  }
}

export async function update(
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
      code: `UPDATE_${ENTITY.code}_FAILED`,
    }
  }
}

export async function remove(id: string): Promise<ActionResult> {
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
      code: `DELETE_${ENTITY.code}_FAILED`,
    }
  }
}
