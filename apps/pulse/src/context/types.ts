import { TbmAssignmentContext } from "@workspace/tbm/tbm"

import { ThresholdRulesByParameter } from "@workspace/tbm/parameter"

export type TbmRealtimeContext = {
  assignment: TbmAssignmentContext

  rules: ThresholdRulesByParameter
}
