import { z } from "zod"

import {
  serialIdSchema,
  tbmCodeSchema,
  timestampSchema,
  connectivityTypeSchema,
  connectivityStatusSchema,
} from "@workspace/shared/schemas"
/**
 * 基础字段规则
 */
export const tbmConnectivityBaseSchema = z.object({
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

export const tbmConnectivitySchema =
  tbmConnectivityBaseSchema.safeExtend({
    updated_at: timestampSchema.meta({
      title: "更新时间",
      description: "TBM的更新时间",
    }),
  })

export const createtbmConnectivitySchema =
  tbmConnectivityBaseSchema.partial({
    last_heartbeat_at: true,
    last_realdata_at: true,
    last_sampled_at: true,
  })

export const updateTbmConnectivitySchema = tbmConnectivityBaseSchema
  .omit({
    tbm_code: true,
  })
  .partial()

export type TbmConnectivity = z.infer<typeof tbmConnectivitySchema>

export type TbmConnectivityBase = z.infer<
  typeof tbmConnectivityBaseSchema
>

export type CreateTbmConnectivityInput = z.input<
  typeof createtbmConnectivitySchema
>

export type CreateTbmConnectivityOutput = z.output<
  typeof createtbmConnectivitySchema
>

export type UpdateTbmConnectivityInput = z.input<
  typeof updateTbmConnectivitySchema
>
export type UpdateTbmConnectivityOutput = z.output<
  typeof updateTbmConnectivitySchema
>

export type TbmConnectivityFields = keyof z.infer<
  typeof tbmConnectivitySchema
>

export const tbmConnectivityHistoryBaseSchema = z.object({
  id: serialIdSchema.meta({
    title: "ID",
    description: "记录的唯一ID",
  }),
  tbm_code: tbmCodeSchema.meta({
    title: "TBM编码",
    description: "TBM的唯一编码",
  }),

  type: connectivityTypeSchema.meta({
    title: "类型",
    description: "连接状态的类型",
  }),
  status: connectivityStatusSchema.meta({
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

export const tbmConnectivityHistorySchema =
  tbmConnectivityHistoryBaseSchema.safeExtend({
    created_at: timestampSchema.meta({
      title: "创建时间",
      description: "连接状态历史的创建时间",
    }),
    updated_at: timestampSchema.meta({
      title: "更新时间",
      description: "连接状态历史的更新时间",
    }),
  })

export const createtbmConnectivityHistorySchema =
  tbmConnectivityHistoryBaseSchema
    .omit({
      id: true,
    })
    .partial()

export const updateTbmConnectivityHistorySchema =
  tbmConnectivityHistoryBaseSchema
    .omit({
      tbm_code: true,
    })
    .partial()

export type TbmConnectivityHistory = z.infer<
  typeof tbmConnectivityHistoryBaseSchema
>

export type TbmConnectivityHistoryBase = z.infer<
  typeof tbmConnectivityHistoryBaseSchema
>

export type CreateTbmConnectivityHistoryInput = z.input<
  typeof createtbmConnectivityHistorySchema
>

export type CreateTbmConnectivityHistoryOutput = z.output<
  typeof createtbmConnectivityHistorySchema
>

export type UpdateTbmConnectivityHistoryInput = z.input<
  typeof updateTbmConnectivityHistorySchema
>
export type UpdateTbmConnectivityHistoryOutput = z.output<
  typeof updateTbmConnectivityHistorySchema
>

export type TbmConnectivityHistoryFields = keyof z.infer<
  typeof tbmConnectivityHistorySchema
>
