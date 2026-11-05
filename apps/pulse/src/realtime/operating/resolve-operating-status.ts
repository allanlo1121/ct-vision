import { TbmOperatingStatus } from "@workspace/tbm/runtime"
import { TbmRealData } from "../../types"

import { toNumber } from "../../utils"

import {
  mainParameterMapping,
  type MainParameter,
} from "./main-parameter.mapping"
import { TbmPhaseType } from "@workspace/shared"

type MainParameterKey = keyof MainParameter

export function resolveMainParameters(data: TbmRealData): MainParameter {
  const result = {} as MainParameter

  for (const key of Object.keys(mainParameterMapping) as MainParameterKey[]) {
    const code = mainParameterMapping[key]
    const rawValue = data.values[code]

    result[key] = toNumber(rawValue)
  }

  return result
}

export function resolvePhaseType(
  excavationMode: boolean | null,
  segmentErectionMode: boolean | null
): TbmPhaseType {
  if (excavationMode === true && segmentErectionMode === true) {
    return "unknown"
  }

  if (excavationMode === true) return "excavation"

  if (segmentErectionMode === true) return "segment_erection"

  if (excavationMode === false && segmentErectionMode === false) {
    return "waiting"
  }

  return "unknown"
}

export function resolveOperatingStatus(
  tbmCode: string,
  data: TbmRealData
): TbmOperatingStatus {
  const mainParameters = resolveMainParameters(data)
  const { excavation_mode, segment_erection_mode, ...rest } = mainParameters

  const tbmPhaseType = resolvePhaseType(
    toMode(excavation_mode),
    toMode(segment_erection_mode)
  )

  return {
    tbm_code: tbmCode,
    ...rest,
    tbm_phase_type: tbmPhaseType,
    sampled_at: new Date(data.sampledAtMs).toISOString(),
  }
}

function toMode(value: number | null): boolean | null {
  return value === null ? null : value !== 0
}
