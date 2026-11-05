"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateTbmParameterInput,
  UpdateTbmParameterInput,
  ImportTbmParameterInput,
} from "@workspace/tbm/tbm-parameter"
import { tbmParameterRepository } from "./repository"

export async function createTbmParameter(
  input: CreateTbmParameterInput
): Promise<ActionResult> {
  try {
    await tbmParameterRepository.create(input)

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

export async function updateTbmParameter(
  id: number,
  input: UpdateTbmParameterInput
): Promise<ActionResult> {
  try {
    await tbmParameterRepository.update(id, input)

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
  id: number,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await tbmParameterRepository.update(id, input)

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

export async function deleteTbmParameter(id: number): Promise<ActionResult> {
  try {
    await tbmParameterRepository.delete(id)
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

export async function importTbmParameters(
  tbmCode: string,
  input: ImportTbmParameterInput[]
): Promise<ActionResult> {
  try {
    await tbmParameterRepository.import(tbmCode, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "IMPORT_PARAMETER_FAILED",
    }
  }
}

import { tbmCodeSchema } from "@workspace/shared"

export async function syncTbmRealdataTable(
  tbmCode: string
): Promise<ActionResult> {
  try {
    const code = tbmCodeSchema.parse(tbmCode)

    // 必须在服务端验证当前用户具有管理设备表结构的权限
    // await requirePermission("tbm.write")

    await tbmParameterRepository.syncTbmRealdataTable(code)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    console.error("syncTbmRealdataTable failed:", error)

    return {
      success: false,
      message: "同步实时数据表失败",
      code: "SYNC_TBM_REALDATA_FAILED",
    }
  }
}
