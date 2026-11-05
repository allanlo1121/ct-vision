import { TbmAssignmentCurrentRow } from "@workspace/tbm/tbm"
import { TbmConnectionState } from "../tbm-connection/types"
import { TbmParameterThresholdRules } from "../parameter-threshold/types"

import type { TbmOperatingStatus } from "@workspace/tbm/runtime"

// export type TbmRealtimeContext = {
//   tbmAssignment: TbmAssignmentCurrentRow

//   operatingStatus?: TbmOperatingStatus

//   connectionState: TbmConnectionState | null

//   thresholdRules: TbmParameterThresholdRules | null
// }


export type TbmRealtimeContext = {
  assignment: TbmAssignmentCurrentRow

  runtime: {
    operatingStatus: TbmOperatingStatus | null
    connectionState: TbmConnectionState | null
  }

  rules: {
    parameterThresholds: TbmParameterThresholdRules
  }
}