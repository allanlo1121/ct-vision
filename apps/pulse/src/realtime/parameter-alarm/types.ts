export type ThresholdType = "upper" | "lower" | "deviation" | "range"

export type AlarmSeverity = "warning" | "critical" | "emergency"

export interface ParameterThresholdRule {
  minValue: number | null
  maxValue: number | null
}

export interface TbmParameterThresholdRule extends ParameterThresholdRule {
  tbmCode: string
  parameterCode: string
  severity: AlarmSeverity
}


export type thresholdRule = {
  thresholdType: ThresholdType
  referenceValue: number | null
  thresholdValue: number
}