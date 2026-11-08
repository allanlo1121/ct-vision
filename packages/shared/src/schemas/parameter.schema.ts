import { z } from "zod"



// TBM 参数编码
export const parameterCodeSchema = z
  .string()
  .regex(/^[a-z][0-9]{9}$/)

export type ParameterCode = z.infer<typeof parameterCodeSchema>


export const thresholdTypeSchema = z
  .enum(["upper", "lower", "deviation"])
  .meta({
    title: "阈值类型",
    description: "报警阈值判断方式",
  })

export type ThresholdType = z.infer<typeof thresholdTypeSchema>

export const thresholdTypeLabels: Record<ThresholdType, string> = {
  upper: "上限",
  lower: "下限",
  deviation: "偏差",
}

export const thresholdTypeOptions = thresholdTypeSchema.options.map((value)=>({
  value,
  label:thresholdTypeLabels[value]
}))


export const tbmPhaseChangeTypeSchema = z.enum([
  "initialized",
  "unchanged",
  "stale",
  "rejected",
  "phase_changed",
  "ring_changed",
  "both_changed",
  "tunnel_changed",
])

export type TbmPhaseChangeType = z.infer<typeof tbmPhaseChangeTypeSchema>

export const tbmPhaseChangeTypeLabels: Record<TbmPhaseChangeType, string> = {
  initialized: "初始化",
  unchanged: "未改变",
  stale: "过期",
  rejected: "被拒绝",
  phase_changed: "相位改变",
  ring_changed: "环号改变",
  both_changed: "相位和环号都改变",
  tunnel_changed: "隧道改变",
}

export const tbmPhaseChangeTypeOptions = tbmPhaseChangeTypeSchema.options.map(
  (value) => ({
    value,
    label: tbmPhaseChangeTypeLabels[value],
  })
)

export const tbmRingWarningTypeSchema = z.enum([
  "ring_missing", // 环号缺失
  "ring_rollback", // 环号回退
  "ring_jump", // 环号跳跃
  "ring_out_of_range", // 环号超出设计范围
])

export type TbmRingWarningType = z.infer<typeof tbmRingWarningTypeSchema>

export const tbmRingWarningTypeLabels: Record<TbmRingWarningType, string> = {
  ring_missing: "环号缺失",
  ring_rollback: "环号回退",
  ring_jump: "环号跳跃",
  ring_out_of_range: "环号超出设计范围",
}

export const tbmRingWarningTypeOptions = tbmRingWarningTypeSchema.options.map(
  (value) => ({
    value,
    label: tbmRingWarningTypeLabels[value],
  })
)

export const parameterAlarmChangeTypeSchema = z.enum([
  "started",
  "value_updated",
  "severity_changed",
  "tunnel_changed",
  "recovered",
  "recovery_pending",
  "unchanged",
  "stale",
])

export type ParameterAlarmChangeType = z.infer<
  typeof parameterAlarmChangeTypeSchema
>

export const parameterAlarmChangeTypeLabels: Record<
  ParameterAlarmChangeType,
  string
> = {
  started: "新报警",
  value_updated: "报警值更新",
  severity_changed: "报警等级改变",
  tunnel_changed: "隧道改变",
  recovered: "报警恢复",
  recovery_pending: "等待恢复",
  unchanged: "未改变",
  stale: "过期",
}

export const parameterAlarmChangeTypeOptions =
  parameterAlarmChangeTypeSchema.options.map((value) => ({
    value,
    label: parameterAlarmChangeTypeLabels[value],
  }))

export const parameterDataTypeSchema = z.enum([
  "boolean",
  "double",
  "integer"
])

export type ParameterDataType = z.infer<
  typeof parameterDataTypeSchema
>

export const parameterDataTypeLabels: Record<
  ParameterDataType,
  string
> = {
  boolean: "布尔值",
  double: "浮点小数",
  integer: "整数"
}

export const parameterDataTypeOptions =
  parameterDataTypeSchema.options.map((value) => ({
    value,
    label: parameterDataTypeLabels[value],
  }))