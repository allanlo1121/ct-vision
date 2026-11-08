"use server"

import type { ActionResult } from "@workspace/shared"
import type {
  CreateTunnelInput,
  UpdateTunnelInput,
} from "@workspace/proj/tunnel"
import { tunnelRepository } from "./repository"

export async function createTunnel(
  input: CreateTunnelInput
): Promise<ActionResult> {
  try {
    await tunnelRepository.create(input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "CREATE_TUNNEL_FAILED",
    }
  }
}

export async function updateTunnel(
  id: string,
  input: UpdateTunnelInput
): Promise<ActionResult> {
  try {
    await tunnelRepository.update(id, input)

    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: "UPDATE_TUNNEL_FAILED",
    }
  }
}

import {
  getTunnelPickerById,
  listTunnelPicker,
} from "./repository"

import type { TunnelPickerQuery } from "./types"

export async function fetchTunnelPicker(
  query: TunnelPickerQuery
) {
  return listTunnelPicker(query)
}

export async function fetchTunnelPickerById(id: string) {
  return getTunnelPickerById(id)
}
