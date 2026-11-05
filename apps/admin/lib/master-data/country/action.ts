"use server"
import type {
  CreateCountryInput,
  UpdateCountryInput,
} from "@workspace/master-data/country"
import type { ActionResult } from "@workspace/shared"
import { countryRepository } from "./repository"

export async function createCountry(
  input: CreateCountryInput
): Promise<ActionResult> {
  try {
    await countryRepository.create(input)

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

export async function updateCountry(
  code: string,
  input: UpdateCountryInput
): Promise<ActionResult> {
  try {
    await countryRepository.update(code, input)
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
    await countryRepository.update(code, input)

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
    await countryRepository.delete(code)
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
