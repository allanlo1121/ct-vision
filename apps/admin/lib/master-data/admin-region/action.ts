"use server"
import type {
  CreateAdminRegionInput,
  UpdateAdminRegionInput,
} from "@workspace/master-data/admin-region"
import type { ActionResult } from "@workspace/shared"
import {adminRegionRepository } from "./repository"

export async function createAdminRegion(
  input: CreateAdminRegionInput
): Promise<ActionResult> {
  try {
    await adminRegionRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_COUNTRY_FAILED",
    }
  }
}

export async function updateAdminRegion(
  code: string,
  input: UpdateAdminRegionInput
): Promise<ActionResult> {
  try {
    await adminRegionRepository.update(code, input)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_COUNTRY_FAILED",
    }
  }
}

export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    await adminRegionRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_COUNTRY_FAILED",
    }
  }
}

export async function deleteCountry(
  code: string
): Promise<ActionResult> {
  try {
    await adminRegionRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_COUNTRY_FAILED",
    }
  }
}
