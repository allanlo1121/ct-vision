"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateParameterThresholdDefaultInput,
  UpdateParameterThresholdDefaultInput,
} from "@workspace/tbm/parameter"
import { parameterThresholdDefaultRepository } from "./repository"
import { ENTITY } from "./constants"

export async function create(
  input: CreateParameterThresholdDefaultInput
): Promise<ActionResult> {
  try {
    await parameterThresholdDefaultRepository.create(input)

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
  id: number,
  input: UpdateParameterThresholdDefaultInput
): Promise<ActionResult> {
  try {
    await parameterThresholdDefaultRepository.update(id, input)

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

export async function upsertMany(
  inputs: CreateParameterThresholdDefaultInput[]
): Promise<ActionResult> {
  try {
    await parameterThresholdDefaultRepository.upsertMany(inputs)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: `UPASERT_${ENTITY.code}_FAILED`,
    }
  }
}

export async function setDisabled(
  id: number,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await parameterThresholdDefaultRepository.update(id, input)

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

export async function remove(
  id: number
): Promise<ActionResult> {
  try {
    await parameterThresholdDefaultRepository.delete(id)

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
