"use server"

import type { ActionResult } from "@workspace/shared"
import { organizationRepository } from "./repository"
import { ENTITY } from "./constants"
import { OrganizationImportRow } from "./import.types"
import { mapOrganizationImportRowsToEntities } from "./mapper"
import type { CreateOrganizationInput, UpdateOrganizationInput } from "@workspace/hrm/organization"

export async function imports(
  inputs: OrganizationImportRow[]
): Promise<ActionResult> {
  try {
    // 2. 批量映射
    const data = await mapOrganizationImportRowsToEntities(inputs)



    if (data.length === 0) {
      return {
        success: false,
        message: "没有可导入的数据",
        code: `IMPORT_${ENTITY.code}_FAILED`,
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
      code: `IMPORT_${ENTITY.code}_FAILED`,
    }
  }
}


export async function create(
  input: CreateOrganizationInput
): Promise<ActionResult> {
  try {
    await organizationRepository.create(input)

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
  input: UpdateOrganizationInput
): Promise<ActionResult> {
  try {
    await organizationRepository.update(id, input)

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
    await organizationRepository.update(id, input)

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
    await organizationRepository.delete(id)

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