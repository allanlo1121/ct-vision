import { z } from "zod"
import { masterDataCodeSchema } from "./identifier"
export const tbmCodeSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "设备编码不能为空")
  .max(50, "设备编码不能超过50个字符")
  .regex(/^[a-z0-9_-]+$/, {
    message: "编码只能包含小写字母、数字、下划线和中划线",
  })

export type TbmCode = z.infer<typeof tbmCodeSchema>

// TBM 参数编码
export const parameterCodeSchema = z
  .string()
  .regex(/^[a-z][0-9]{9}$/)

export type ParameterCode = z.infer<typeof parameterCodeSchema>

// 报警等级编码
export const severityCodeSchema = masterDataCodeSchema

export type SeverityCode = z.infer<typeof severityCodeSchema>

export const connectionTypeSchema = z.enum(["heartbeat", "realdata"])

export type ConnectionType = z.infer<typeof connectionTypeSchema>

export const connectionTypeLabels: Record<ConnectionType, string> = {
  heartbeat: "心跳",
  realdata: "实时数据",
}

export const connectionStatusSchema = z.enum(["online", "offline"])

export type ConnectionStatus = z.infer<typeof connectionStatusSchema>

export const connectionStatusLabels: Record<ConnectionStatus, string> = {
  online: "在线",
  offline: "离线",
}

export const tbmPhaseTypeSchema = z.enum([
  "excavation", // 掘进
  "segment_erection", // 管片拼装
  "waiting", // 等待
  "stopped", // 停机
  "fault", // 故障
  "cutter_change", // 换刀
  "maintenance", // 维修
  "unknown", // 未知
])

export type TbmPhaseType = z.infer<typeof tbmPhaseTypeSchema>

export const tbmPhaseTypeLabels: Record<TbmPhaseType, string> = {
  excavation: "掘进",
  segment_erection: "管片拼装",
  waiting: "等待",
  stopped: "停机",
  fault: "故障",
  cutter_change: "换刀",
  maintenance: "维修",
  unknown: "未知",
}

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

export const thresholdTypeOptions = Object.entries(thresholdTypeLabels).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export const tbmStageTypeSchema = z.enum([
  "unknown", // 未知
  "transport", // 运输
  "assembly", // 组装
  "commissioning", // 调试
  "boring", // 掘进施工
  "maintenance", // 维修保养
  "dismantling", // 拆机
])

export type TbmStageType = z.infer<typeof tbmStageTypeSchema>

export const tbmStageTypeLabels: Record<TbmStageType, string> = {
  unknown: "未知",
  transport: "运输",
  assembly: "组装",
  commissioning: "调试",
  boring: "掘进施工",
  maintenance: "维修保养",
  dismantling: "拆机",
}

export const tbmStageTypeOptions = Object.entries(tbmStageTypeLabels).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export const advanceDirectionSchema = z.enum([
  "increasing", // 小里程往大里程
  "decreasing", // 大里程往小里程
])

export type AdvanceDirection = z.infer<typeof advanceDirectionSchema>

export const advanceDirectionLabels: Record<AdvanceDirection, string> = {
  increasing: "正向",
  decreasing: "逆向",
}

export const advanceDirectionOptions = advanceDirectionSchema.options.map(
  (value) => ({
    value,
    label: advanceDirectionLabels[value],
  })
)

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
