"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateTbmParameterThresholdInput,
  UpdateTbmParameterThresholdInput,
} from "@workspace/tbm/parameter"
import { tbmParameterThresholdRepository } from "./repository"
import { ENTITY } from "./constants"

export async function create(
  input: CreateTbmParameterThresholdInput
): Promise<ActionResult> {
  try {
    await tbmParameterThresholdRepository.create(input)

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
  input: UpdateTbmParameterThresholdInput
): Promise<ActionResult> {
  try {
    await tbmParameterThresholdRepository.update(id, input)

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
  inputs: CreateTbmParameterThresholdInput[]
): Promise<ActionResult> {
  try {
    await tbmParameterThresholdRepository.upsertMany(inputs)

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

export async function remove(
  id: number
): Promise<ActionResult> {
  try {
    await tbmParameterThresholdRepository.delete(id)

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