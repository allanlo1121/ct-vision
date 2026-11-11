"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateEngineeringUnitInput,
  UpdateEngineeringUnitInput
} from "@workspace/proj/unit"

import { ENTITY } from "./constants"
import { engineeringUnitRepository } from "./repository"

export async function create(
  project_id: string,
  input: CreateEngineeringUnitInput
): Promise<ActionResult> {
  try {
    await engineeringUnitRepository.create(project_id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_ENGINEERING_UNIT_FAILED",
    }
  }
}

export async function update(
  id: string,
  input: UpdateEngineeringUnitInput
): Promise<ActionResult> {
  try {
    await engineeringUnitRepository.update(id, input)
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

export async function setDisabled(
  id: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await engineeringUnitRepository.update(id, input)

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
    await engineeringUnitRepository.delete(id)
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
