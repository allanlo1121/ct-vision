
import type { TbmParameterThresholdRule } from "../../parameter-alarm/types"
import { TbmParameterThresholdRules } from "../types"

export function buildTbmParameterThresholdRules(
    rules: TbmParameterThresholdRule[]
): TbmParameterThresholdRules {
    const result: TbmParameterThresholdRules = {}

    for (const {
        parameterCode,
        severity,
        tbmCode: _,
        ...rule
    } of rules) {
        result[parameterCode] ??= {}
        result[parameterCode][severity] = rule
    }

    return result
}