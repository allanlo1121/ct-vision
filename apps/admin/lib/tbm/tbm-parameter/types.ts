import type { TbmParameter } from "@workspace/tbm/tbm-parameter"

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
