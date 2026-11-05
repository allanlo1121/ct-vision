"use server"
import type {
  CreateDictionaryItemInput,
  UpdateDictionaryItemInput,
} from "@workspace/master-data/dictionary-item"
import type { ActionResult } from "@workspace/shared"
import { dictionaryItemRepository } from "./repository"

export async function createDictionaryItem(
  input: CreateDictionaryItemInput
): Promise<ActionResult> {
  try {
    console.log("Creating dictionary item with input:", input)
    const result = await dictionaryItemRepository.create(input)
    console.log("dictionary item creation result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_DICTIONARY_ITEM_FAILED",
    }
  }
}

export async function updateDictionaryItem(
  code: string,
  input: UpdateDictionaryItemInput
): Promise<ActionResult> {
  try {
    console.log("Updating dictionary item with input:", input)
    const result = await dictionaryItemRepository.update(code, input)
    console.log("dictionary item update result:", result)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_DICTIONARY_ITEM_FAILED",
    }
  }
}

export async function setDisabled(
  code: string,
  input: { is_disabled: boolean }
): Promise<ActionResult> {
  try {
    console.log("Updating dictionary item with input:", input)
    await dictionaryItemRepository.update(code, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_DICTIONARY_ITEM_FAILED",
    }
  }
}

export async function deleteDictionaryItem(
  code: string
): Promise<ActionResult> {
  try {
    await dictionaryItemRepository.delete(code)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_DICTIONARY_ITEM_FAILED",
    }
  }
}
