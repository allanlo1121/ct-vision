"use server"
import type {
  CreateGeologicalTypeInput,
  UpdateGeologicalTypeInput,
} from "@workspace/master-data/geological-type"
import type { ActionResult } from "@workspace/shared"
import {geologicalTypeRepository } from "./repository"

export async function createGeologicalType(
  input: CreateGeologicalTypeInput
): Promise<ActionResult> {
  try {
    await geologicalTypeRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_GEOLOGICAL_TYPE_FAILED",
    }
  }
}

export async function updateGeologicalType(
  code: string,
  input: UpdateGeologicalTypeInput
): Promise<ActionResult> {
  try {
    await geologicalTypeRepository.update(code, input)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_GEOLOGICAL_TYPE_FAILED",
    }
  }
}

export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await geologicalTypeRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_GEOLOGICAL_TYPE_FAILED",
    }
  }
}

export async function deleteGeologicalType(
  code: string
): Promise<ActionResult> {
  try {
    await geologicalTypeRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_GEOLOGICAL_TYPE_FAILED",
    }
  }
}
