import { CreateParameterAlarmInput } from "@workspace/tbm/runtime"

import type { RingAlarmType } from "./types"
import { parameterAlarmRepository } from "../parameter-alarm/repository"

export async function raiseRingAlarm(input: {
  tbmCode: string
  type: RingAlarmType
  ringNo: number | null
  chainage: number | null

  alarmValue: number | null

  recordedAt: string
}): Promise<void> {
  const data: CreateParameterAlarmInput = {
    tbm_code: input.tbmCode,
    parameter_code: "s100100008",
    ring_no: input.ringNo ?? 0,
    chainage: input.chainage,
    alarm_value: input.alarmValue ?? 0,
    severity_code: "52010001",
    rule_snapshot: {
      threshold_type: "upper",
      reference_value: 0,
      threshold_value: 0,
    },

    started_at: input.recordedAt,
    ended_at: null,
  }

  await parameterAlarmRepository.upsert(data)
}
