"use server"

import type { ActionResult } from "@workspace/shared"
import { importProjectSchema } from "@workspace/proj/project"
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@workspace/proj/project"
import { projectRepository } from "./repository"

import { ProjectImportRow } from "./types"
import { mapProjectImportRowsToEntities } from "./mapper"

export async function importProjects(
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
        code: "IMPORT_PROJECT_FAILED",
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
      code: "IMPORT_PROJECT_FAILED",
    }
  }
}

export async function createProject(
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
      code: "CREATE_PROJECT_FAILED",
    }
  }
}

export async function updateProject(
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
      code: "UPDATE_PROJECT_FAILED",
    }
  }
}
