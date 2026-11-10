import { z } from "zod"

import {
  uuidSchema,
  auditSchema,
  tbmCodeSchema,
  advanceDirectionSchema,
  dateSchema,
  ringSchema,
  ApiSuccessSchema
} from "@workspace/shared/schemas"

/**
 * 基础字段规则
 */
export const tbmAssignmentBaseSchema = z.object({
  id: uuidSchema.describe("ID"),
  tbm_code: tbmCodeSchema.describe("盾构机编号"),
  tunnel_id: uuidSchema.describe("隧道ID"),
  advance_direction: advanceDirectionSchema.describe("推进方向"),
  start_date: dateSchema.describe("开始日期"),
  end_date: dateSchema.nullable().describe("结束日期"),
  remark: z.string().nullable().describe("备注")
})

export const tbmAssignmentSchema = tbmAssignmentBaseSchema.safeExtend(
  auditSchema.shape
)


export const createTbmAssignmentSchema = tbmAssignmentBaseSchema.omit({
  id: true,
})

export const updateTbmAssignmentSchema = tbmAssignmentSchema
  .omit({
    id: true,
  })
  .partial()

export type TbmAssignment = z.infer<typeof tbmAssignmentSchema>

export type TbmAssignmentBase = z.infer<typeof tbmAssignmentBaseSchema>



export type CreateTbmAssignmentInput = z.input<typeof createTbmAssignmentSchema>

export type CreateTbmAssignmentOutput = z.output<
  typeof createTbmAssignmentSchema
>

export type UpdateTbmAssignmentInput = z.input<typeof updateTbmAssignmentSchema>
export type UpdateTbmAssignmentOutput = z.output<
  typeof updateTbmAssignmentSchema
>

export type TbmAssignmentFields = keyof z.infer<typeof tbmAssignmentSchema>

export type TbmAssignmentListItem = TbmAssignmentBase & {
  tbm_name: string | null
  tunnel_name: string | null
}


export const tbmAssignmentDetailSchema = tbmAssignmentBaseSchema.omit({ remark: true }).safeExtend({
  tbm_name: z.string().describe("盾构机名称"),
  organization_id: uuidSchema.describe("经理部ID"),
  organization_name: z.string().describe("经理部名称"),
  project_id: uuidSchema.describe("项目ID"),
  project_name: z.string().describe("项目名称"),
  engineering_unit_id: uuidSchema.describe("工点ID"),
  engineering_unit_name: z.string().describe("工点名称"),
  tunnel_name: z.string().describe("隧道名称"),
  start_ring: ringSchema.describe("起始环号"),
  end_ring: ringSchema.describe("结束环号"),
  start_chainage: z.number().describe("起始里程"),
  end_chainage: z.number().describe("结束里程"),
})


export const getTbmAssignmentDetailSchema = z
  .object({
    tbmCodes: z.array(tbmCodeSchema)
      .optional()
      .describe("盾构机编号列表，不传或空数组表示查询全部盾构机"),

    startDate: dateSchema
      .optional()
      .describe("查询开始日期，不传表示今天"),

    endDate: dateSchema
      .optional()
      .describe("查询结束日期，不传表示与开始日期相同"),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      data.startDate <= data.endDate,
    {
      path: ["endDate"],
      message: "结束日期不能早于开始日期",
    }
  )


export const tbmAssignmentDetailResultSchema = z.object({
  period: z.object({
    startDate: z.string().describe("返回开始日期"),
    endDate: z.string().nullable().describe("返回结束日期"),
  }).describe("返回查询日期范围"),
  total: z.number().int().describe(""),
  items: z.array(tbmAssignmentDetailSchema).describe("返回细目"),
})

export type GetTbmAssignmentDetailInput =
  z.input<typeof getTbmAssignmentDetailSchema>

// 解析后的输入类型：tbmCodes 一定是数组
export type GetTbmAssignmentDetailParams =
  z.output<typeof getTbmAssignmentDetailSchema>

export type TbmAssignmentDetailItem =
  z.infer<typeof tbmAssignmentDetailSchema>

export type TbmAssignmentDetailResult =
  z.infer<typeof tbmAssignmentDetailResultSchema>

export const TbmAssignmentDetailResponseSchema =
  ApiSuccessSchema(tbmAssignmentDetailResultSchema)
