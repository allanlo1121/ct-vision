// export type ThresholdType = "upper" | "lower" | "deviation" | "range"

// export type AlarmSeverity = "warning" | "critical" | "emergency"

// export interface ParameterThresholdRule {
//   minValue: number | null
//   maxValue: number | null
// }

// export interface TbmParameterThresholdRule extends ParameterThresholdRule {
//   tbmCode: string
//   parameterCode: string
//   severity: AlarmSeverity
// }

import type { ThresholdType } from "@workspace/shared/schemas"

// 报警等级编码，来源于主数据
export type AlarmSeverityCode = string

// 单条阈值规则
export type ParameterThresholdRule = {
  thresholdType: ThresholdType
  referenceValue: number | null
  thresholdValue: number
}

// 单个参数的所有等级规则
export type ParameterThresholdRules = Record<
  AlarmSeverityCode,
  ParameterThresholdRule
>

// 一台 TBM 的所有参数规则
export type TbmParameterThresholdRules = Record<
  string,
  ParameterThresholdRules
>
