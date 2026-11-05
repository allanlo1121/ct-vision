import { z } from "zod"

import {
  serialIdSchema,
  tbmCodeSchema,
  timestampSchema,
  connectionTypeSchema,
  connectionStatusSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const tbmConnectionStatusBaseSchema = z.object({
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  last_heartbeat_at: timestampSchema.nullable().meta({
    title: "最后心跳时间",
    description: "TBM的最后心跳时间",
  }),
  last_realdata_at: timestampSchema.nullable().meta({
    title: "最后实时数据时间",
    description: "TBM的最后实时数据时间",
  }),
  last_sampled_at: timestampSchema.nullable().meta({
    title: "最后采样时间",
    description: "TBM的最后采样时间",
  }),
})

export const tbmConnectionStatusSchema =
  tbmConnectionStatusBaseSchema.safeExtend({
    updated_at: timestampSchema.meta({
      title: "更新时间",
      description: "TBM的更新时间",
    }),
  })

export const createtbmConnectionStatusSchema =
  tbmConnectionStatusBaseSchema.partial({
    last_heartbeat_at: true,
    last_realdata_at: true,
    last_sampled_at: true,
  })

export const updateTbmConnectionStatusSchema = tbmConnectionStatusBaseSchema
  .omit({
    tbm_code: true,
  })
  .partial()

export type TbmConnectionStatus = z.infer<typeof tbmConnectionStatusSchema>

export type TbmConnectionStatusBase = z.infer<
  typeof tbmConnectionStatusBaseSchema
>

export type CreateTbmConnectionStatusInput = z.input<
  typeof createtbmConnectionStatusSchema
>

export type CreateTbmConnectionStatusOutput = z.output<
  typeof createtbmConnectionStatusSchema
>

export type UpdateTbmConnectionStatusInput = z.input<
  typeof updateTbmConnectionStatusSchema
>
export type UpdateTbmConnectionStatusOutput = z.output<
  typeof updateTbmConnectionStatusSchema
>

export type TbmConnectionStatusFields = keyof z.infer<
  typeof tbmConnectionStatusSchema
>

export const tbmConnectionStatusHistoryBaseSchema = z.object({
  id: serialIdSchema.meta({
    title: "ID",
    description: "记录的唯一ID",
  }),
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  type: connectionTypeSchema.meta({
    title: "类型",
    description: "连接状态的类型",
  }),
  status: connectionStatusSchema.meta({
    title: "状态",
    description: "连接状态的状态",
  }),
  start_at: timestampSchema.nullable().meta({
    title: "开始时间",
    description: "连接状态的开始时间",
  }),
  end_at: timestampSchema.nullable().meta({
    title: "结束时间",
    description: "连接状态的结束时间",
  }),
  remark: z.string().nullable().meta({
    title: "备注",
    description: "连接状态的备注",
  }),
})

export const tbmConnectionStatusHistorySchema =
  tbmConnectionStatusHistoryBaseSchema.safeExtend({
    created_at: timestampSchema.meta({
      title: "创建时间",
      description: "连接状态历史的创建时间",
    }),
    updated_at: timestampSchema.meta({
      title: "更新时间",
      description: "连接状态历史的更新时间",
    }),
  })

export const createtbmConnectionStatusHistorySchema =
  tbmConnectionStatusHistoryBaseSchema
    .omit({
      id: true,
    })
    .partial()

export const updateTbmConnectionStatusHistorySchema =
  tbmConnectionStatusHistoryBaseSchema
    .omit({
      tbm_code: true,
    })
    .partial()

export type TbmConnectionStatusHistory = z.infer<
  typeof tbmConnectionStatusHistoryBaseSchema
>

export type TbmConnectionStatusHistoryBase = z.infer<
  typeof tbmConnectionStatusHistoryBaseSchema
>

export type CreateTbmConnectionStatusHistoryInput = z.input<
  typeof createtbmConnectionStatusHistorySchema
>

export type CreateTbmConnectionStatusHistoryOutput = z.output<
  typeof createtbmConnectionStatusHistorySchema
>

export type UpdateTbmConnectionStatusHistoryInput = z.input<
  typeof updateTbmConnectionStatusHistorySchema
>
export type UpdateTbmConnectionStatusHistoryOutput = z.output<
  typeof updateTbmConnectionStatusHistorySchema
>

export type TbmConnectionStatusHistoryFields = keyof z.infer<
  typeof tbmConnectionStatusHistorySchema
>
