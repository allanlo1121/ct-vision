// realtime/get-tbm-context.ts

import { tbmOperatingStatusStore } from "../operating-status"
import { tbmAssignmentStore } from "../tbm-assignment"

import { TbmRealtimeContext } from "./types"
export function getTbmRealtimeContext(
  tbmCode: string
): TbmRealtimeContext | null {
  const tbmAssignment = tbmAssignmentStore.get(tbmCode)

  if (!tbmAssignment) {
    return null
  }

  return {
    tbmAssignment,
    operatingStatus: tbmOperatingStatusStore.get(tbmCode),
    connectionState: null,
    thresholdRules: null,
  }
}
