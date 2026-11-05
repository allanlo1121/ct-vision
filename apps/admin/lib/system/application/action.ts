"use server"
import type {
  CreateApplicationInput,
  UpdateApplicationInput,
} from "@workspace/system/application"
import type { ActionResult } from "@workspace/shared"
import { applicationRepository } from "./repository"

export async function createApplication(
  input: CreateApplicationInput
): Promise<ActionResult> {
  try {
    console.log("Creating application with input:", input)
    const result = await applicationRepository.create(input)
    console.log("application creation result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_APPLICATION_FAILED",
    }
  }
}

export async function updateApplication(
  code: string,
  input: UpdateApplicationInput
): Promise<ActionResult> {
  try {
    console.log("Updating application with input:", input)
    const result = await applicationRepository.update(code, input)
    console.log("application update result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_APPLICATION_FAILED",
    }
  }
}

export async function setApplicationDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    console.log("Updating application with input:", input)
    await applicationRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_APPLICATION_FAILED",
    }
  }
}

export async function deleteApplication(code: string): Promise<ActionResult> {
  try {
    await applicationRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_APPLICATION_FAILED",
    }
  }
}
