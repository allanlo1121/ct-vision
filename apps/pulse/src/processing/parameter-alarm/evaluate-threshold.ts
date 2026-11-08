
import { ThresholdRule, ThresholdRulesBySeverity, } from "@workspace/tbm/parameter"
import { SeverityCode } from "@workspace/shared"


export type ThresholdResult = {
  severityCode: SeverityCode
  rule: ThresholdRule
} | null

export function evaluateThresholds(
  value: number,
  ringNo: number | null,
  rules: ThresholdRulesBySeverity
): ThresholdResult {
  if (!Number.isFinite(value)) return null

  // 告警等级从高到低
  const severityEntries = Object.entries(rules).sort(
    ([a], [b]) => Number(b) - Number(a)
  )

  for (const [severityCode, severityRules] of severityEntries) {
    if (!severityRules?.length) continue

    // 1. 查找当前环号适用的专用规则
    const specificRules = severityRules.filter((rule) => {
      if (rule.start_ring === null && rule.end_ring === null) {
        return false
      }

      if (ringNo === null) return false

      return (
        (rule.start_ring === null || ringNo >= rule.start_ring) &&
        (rule.end_ring === null || ringNo <= rule.end_ring)
      )
    })

    // 2. 专用优先；没有专用规则时才使用通用规则
    const applicableRules =
      specificRules.length > 0
        ? specificRules
        : severityRules.filter(
            (rule) =>
              rule.start_ring === null &&
              rule.end_ring === null
          )

    // 3. 判断当前等级是否命中
    for (const rule of applicableRules) {
      if (evaluateThreshold(value, rule)) {
        return {
          severityCode: severityCode as SeverityCode,
          rule,
        }
      }
    }
  }

  return null
}
export function evaluateThreshold(
  value: number,
  rule: ThresholdRule
): boolean {
  if (!Number.isFinite(value)) return false

  const { threshold_type, threshold_value, reference_value } = rule

  switch (threshold_type) {
    case "upper":
      return value > threshold_value

    case "lower":
      return value < threshold_value

    case "deviation":
      return (
        reference_value !== null &&
        Math.abs(value - reference_value) > threshold_value
      )

    default:
      return false
  }
}
