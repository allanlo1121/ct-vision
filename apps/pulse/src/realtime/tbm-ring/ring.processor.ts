import { raiseRingAlarm } from "./ring-alarm"

import {
  CreateRingRecordInput,
  TbmOperatingStatus,
} from "@workspace/tbm/runtime"
import { TbmAssignmentCurrentRow } from "@workspace/tbm/tbm"
import { validateRingRange, validateRingChange } from "./validate-ring"
import { ringRecordRepository } from "./repository"
import { processRingPhase, ProcessRingPhaseInput } from "./ring-phase.processor"
import { is } from "date-fns/locale"
import { start } from "node:repl"

export async function processRing(
  assignment: TbmAssignmentCurrentRow,
  current: TbmOperatingStatus,
  previous: TbmOperatingStatus | null
): Promise<void> {
  const { tbm_code, tunnel_id, start_ring, end_ring } = assignment

  if (!tbm_code || !tunnel_id) return

  const previousRingNo = previous?.ring_no ?? null
  const recordedAt = current.sampled_at ?? new Date().toISOString()

  // 1. 环号范围校验
  const rangeResult = validateRingRange(current.ring_no, start_ring, end_ring)

  if (!rangeResult.valid) {
    console.error("Ring range validation failed", {
      tbmCode: tbm_code,
      ringNo: current.ring_no,
      startRing: start_ring,
      endRing: end_ring,
    })
    await raiseRingAlarm({
      tbmCode: tbm_code,
      type: rangeResult.anomaly,
      ringNo: current.ring_no,
      chainage: current.chainage,
      alarmValue: rangeResult.alarmValue,
      recordedAt,
    })
    return
  }

  const ringNo = rangeResult.ringNo

  // 2. 环号变化校验

  const changeResult = validateRingChange(ringNo, previousRingNo)
  // console.error("Ring change validation result", {
  //   tbmCode: tbm_code,
  //   ringNo,
  //   previousRingNo,
  //   valid: changeResult.valid,
  //   anomaly: changeResult.anomaly,
  //   alarmValue: changeResult.alarmValue,
  // })

  if (!changeResult.valid) {
    console.error("Ring change validation failed", {
      tbmCode: tbm_code,
      ringNo,
      previousRingNo,
      delta: changeResult.delta,
    })
    await raiseRingAlarm({
      tbmCode: tbm_code,
      type: changeResult.anomaly,
      ringNo,
      chainage: current.chainage,
      alarmValue: changeResult.alarmValue,
      recordedAt,
    })
  }

  // 3. 有效环号：首次、相同、+1
  await ringRecordRepository.upsert({
    tbm_code,
    tunnel_id,
    ring_no: ringNo!,
    start_chainage: current.chainage,
    end_chainage: current.chainage,
    started_at: recordedAt,
    ended_at: recordedAt,
  })

  const isNewRing = changeResult.delta !== null && changeResult.delta > 0

  const phaseData: ProcessRingPhaseInput = {
    tbmCode: tbm_code,
    tunnelId: tunnel_id,
    ringNo: ringNo!,
    phase: current.tbm_phase_type,
    recordedAt: recordedAt,
    isNewRing,
  }

  await processRingPhase(phaseData)
}
