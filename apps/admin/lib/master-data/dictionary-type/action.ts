"use server"
import type {
  CreateDictionaryTypeInput,
  UpdateDictionaryTypeInput,
} from "@workspace/master-data/dictionary-type"
import type { ActionResult } from "@workspace/shared"
import { dictionaryTypeRepository } from "./repository"

export async function createDictionaryType(
  input: CreateDictionaryTypeInput
): Promise<ActionResult> {
  try {

    await dictionaryTypeRepository.create(input)
   
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_DICTIONARY_TYPE_FAILED",
    }
  }
}

export async function updateDictionaryType(
  code: string,
  input: UpdateDictionaryTypeInput
): Promise<ActionResult> {
  try {  
    await dictionaryTypeRepository.update(code, input)  
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_DICTIONARY_TYPE_FAILED",
    }
  }
}

export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
   
    await dictionaryTypeRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_DICTIONARY_TYPE_FAILED",
    }
  }
}

export async function deleteDictionaryType(
  code: string
): Promise<ActionResult> {
  try {
    await dictionaryTypeRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_DICTIONARY_TYPE_FAILED",
    }
  }
}
