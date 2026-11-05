"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateParameterThresholdInput,
  UpdateParameterThresholdInput,
} from "@workspace/tbm/parameter"
import { parameterThresholdRepository } from "./repository"

export async function createParameterThreshold(
  input: CreateParameterThresholdInput
): Promise<ActionResult> {
  try {
    await parameterThresholdRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_PARAMETER_THRESHOLD_FAILED",
    }
  }
}

export async function updateParameterThreshold(
  id: number,
  input: UpdateParameterThresholdInput
): Promise<ActionResult> {
  try {
    await parameterThresholdRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_PARAMETER_THRESHOLD_FAILED",
    }
  }
}

export async function deleteParameterThreshold(
  id: number
): Promise<ActionResult> {
  try {
    await parameterThresholdRepository.delete(id)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_PARAMETER_THRESHOLD_FAILED",
    }
  }
}
