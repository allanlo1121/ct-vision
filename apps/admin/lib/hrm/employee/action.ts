"use server"

import type { ActionResult } from "@workspace/shared"
import type { CreateEmployeeInput, UpdateEmployeeInput } from "@workspace/hrm/employee"

import { employeeRepository } from "./repository"
import { ENTITY } from "./constants"
import { EmployeeImportRow } from "./import.types"
import { mapEmployeeImportRowsToEntities } from "./mapper"

export async function imports(
  inputs: EmployeeImportRow[]
): Promise<ActionResult<{ count: number }>> {
  try {
    // 1. 批量映射
    const data = await mapEmployeeImportRowsToEntities(inputs)

    if (data.length === 0) {
      return {
        success: false,
        message: "没有可导入的数据",
        code: `IMPORT_${ENTITY.code}_FAILED`,
      }
    }

    // 2. 分批导入
    const batchSize = 500
    let importedCount = 0

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)

      await employeeRepository.importBatch(batch)

      importedCount += batch.length

      console.log(`员工导入进度：${importedCount}/${data.length}`)
    }

    return {
      success: true,
      data: {
        count: importedCount,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "员工导入失败",
      code: `IMPORT_${ENTITY.code}_FAILED`,
    }
  }
}


export async function create(
  input: CreateEmployeeInput
): Promise<ActionResult> {
  try {
    await employeeRepository.create(input)

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
  id: string,
  input: UpdateEmployeeInput
): Promise<ActionResult> {
  try {
    await employeeRepository.update(id, input)

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
  id: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await employeeRepository.update(id, input)

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
  id: string
): Promise<ActionResult> {
  try {
    await employeeRepository.delete(id)

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