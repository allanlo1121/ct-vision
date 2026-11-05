
import { z } from "zod"
import {
  uuidSchema,
  masterDataCodeSchema,
  ringSchema
} from "@workspace/shared/schemas"

export const parameterAlarmPayloadSchema = z.object({
  // 设备
  tbm_code: z.string(),
  tbm_name: z.string(),

  // 工程信息
  project_name: z.string(),
  tunnel_id: uuidSchema,
  tunnel_name: z.string(),

  // 参数信息
  parameter_code: z.string(),
  parameter_name: z.string(),
  parameter_unit: z.string().nullable(),
  severity_code: masterDataCodeSchema,
  severity_name: z.string(),

  // 报警数据
  alarm_value: z.number(),
  ring_no: ringSchema,
  chainage: z.number().nullable(),
})

export type ParameterAlarmPayload =
  z.infer<typeof parameterAlarmPayloadSchema>