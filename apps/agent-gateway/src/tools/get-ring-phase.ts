
import { z } from "zod"
import { supabase } from "../db/supabase"

export const GetRingPhaseSchema = z
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

export type GetRingPhaseInput = z.infer<
    typeof GetRingPhaseSchema
>

export async function getRingPhase(
    input: GetRingPhaseInput
) {
    const params = GetRingPhaseSchema.parse(input)

    const { data, error } = await supabase
        .schema("tbm")
        .rpc("get_ring_phase_details", {
            p_tbm_codes: params.tbmCodes,
            p_start_time: params.startTime,
            p_end_time: params.endTime,
        })

    if (error) throw error

    const items = (data ?? []).map((item) => ({
        ...item,

        // PostgreSQL numeric 转换为 number
        excavation_seconds: Number(item.excavation_seconds ?? 0),
        segment_erection_seconds: Number(
            item.segment_erection_seconds ?? 0
        ),
        waiting_seconds: Number(item.waiting_seconds ?? 0),
        stopped_seconds: Number(item.stopped_seconds ?? 0),
        fault_seconds: Number(item.fault_seconds ?? 0),
        cutter_change_seconds: Number(
            item.cutter_change_seconds ?? 0
        ),
        maintenance_seconds: Number(
            item.maintenance_seconds ?? 0
        ),
        unknown_seconds: Number(item.unknown_seconds ?? 0),
        total_seconds: Number(item.total_seconds ?? 0),
    }))

    return {
        period: {
            startTime: params.startTime,
            endTime: params.endTime,
        },
        total: items.length,
        items,
    }
}