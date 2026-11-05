import type {
  TbmParameterWithBase,
  ImportTbmParameterInput,
} from "@workspace/tbm/tbm-parameter"
import type { TbmParameterListItem, TbmParameterImportRow } from "./types"
import type {} from "./types"

import { toNullableNumber, toNullableString } from "@/lib/utils"

export function toTbmParameterListItem(
  item: TbmParameterWithBase
): TbmParameterListItem {
  const { parameter, ...rest } = item

  return {
    ...rest,
    name: parameter.name,
    unit: parameter.unit,
    data_type: parameter.data_type,
    subsystem_code: parameter.subsystem_code,
    digits: parameter.digits,
    description: parameter.description,
  }
}

export function mapTbmParameterImportRows(
  rows: TbmParameterImportRow[]
): ImportTbmParameterInput[] {
  return rows.map((row, index) => {
    if (!row.parameter_code?.trim()) {
      throw new Error(`第 ${index + 2} 行：参数编码不能为空`)
    }

    return {
      parameter_code: row.parameter_code.trim(),
      custom_name: toNullableString(row.custom_name),
      custom_unit: toNullableString(row.custom_unit),
      value_max: toNullableNumber(row.value_max),
      value_min: toNullableNumber(row.value_min),
      remark: toNullableString(row.remark),
    }
  })
}
