"use server"

import type { ActionResult } from "@workspace/shared"

import type {
  CreateTbmInput,
  UpdateTbmInput,
  ImportTbmInput,
} from "@workspace/tbm/tbm"
import { tbmRepository } from "./repository"
import { mapTbmImportRowsToEntities } from "./mapper"

export async function createTbm(input: CreateTbmInput): Promise<ActionResult> {
  try {
    await tbmRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_TBM_FAILED",
    }
  }
}

export async function updateTbm(
  code: string,
  input: UpdateTbmInput
): Promise<ActionResult> {
  try {
    await tbmRepository.update(code, input)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_TBM_FAILED",
    }
  }
}

export async function importTbms(
  inputs: ImportTbmInput[]
): Promise<ActionResult> {
  try {
    // 2. 批量映射
    const data = await mapTbmImportRowsToEntities(inputs)

    // console.log("Mapped project data:", data)

    if (data.length === 0) {
      return {
        success: false,
        message: "没有可导入的数据",
        code: "IMPORT_TBM_FAILED",
      }
    }

    await tbmRepository.importBatch(data)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "IMPORT_TBM_FAILED",
    }
  }
}
