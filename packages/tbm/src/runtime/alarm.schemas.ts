import { z } from "zod"
import {
  serialIdSchema,
  codeSchema,
  uuidSchema,
  ringSchema,
  tbmCodeSchema,
  masterDataCodeSchema,
  timestampSchema,
  auditSchema,
  parameterAlarmChangeTypeSchema
} from "@workspace/shared/schemas"

import { parameterRuleSnapshotSchema } from "../parameter/threshold.schemas"

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

  rule_snapshot: parameterRuleSnapshotSchema,

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

// export const updateParameterAlarmSchema = parameterAlarmBaseSchema
//   .omit({
//     id: true,
//   })
//   .partial()

export type ParameterAlarm = z.infer<typeof parameterAlarmSchema>

export type ParameterAlarmBase = z.infer<typeof parameterAlarmBaseSchema>

export type CreateParameterAlarmInput = z.input<
  typeof createParameterAlarmSchema
>

export type CreateParameterAlarmOutput = z.output<
  typeof createParameterAlarmSchema
>

// export type UpdateParameterAlarmInput = z.input<
//   typeof updateParameterAlarmSchema
// >
// export type UpdateParameterAlarmOutput = z.output<
//   typeof updateParameterAlarmSchema
// >

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




// export const parameterAlarmResultSchema = z.object({
//   changed: z.boolean(),

//   changeType: parameterAlarmChangeTypeSchema,

//   alarmId: z.number().nullable(),
//   previousAlarmId: z.number().nullable(),

//   previousSeverity: masterDataCodeSchema.nullable(),
//   currentSeverity: masterDataCodeSchema.nullable(),

//   previousValue: z.number().nullable(),
//   recoveryStartedAt: timestampSchema.nullable()
// })

// export type ParameterAlarmResult =
//   z.infer<typeof parameterAlarmResultSchema>
