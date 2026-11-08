"use server"

import type { ActionResult } from "@workspace/shared"

import type {
  CreateTbmInput,
  UpdateTbmInput,
  ImportTbmInput,
} from "@workspace/tbm/tbm"
import { tbmRepository } from "./repository"
import { mapTbmImportRowsToEntities } from "./mapper"
import { ENTITY } from "./constants"


export async function create(input: CreateTbmInput): Promise<ActionResult> {
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
      code: `CREATE_${ENTITY.code}_FAILED`,
    }
  }
}

export async function update(
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
      code: `UPDATE_${ENTITY.code}_FAILED`,
    }
  }
}

export async function importMany(
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
        code: `IMPORT_${ENTITY.code}_FAILED`,
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
      code: `IMPORT_${ENTITY.code}_FAILED`,
    }
  }
}
export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
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
      code: `SETDISABLED_${ENTITY.code}_FAILED`,
    }
  }
}
export async function remove(
  code: string
): Promise<ActionResult> {
  try {
    await tbmRepository.delete(code)
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

