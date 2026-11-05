import type { Database } from "@workspace/supabase/database"


import type { TbmParameter } from "../parameter/tbm-parameter.schemas"
import type { ParameterBase } from "../parameter"

export type TbmParameterWithBase = TbmParameter & {
  parameter: ParameterBase
}

export type ParameterThresholdListRow = Database["tbm"]["Views"]["v_parameter_threshold_list"]["Row"];





