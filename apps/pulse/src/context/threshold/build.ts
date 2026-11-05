
import type { TbmThresholdRule, ThresholdRulesByParameter, ThresholdRulesByTbm } from "@workspace/tbm/parameter"

import type { ParameterCode, SeverityCode, TbmCode } from "@workspace/shared/schemas"
export function buildTbmThresholdRules(
  rows: TbmThresholdRule[]
): ThresholdRulesByParameter {
  const result: ThresholdRulesByParameter = {}

  for (const row of rows) {
    const parameterCode = row.parameter_code as ParameterCode
    const severityCode = row.severity_code as SeverityCode

    result[parameterCode] ??= {}
    result[parameterCode][severityCode] ??= []

    result[parameterCode][severityCode].push({
      start_ring: row.start_ring,
      end_ring: row.end_ring,
      parameter_code: row.parameter_code,
      parameter_name: row.parameter_name,
      parameter_unit: row.parameter_unit,
      severity_code: row.severity_code,
      severity_name:row.severity_name,
      threshold_type: row.threshold_type,
      reference_value: row.reference_value,
      threshold_value: row.threshold_value,
      min_record_delta: row.min_record_delta,
      min_record_interval_ms: row.min_record_interval_ms
    })
  }

  return result
}

export type MultiTbmThresholdRules = ThresholdRulesByTbm

/**
 * 将多台 TBM 的数据库规则转换为缓存结构
 */
export function buildMultiTbmThresholdRules(
  rows: TbmThresholdRule[]
): MultiTbmThresholdRules {
  const result: MultiTbmThresholdRules = {}

  for (const row of rows) {
    const tbmCode = row.tbm_code
    const parameterCode = row.parameter_code as ParameterCode
    const severityCode = row.severity_code as SeverityCode

    result[tbmCode] ??= {}
    result[tbmCode][parameterCode] ??= {}
    result[tbmCode][parameterCode][severityCode] ??= []

    result[tbmCode][parameterCode][severityCode].push({
      start_ring: row.start_ring,
      end_ring: row.end_ring,
      parameter_code: row.parameter_code,
      parameter_name: row.parameter_name,
      parameter_unit: row.parameter_unit,
      severity_code: row.severity_code,
      severity_name:row.severity_name,
      threshold_type: row.threshold_type,
      reference_value: row.reference_value,
      threshold_value: row.threshold_value,
      min_record_delta: row.min_record_delta,
      min_record_interval_ms: row.min_record_interval_ms
    })
  }

  return result
}
