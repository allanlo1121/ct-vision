"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateDeviceInput,
  UpdateDeviceInput,
} from "@workspace/equip/device"

import { deviceRepository } from "./repository"

export async function createDevice(
  input: CreateDeviceInput
): Promise<ActionResult> {
  try {
    await deviceRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_DEVICE_FAILED",
    }
  }
}

export async function updateDevice(
  id: string,
  input: UpdateDeviceInput
): Promise<ActionResult> {
  try {
    await deviceRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_DEVICE_FAILED",
    }
  }
}
