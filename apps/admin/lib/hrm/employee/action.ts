"use server"

import type { ActionResult } from "@workspace/shared"
import { importEmployeeSchema } from "@workspace/hrm/employee"
import { employeeRepository } from "./repository"

import { EmployeeImportRow } from "./types"
import { mapEmployeeImportRowsToEntities } from "./mapper"

export async function importEmployees(
  inputs: EmployeeImportRow[]
): Promise<ActionResult<{ count: number }>> {
  try {
    // 1. 批量映射
    const data = await mapEmployeeImportRowsToEntities(inputs)

    if (data.length === 0) {
      return {
        success: false,
        message: "没有可导入的数据",
        code: "IMPORT_EMPLOYEE_FAILED",
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
      code: "IMPORT_EMPLOYEE_FAILED",
    }
  }
}

// bindEmployeeAuth(input)
// unbindEmployeeAuth(input)
