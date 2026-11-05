import type { TbmParameter } from "@workspace/tbm/tbm-parameter"

import type { CodeNameOption } from "@workspace/shared"

export type TbmParameterListItem = TbmParameter & {
  name: string
  unit: string | null
  data_type: string
  subsystem_code: string
  digits: number | null
  description: string | null
}

export interface TbmParameterImportRow {
  parameter_code: string
  custom_name: string
  custom_unit: string
  value_max: string
  value_min: string
  remark: string
}

// export type TbmParameterThresholdListItem = ParameterThresholdBase & TbmParameter & Parameter

export interface ParameterThresholdOptions {
  subsystemOptions: CodeNameOption[]
  severityOptions: CodeNameOption[]
}
