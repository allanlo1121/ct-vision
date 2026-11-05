
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

  const severityEntries = Object.entries(rules).sort(
    ([a], [b]) => Number(b) - Number(a)
  )

  for (const [severityCode, severityRules] of severityEntries) {
    if (!severityRules) continue
    for (const rule of severityRules) {
      // 检查环号范围
      if (rule.start_ring !== null || rule.end_ring !== null) {
        if (ringNo === null) continue

        if (rule.start_ring !== null && ringNo < rule.start_ring) {
          continue
        }

        if (rule.end_ring !== null && ringNo > rule.end_ring) {
          continue
        }
      }

      // 命中当前等级
      if (evaluateThreshold(value, rule)) {
        return {
          severityCode,
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
