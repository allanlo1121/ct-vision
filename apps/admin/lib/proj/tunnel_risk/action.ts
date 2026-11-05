"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateRiskInput,
  UpdateRiskInput,
} from "@workspace/proj/tunnel"
import { riskRepository } from "./repository"

export async function createRisk(
  input: CreateRiskInput
): Promise<ActionResult> {
  try {
    await riskRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_RISK_FAILED",
    }
  }
}

export async function updateRisk(
  id: string,
  input: UpdateRiskInput
): Promise<ActionResult> {
  try {
    await riskRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_RISK_FAILED",
    }
  }
}

export async function deleteRisk(id: string): Promise<ActionResult> {
  try {
    await riskRepository.delete(id)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_RISK_FAILED",
    }
  }
}
