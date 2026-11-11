"use server"

import type { ActionResult } from "@workspace/shared"
import { ENTITY } from "./constants"

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@workspace/proj/project"
import { projectRepository } from "./repository"

import { ProjectImportRow } from "./import.types"
import { mapProjectImportRowsToEntities } from "./mapper"

export async function imports(
  inputs: ProjectImportRow[]
): Promise<ActionResult> {
  try {
    // 2. 批量映射
    const data = await mapProjectImportRowsToEntities(inputs)

    console.log("Mapped project data:", data)

    if (data.length === 0) {
      return {
        success: false,
        message: "没有可导入的数据",
        code: `IMPORT_${ENTITY.code}_FAILED`,
      }
    }

    await projectRepository.importBatch(data)

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
  input: CreateProjectInput
): Promise<ActionResult> {
  try {
    await projectRepository.create(input)

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
  input: UpdateProjectInput
): Promise<ActionResult> {
  try {
    await projectRepository.update(id, input)
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
    await projectRepository.update(id, input)

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
    await projectRepository.delete(id)

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