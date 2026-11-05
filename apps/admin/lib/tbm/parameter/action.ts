"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateParameterInput,
  UpdateParameterInput,
} from "@workspace/tbm/parameter"
import { parameterRepository } from "./repository"

export async function createParameter(
  input: CreateParameterInput
): Promise<ActionResult> {
  try {
    await parameterRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_PARAMETER_FAILED",
    }
  }
}

export async function updateParameter(
  id: string,
  input: UpdateParameterInput
): Promise<ActionResult> {
  try {
    await parameterRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_PARAMETER_FAILED",
    }
  }
}


export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await parameterRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_PARAMETER_FAILED",
    }
  }
}

export async function deleteParameter(code: string): Promise<ActionResult> {
  try {
    await parameterRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_PARAMETER_FAILED",
    }
  }
}
