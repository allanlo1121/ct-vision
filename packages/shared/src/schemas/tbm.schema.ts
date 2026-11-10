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



// 报警等级编码
export const severityCodeSchema = masterDataCodeSchema

export type SeverityCode = z.infer<typeof severityCodeSchema>

export const connectivityTypeSchema = z.enum(["heartbeat", "realdata"])

export type ConnectivityType = z.infer<typeof connectivityTypeSchema>

export const connectivityTypeLabels: Record<ConnectivityType, string> = {
  heartbeat: "心跳",
  realdata: "实时数据",
}

export const connectivityStatusSchema = z.enum(["online", "offline"])

export type ConnectivityStatus = z.infer<typeof connectivityStatusSchema>

export const connectivityStatusLabels: Record<ConnectivityStatus, string> = {
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
