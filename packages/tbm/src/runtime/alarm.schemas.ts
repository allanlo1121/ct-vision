import { z } from "zod"
import {
  serialIdSchema,
  codeSchema,
  uuidSchema,
  ringSchema,
  tbmCodeSchema,
  masterDataCodeSchema,
  timestampSchema,
  ApiSuccessSchema
} from "@workspace/shared/schemas"

import { parameterRuleSnapshotSchema ,thresholdRuleSchema} from "../parameter/threshold.schemas"

/**
 * 基础字段规则
 */
export const parameterAlarmBaseSchema = z.object({
  id: serialIdSchema,
  tbm_code: tbmCodeSchema,

  tunnel_id: uuidSchema,

  ring_no: ringSchema,

  chainage: z.number().nullable(),

  parameter_code: codeSchema,

  rule_snapshot: thresholdRuleSchema.nullable(),

  severity_code: masterDataCodeSchema,

  alarm_value: z.number(),

  occurred_at: timestampSchema

})

export const parameterAlarmSchema = parameterAlarmBaseSchema.safeExtend({
  created_at: timestampSchema,
  created_by: uuidSchema.nullable()
})

export const createParameterAlarmSchema = parameterAlarmBaseSchema.omit({
  id: true,
})

export type ParameterAlarm = z.infer<typeof parameterAlarmSchema>

export type ParameterAlarmBase = z.infer<typeof parameterAlarmBaseSchema>

export type CreateParameterAlarmInput = z.input<
  typeof createParameterAlarmSchema
>

export type CreateParameterAlarmOutput = z.output<
  typeof createParameterAlarmSchema
>

export type ParameterAlarmFields = keyof z.infer<typeof parameterAlarmSchema>

export const applyParameterAlarmSchema = parameterAlarmBaseSchema.pick({
  tbm_code: true,
  tunnel_id: true,
  parameter_code: true,
  severity_code: true,
  rule_snapshot: true,
  alarm_value: true,
  ring_no: true,
  chainage: true,
  occurred_at: true,
}).extend({
  rule_snapshot: parameterRuleSnapshotSchema.nullable(),
})

export type ApplyParameterAlarmInput =
  z.infer<typeof applyParameterAlarmSchema>


export const tbmAlarmDetailSchema = parameterAlarmBaseSchema.omit({ tunnel_id: true }).safeExtend({
  tbm_name: z.string().describe("盾构机名称"),  
  project_name: z.string().describe("项目名称"),  
  engineering_unit_name: z.string().describe("工点名称"),
  tunnel_name: z.string().describe("隧道名称"),
  parameter_name: z.string().describe("参数名称"),
  severity_name: z.string().describe("报警等级名称"),
})


export const getTbmAlarmDetailSchema = z
  .object({
    tbmCodes: z.array(tbmCodeSchema)
      .optional()
      .describe("盾构机编号列表，不传或空数组表示查询全部盾构机"),

    startTime: z.iso.datetime({ offset: true })
      .optional()
      .describe("查询开始时间，不传默认北京时间今天00:00"),

    endTime: z.iso.datetime({ offset: true })
      .optional()
      .describe("查询结束时间，不传默认北京时间明天00:00（不包含）"),
  })
  .refine(
    (data) =>
      !data.startTime ||
      !data.endTime ||
      new Date(data.startTime).getTime() <
      new Date(data.endTime).getTime(),
    {
      path: ["endTime"],
      message: "结束时间必须晚于开始时间",
    }
  )


export const tbmAlarmDetailResultSchema = z.object({
  period: z.object({
    startTime: z.string().describe("返回开始日期"),
    endTime: z.string().describe("返回结束日期"),
  }).describe("返回查询日期范围"),
  total: z.number().int().describe(""),
  items: z.array(tbmAlarmDetailSchema).describe("返回细目"),
})

export type GetTbmAlarmDetailInput =
  z.input<typeof getTbmAlarmDetailSchema>

// 解析后的输入类型：tbmCodes 一定是数组
export type GetTbmAlarmDetailParams =
  z.output<typeof getTbmAlarmDetailSchema>

export type TbmAlarmDetailItem =
  z.infer<typeof tbmAlarmDetailSchema>

export type TbmAlarmDetailResult =
  z.infer<typeof tbmAlarmDetailResultSchema>

export const tbmAlarmDetailResponseSchema =
  ApiSuccessSchema(tbmAlarmDetailResultSchema)

