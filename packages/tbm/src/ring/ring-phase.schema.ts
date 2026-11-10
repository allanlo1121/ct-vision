import { z } from "zod"
import { ApiSuccessSchema, tbmCodeSchema } from "@workspace/shared"

export const getRingPhaseSchema = z.object({
  tbmCodes: z.array(z.string().min(1))
    .max(100)
    .default([]).describe("查询环号数组"),

  startTime: z.iso.datetime({ offset: true }).describe("查询开始时间"),
  endTime: z.iso.datetime({ offset: true }).describe("查询结束时间"),
}).refine(
  (data) =>
    new Date(data.startTime).getTime() <
    new Date(data.endTime).getTime(),
  {
    path: ["endTime"],
    message: "结束时间必须晚于开始时间",
  }
)

export const ringPhaseItemSchema = z.object({
  tbm_code: tbmCodeSchema.describe("盾构机编码"),
  tbm_name: z.string().describe("盾构机名称"),
  project_name: z.string().describe("项目名称"),
  engineering_unit_name: z.string().describe("工点名称"),
  tunnel_name: z.string().describe("隧道名称"),
  ring_no: z.number().int().describe("环号"),
  excavation_seconds:z.number().int().describe("时长"),
  segment_erection_seconds:z.number().int().describe("时长"),
  waiting_seconds:z.number().int().describe("时长"),
  stopped_seconds:z.number().int().describe("时长"),
  fault_seconds:z.number().int().describe("时长"),
  cutter_change_seconds:z.number().int().describe("时长"),
  maintenance_seconds:z.number().int().describe("时长"),
  unknown_seconds:z.number().int().describe("时长"),
  total_seconds:z.number().int().describe("时长")
})

export const ringPhaseResultSchema = z.object({
  period: z.object({
    startTime: z.string().describe("返回开始时间"),
    endTime: z.string().describe("返回结束时间"),
  }).describe("返回查询时间范围"),
  total: z.number().int().describe(""),
  items: z.array(ringPhaseItemSchema).describe("返回细目"),
})

// 原始输入类型：允许省略有默认值的 tbmCodes
export type GetRingPhaseInput =
  z.input<typeof getRingPhaseSchema>

// 解析后的输入类型：tbmCodes 一定是数组
export type GetRingPhaseParams =
  z.output<typeof getRingPhaseSchema>

export type RingPhaseItem =
  z.infer<typeof ringPhaseItemSchema>

export type RingPhaseResult =
  z.infer<typeof ringPhaseResultSchema>

export const RingPhaseResponseSchema =
  ApiSuccessSchema(ringPhaseResultSchema)