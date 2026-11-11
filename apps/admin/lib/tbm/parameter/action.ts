"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateParameterInput,
  UpdateParameterInput,
} from "@workspace/tbm/parameter"
import { parameterRepository } from "./repository"
import { ENTITY } from "./constants"

export async function create(
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
      code: `CREATE_${ENTITY.code}_FAILED`,
    }
  }
}

export async function update(
  code: string,
  input: UpdateParameterInput
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
      code: `UPDATE_${ENTITY.code}_FAILED`,
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
      code: `SETDISABLED_${ENTITY.code}_FAILED`,
    }
  }
}

export async function remove(code: string): Promise<ActionResult> {
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
      code: `DELETE_${ENTITY.code}_FAILED`,
    }
  }
}
