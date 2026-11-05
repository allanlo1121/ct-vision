import type { TbmOperatingStatus } from "@workspace/tbm/runtime"
import { ringPhaseRepository, ringRecordRepository } from "./repository"

import { TbmPhaseType } from "@workspace/shared"

export interface ProcessRingPhaseInput {
  tbmCode: string
  tunnelId: string
  ringNo: number
  phase: TbmPhaseType
  recordedAt: string
  isNewRing: boolean
}

export async function processRingPhase(
  input: ProcessRingPhaseInput
): Promise<void> {
  const active = await ringPhaseRepository.findActive(input.tbmCode)

  // 没有活动阶段，创建
  if (input.isNewRing || !active) {
    const ringRecord = await ringRecordRepository.findByRingNo(
      input.tunnelId,
      input.ringNo
    )
    if (!ringRecord) {
      console.error("Ring record not found", {
        tunnelId: input.tunnelId,
        ringNo: input.ringNo,
      })
      return
    }
    await ringPhaseRepository.create({
      tbm_code: input.tbmCode,
      ring_record_id: ringRecord.id,
      tbm_phase_type: input.phase,
      started_at: input.recordedAt,
      ended_at: null,
    })
    return
  }

  // 环号未变化，且阶段相同
  if (active.tbm_phase_type === input.phase) {
    return
  }

  // 正常切环，或者阶段发生变化
  await ringPhaseRepository.switchPhase({
    tbm_code: input.tbmCode,
    ring_record_id: active.ring_record_id,
    tbm_phase_type: input.phase,
    started_at: input.recordedAt,
    ended_at: null,
  })
}
