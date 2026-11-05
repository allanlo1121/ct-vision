// processing/realdata/process-realdata.ts

import type { TbmRealData } from "../types"
import { tbmRealtimeContextStore } from "../context"

import { resolvePhaseType } from "./ring-phase/utils"
import { toNumber, toBoolean, toNumberFallback } from "../utils"
import { processRingPhase } from "./ring-phase/process"
import { processAlarm } from "./parameter-alarm/process"
import { validateRingRange } from "./ring-phase/validate-ring"


export async function processRealdata(
  tbmCode: string,
  data: TbmRealData
): Promise<void> {
  // 1. 获取设备上下文
  const context = tbmRealtimeContextStore.get(tbmCode)

  if (!context) {
    console.warn("TBM context not found", { tbmCode })
    return
  }

  // 2. 校验采样时间
  const { sampledAtMs } = data
  if (sampledAtMs === null || !Number.isFinite(sampledAtMs)) {
    return
  }

  const sampledAt = new Date(data.sampledAtMs).toISOString()

  const { assignment, rules } = context

  // console.log("assignment",assignment)

  const ring_no = toNumberFallback(
    data.values?.s100100008,
    data.values?.s050100008
  )

  const ringResult = validateRingRange(
    ring_no,
    assignment.start_ring,
    assignment.end_ring
  )

  // console.log("validateRingRange", ringResult)

  if (!ringResult.valid) {
    console.error("Ring validation failed", {
      tbmCode,
      ringNo: ring_no,
      startRing: assignment.start_ring,
      endRing: assignment.end_ring,
      warning: ringResult.warning,
    })
    return
  }

  const chainage = toNumber(data.values?.s100100005)

  const excavationMode = toBoolean(data.values?.b000000001)
  const segmentErectionMode = toBoolean(data.values?.b000000002)

  const tbm_phase_type = resolvePhaseType(excavationMode, segmentErectionMode)

  const { values } = data


  // 5. 执行后续业务计算
  const tasks = [
    {
      name: "phase",
      run: () =>
        processRingPhase(
          assignment.tbm_code,
          assignment.tunnel_id,
          ringResult.ringNo,
          tbm_phase_type,
          sampledAt,
          chainage
        ),
    },

    {
      name: "alarm",
      run: () =>
        processAlarm(
          {
            assignment,
            rules,
            values,
            ringNo: ringResult.ringNo,
            chainage,
            phaseType: tbm_phase_type,
            sampledAt,
          }

        ),
    },
  ]

  // 6. 各模块独立执行，避免一个失败影响其他模块
  const results = await Promise.allSettled(tasks.map((task) => task.run()))

  // console.log("results",results)

  // 7. 统一记录错误
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error("TBM processor failed", {
        tbmCode,
        processor: tasks[index].name,
        error: result.reason,
      })
    }
  })
}
