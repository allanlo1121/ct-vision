"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateMqttUserInput,
  UpdateMqttUserInput,
  CreateMqttUserRecordInput,
} from "@workspace/mqtt/user"
import { createMqttUserSchema } from "@workspace/mqtt/user"

import { mqttUserRepository } from "./repository"

import { generateSalt, sha256WithSalt } from "@workspace/shared/utils"

export async function createMqttUser(
  input: CreateMqttUserInput
): Promise<ActionResult> {
  const validated = createMqttUserSchema.parse(input)
  // 服务端生成盐值
  const salt = generateSalt()

  const { password, ...rest } = validated

  // 服务端计算密码哈希
  const passwordHash = sha256WithSalt(password, salt)
  const data: CreateMqttUserRecordInput = {
    ...rest,
    salt,
    password_hash: passwordHash,
  }

  try {
    await mqttUserRepository.create(data)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_MQTT_USER_FAILED",
    }
  }
}

export async function resetMqttUserPassword(
  id: number,
  password: string
): Promise<ActionResult> {
  try {
    const salt = generateSalt()
    const password_hash = sha256WithSalt(password, salt)
    await mqttUserRepository.update(id, { salt, password_hash })

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "RESET_MQTT_USER_PASSWORD_FAILED",
    }
  }
}

export async function updateMqttUser(
  id: number,
  input: UpdateMqttUserInput
): Promise<ActionResult> {
  try {
    await mqttUserRepository.update(Number(id), input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_MQTT_USER_FAILED",
    }
  }
}

export async function setDisabledMqttUser(
  id: number,
  is_disabled: boolean
): Promise<ActionResult> {
  try {
    await mqttUserRepository.update(Number(id), { is_disabled })

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "SET_DISABLED_MQTT_USER_FAILED",
    }
  }
}

export async function deleteMqttUser(id: number): Promise<ActionResult> {
  try {
    await mqttUserRepository.delete(Number(id))

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_MQTT_USER_FAILED",
    }
  }
}
