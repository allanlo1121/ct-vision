
import { TbmParameterValues } from "../../types"
import { toNumber } from "../../utils"
import { TbmPhaseType,toNotificationLevel,AlertSeverityCode } from "@workspace/shared"
import { evaluateThresholds } from "./evaluate-threshold"
import { parameterAlarmRepository } from "./repository"
import { thresholdRuleSchema } from "@workspace/tbm/parameter"
import { notificationEventRepository } from "../../notification"
import { ApplyParameterAlarmInput } from "@workspace/tbm/runtime";
import type { TbmAssignmentContext } from "@workspace/tbm/tbm"
import type { ThresholdRulesByParameter } from "@workspace/tbm/parameter"
import type { ParameterAlarmPayload } from "@workspace/tbm/event"
import { roundParameterValue } from "../../utils/math"

export interface ProcessAlarmInput {
  assignment: TbmAssignmentContext
  rules: ThresholdRulesByParameter
  values: TbmParameterValues

  ringNo: number
  chainage: number | null
  phaseType: TbmPhaseType
  sampledAt: string
}

export async function processAlarm({
  assignment,
  rules,
  values,
  ringNo,
  chainage,
  phaseType,
  sampledAt,
}: ProcessAlarmInput): Promise<void> {
  // 1. 参数阀值计算

  const { tbm_code, tunnel_id } = assignment

  // 2. 遍历所有配置阈值的参数
  for (const [parameterCode, parameterRules] of Object.entries(rules)) {
    // 获取参数实时值
    const value = toNumber(values[parameterCode])

    // 参数缺失或无效，不进行报警计算
    if (value === null) continue

    // 3. 计算最高命中报警等级
    const alarmResult = evaluateThresholds(value, ringNo, parameterRules)

    // console.log("evaluateParameterThreshold", result)

    if (!alarmResult) continue

    const input: ApplyParameterAlarmInput = {
      tbm_code,
      tunnel_id,
      parameter_code: parameterCode,

      severity_code: alarmResult.severityCode,
      rule_snapshot: alarmResult.rule
        ? thresholdRuleSchema.parse(alarmResult.rule)
        : null,

      alarm_value: value,
      ring_no: ringNo,
      chainage,
      occurred_at: sampledAt,
    }

    // console.log("input", input)

    // 4. 写入数据库
    const applyResult = await parameterAlarmRepository.applyParameterAlarm(input)
    // console.log("apply alarm ", applyResult)

    if (!applyResult) continue
    const alarmId = applyResult
    console.log("[Pulse][Alarm] Created", {
      alarmId,
      tbmCode: tbm_code,
      parameterCode,
      severity: alarmResult.severityCode,
      value,
      ringNo,
    })

    const payload = {
      tbm_code: input.tbm_code,
      tbm_name: assignment.tbm_name!,
      project_name: assignment.project_name!,
      tunnel_id: assignment.tunnel_id,
      tunnel_name: assignment.tunnel_name!,

      parameter_code: input.parameter_code,
      parameter_name: alarmResult.rule.parameter_name,
      parameter_unit: alarmResult.rule.parameter_unit,
      severity_code: alarmResult.rule.severity_code,
      severity_name: alarmResult.rule.severity_name,

      alarm_value: roundParameterValue(value, alarmResult.rule.digits),
      ring_no: input.ring_no,
      chainage: input.chainage,
    } satisfies ParameterAlarmPayload

    await notificationEventRepository.create({
      source_type_code: "parameter",
      source_id: String(alarmId),
      event_type_code: alarmResult.rule.subsystem_code,
      level: toNotificationLevel(alarmResult.severityCode as AlertSeverityCode),
      organization_id: assignment.organization_id,
      project_id: assignment.project_id,
      occurred_at: input.occurred_at,
      payload: payload,
      processed_at: null,
      retry_count: 0,
      processing_error: null
    })

    console.log("[Pulse][Notification] Created", {
      alarmId,
      tbmCode: tbm_code,
      parameterCode,
      ringNo,
    })
  }

}

