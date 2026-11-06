"use server"

import type { ActionResult } from "@workspace/shared"
import { importOrganizationSchema } from "@workspace/hrm/organization"
import { organizationRepository } from "./repository"

import { OrganizationImportRow } from "./types"
import { mapOrganizationImportRowsToEntities } from "./mapper"

export async function importOrganizations(
  inputs: OrganizationImportRow[]
): Promise<ActionResult> {
  try {
    // 2. 批量映射
    const data = await mapOrganizationImportRowsToEntities(inputs)



    if (data.length === 0) {
      return {
        success: false,
        message: "没有可导入的数据",
        code: "IMPORT_ORGANIZATION_FAILED",
      }
    }

    await organizationRepository.importBatch(data)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "IMPORT_ORGANIZATION_FAILED",
    }
  }
}
