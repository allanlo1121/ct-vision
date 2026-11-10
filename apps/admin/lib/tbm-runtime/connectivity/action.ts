"use server"

import type { ActionResult, TbmCode } from "@workspace/shared"

import { tbmConnectivityRepository } from "./repository"
// import type {
//   CreateSubsystemInput,
//   UpdateSubsystemInput,
// } from "@workspace/tbm/parameter"
import { ENTITY } from "./constants"
// export async function create(
//   input: CreateSubsystemInput
// ): Promise<ActionResult> {
//   try {
//     await subsystemRepository.create(input)

//     return {
//       success: true,
//       data: undefined,
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: (error as Error).message,
//       code: `CREATE_${ENTITY.code}_FAILED`,
//     }
//   }
// }

// export async function update(
//   id: string,
//   input: UpdateSubsystemInput
// ): Promise<ActionResult> {
//   try {
//     await subsystemRepository.update(id, input)
//     return {
//       success: true,
//       data: undefined,
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: (error as Error).message,
//       code: `UPDATE_${ENTITY.code}_FAILED`,
//     }
//   }
// }

// export async function setDisabled(
//   code: string,
//   input: { is_disabled: boolean }
// ): Promise<ActionResult> {
//   try {
//     await subsystemRepository.update(code, input)

//     return {
//       success: true,
//       data: undefined,
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: (error as Error).message,
//       code: `SETDISABLED_${ENTITY.code}_FAILED`,
//     }
//   }
// }

export async function remove(tbmCode: TbmCode): Promise<ActionResult> {
  try {
    await tbmConnectivityRepository.delete(tbmCode)
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      code: `DELETE_${ENTITY.code}_FAILED`,
    }
  }
}
