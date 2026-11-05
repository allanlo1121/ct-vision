import type { TbmRealtimeContext } from "../realtime-context/types"
import type { TbmRealtimeData } from "../types"
import type { ParameterThresholdRule, AlarmSeverity } from "./types"
import {
  raiseParameterAlarm,
  recoverParameterAlarm,
} from "./alarm.repository"

const SEVERITIES: AlarmSeverity[] = ["emergency", "critical", "warning"]

export async function processParameterAlarms(
  context: TbmRealtimeContext,
  data: TbmRealtimeData,
  allowRecovery: boolean = false
): Promise<void> {
  const parameterRules = context.parameterRules
  // console.log("parameterRules", data.recordedAt)

  const recordedAt = data.recordedAt ?? new Date().toISOString()

  for (const [parameterCode, rules] of Object.entries(parameterRules)) {
    const rawValue = data.values[parameterCode]

    if (rawValue == null) {
      continue
    }

    const value = typeof rawValue === "number" ? rawValue : Number(rawValue)

    if (!Number.isFinite(value)) {
      continue
    }

    let alarmSeverity: AlarmSeverity | null = null

    // 从最高等级开始判断
    for (const severity of SEVERITIES) {
      const rule = rules[severity]

      if (!rule) {
        continue
      }

      if (evaluateThresholdRule(value, rule)) {
        alarmSeverity = severity
        break
      }
    }

    // 当前处于报警状态
    if (alarmSeverity) {
      await raiseParameterAlarm(
        data.tbmCode,
        parameterCode,
        data.ringNo,
        data.chainage,
        alarmSeverity,
        value,
        recordedAt
      )
      continue
    }

    // 当前正常，并且本次允许恢复
    if (allowRecovery) {
      await recoverParameterAlarm(data.tbmCode, parameterCode)
    }
  }
}

export async function processParameterAlarmRecoveries(
  context: TbmRealtimeContext,
  data: TbmRealtimeData
): Promise<void> {
  const parameterRules = context.parameterRules

  const recordedAt = Number.isNaN(new Date(data.recordedAt).getTime())
    ? new Date().toISOString()
    : new Date(data.recordedAt).toISOString()

  for (const [parameterCode, rules] of Object.entries(parameterRules)) {
    const rawValue = data.values[parameterCode]

    if (rawValue == null) {
      continue
    }

    const value = typeof rawValue === "number" ? rawValue : Number(rawValue)

    if (!Number.isFinite(value)) {
      continue
    }

    let hasAlarm = false

    // 判断当前值是否仍然命中任意报警等级
    for (const severity of SEVERITIES) {
      const rule = rules[severity]

      if (!rule) {
        continue
      }

      if (evaluateThresholdRule(value, rule)) {
        hasAlarm = true
        break
      }
    }

    // 仍然处于报警范围，不恢复
    if (hasAlarm) {
      continue
    }

    // 当前已经正常，尝试恢复历史报警
    await recoverParameterAlarm(data.tbmCode, parameterCode)
  }
}

export function evaluateThresholdRule(
  value: number,
  rule: ParameterThresholdRule
): boolean {
  switch (rule.thresholdType) {
    case "upper":
      return rule.thresholdValue != null && value >= rule.thresholdValue

    case "lower":
      return rule.thresholdValue != null && value <= rule.thresholdValue

    case "deviation":
      if (rule.referenceValue == null || rule.thresholdValue == null) {
        return false
      }
      return Math.abs(value - rule.referenceValue!) >= rule.thresholdValue!

    case "range":
      return (
        rule.minValue != null &&
        rule.maxValue != null &&
        (value < rule.minValue || value > rule.maxValue)
      )

    default:
      return false
  }
}
