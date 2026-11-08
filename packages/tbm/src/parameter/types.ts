import type { Database } from "@workspace/supabase/database"
import { SetRequired } from "@workspace/shared/utils"

import type { TbmParameter } from "./tbm-parameter.schemas"
import type { ParameterBase } from "./"

export type TbmParameterWithBase = TbmParameter & {
  parameter: ParameterBase
}

// export type ParameterThresholdDefaultWithBase = ParameterThresholdDefault & {
//   parameter: ParameterBase
// }

export type TbmParameterThresholdRuleListRow = Database["tbm"]["Views"]["v_parameter_threshold_rules"]["Row"];


export type TbmParameterThresholdRuleList = SetRequired<
  TbmParameterThresholdRuleListRow,
  | "tbm_code"
  | "parameter_code"
  | "parameter_name"
  | "severity_code"
  | "threshold_type"
  | "threshold_value"
  | "min_record_delta"
  | "min_record_interval_seconds"
>


