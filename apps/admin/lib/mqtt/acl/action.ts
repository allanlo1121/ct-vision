"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateMqttAclInput,
  UpdateMqttAclInput,
} from "@workspace/mqtt/acl"

import { mqttAclRepository } from "./repository"

export async function createMqttAcl(
  input: CreateMqttAclInput
): Promise<ActionResult> {
  try {
    await mqttAclRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_MQTT_ACL_FAILED",
    }
  }
}

export async function updateMqttAcl(
  id: number,
  input: UpdateMqttAclInput
): Promise<ActionResult> {
  try {
    await mqttAclRepository.update(Number(id), input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_MQTT_ACL_FAILED",
    }
  }
}

export async function setDisabledMqttAcl(
  id: number,
  is_disabled: boolean
): Promise<ActionResult> {
  try {
    await mqttAclRepository.update(Number(id), { is_disabled })

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "SET_DISABLED_MQTT_ACL_FAILED",
    }
  }
}

export async function deleteMqttAcl(id: number): Promise<ActionResult> {
  try {
    await mqttAclRepository.delete(Number(id))

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_MQTT_ACL_FAILED",
    }
  }
}
