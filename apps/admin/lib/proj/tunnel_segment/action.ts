"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateSegmentInput,
  UpdateSegmentInput,
} from "@workspace/proj/tunnel"
import { segmentRepository } from "./repository"

export async function createSegment(
  input: CreateSegmentInput
): Promise<ActionResult> {
  try {
    await segmentRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_SEGMENT_FAILED",
    }
  }
}

export async function updateSegment(
  id: string,
  input: UpdateSegmentInput
): Promise<ActionResult> {
  try {
    await segmentRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_SEGMENT_FAILED",
    }
  }
}

export async function deleteSegment(
  id: string
): Promise<ActionResult> {
  try {
    await segmentRepository.delete(id)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "DELETE_SEGMENT_FAILED",
    }
  }
}
