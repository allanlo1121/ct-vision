"use server"

import type { ActionResult } from "@workspace/shared"
import type { CreateEngineeringUnitInput } from "@workspace/proj/unit"
import { engineeringUnitRepository } from "./repository"
import type { UpdateEngineeringUnitInput } from "@workspace/proj/unit"

export async function createEngineeringUnit(
  input: CreateEngineeringUnitInput
): Promise<ActionResult> {
  try {
    await engineeringUnitRepository.create(input)

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

export async function updateEngineeringUnit(
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
      code: "UPDATE_ENGINEERING_UNIT_FAILED",
    }
  }
}

export async function setEngineeringUnitDisabled(
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
      code: "UPDATE_ENGINEERING_UNIT_FAILED",
    }
  }
}

export async function deleteEngineeringUnit(id: string): Promise<ActionResult> {
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
      code: "DELETE_ENGINEERING_UNIT_FAILED",
    }
  }
}
