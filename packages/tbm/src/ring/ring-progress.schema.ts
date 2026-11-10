import { z } from "zod"
import { ApiSuccessSchema, tbmCodeSchema } from "@workspace/shared"

export const getRingProgressSchema = z.object({
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

export const ringProgressItemSchema = z.object({
  tbm_code: tbmCodeSchema.describe("盾构机编码"),
  tbm_name: z.string().describe("盾构机名称"),
  project_name: z.string().describe("项目名称"),
  engineering_unit_name: z.string().describe("工点名称"),
  tunnel_name: z.string().describe("隧道名称"),

  ring_numbers: z.array(z.number().int()).describe("环号列表"),
  completed_rings: z.number().int().describe("完成环数")
})

export const ringProgressResultSchema = z.object({
  period: z.object({
    startTime: z.string().describe("返回开始时间"),
    endTime: z.string().describe("返回结束时间"),
  }).describe("返回查询时间范围"),
  total: z.number().int().describe("").describe("返回数据数量"),
  items: z.array(ringProgressItemSchema).describe("返回细目"),
})

// 原始输入类型：允许省略有默认值的 tbmCodes
export type GetRingProgressInput =
  z.input<typeof getRingProgressSchema>

// 解析后的输入类型：tbmCodes 一定是数组
export type GetRingProgressParams =
  z.output<typeof getRingProgressSchema>

export type RingProgressItem =
  z.infer<typeof ringProgressItemSchema>

export type RingProgressResult =
  z.infer<typeof ringProgressResultSchema>

export const RingProgressResponseSchema =
  ApiSuccessSchema(ringProgressResultSchema)