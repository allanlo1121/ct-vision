
import { z } from "zod"
import { supabase } from "../db/supabase"

export const GetTbmAlarmSchema = z
    .object({
        tbmCodes: z.array(z.string().min(1)).min(1).max(100),
        startTime: z.iso.datetime({ offset: true }),
        endTime: z.iso.datetime({ offset: true })

    })
    .refine(
        (input) =>
            new Date(input.startTime).getTime() <
            new Date(input.endTime).getTime(),
        {
            message: "结束时间必须晚于开始时间",
            path: ["endTime"],
        }
    )

export type GetTbmAlarmInput = z.infer<
    typeof GetTbmAlarmSchema
>

export async function getTbmAlarm(
    input: GetTbmAlarmInput
) {
    const params = GetTbmAlarmSchema.parse(input)

    const { data, error } = await supabase
        .schema("tbm")
        .rpc("get_parameter_alarms", {
            p_tbm_codes: params.tbmCodes,
            p_start_time: params.startTime,
            p_end_time: params.endTime,
        })

    if (error) throw error

    const items = (data ?? []).map((item) => ({
        ...item,

        // PostgreSQL numeric 转换
        alarm_value: Number(item.alarm_value),
        reference_value:
            item.reference_value == null
                ? null
                : Number(item.reference_value),
        threshold_value:
            item.threshold_value == null
                ? null
                : Number(item.threshold_value),
        min_record_delta:
            item.min_record_delta == null
                ? null
                : Number(item.min_record_delta),
        chainage:
            item.chainage == null
                ? null
                : Number(item.chainage),
    }))

    return {
        period: {
            startTime: params.startTime,
            endTime: params.endTime,
        },
        total: items.length,
        truncated: items.length >= 500,
        items,
    }
}
