
import { z } from "zod"
import { supabase } from "../db/supabase"

export const GetRingProgressSchema = z
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

export type GetRingProgressInput = z.infer<
    typeof GetRingProgressSchema
>

export async function getRingProgress(
    input: GetRingProgressInput
) {
    const params = GetRingProgressSchema.parse(input)

    const { data, error } = await supabase
        .schema("tbm")
        .rpc("get_ring_progress", {
            p_tbm_codes: params.tbmCodes,
            p_start_time: params.startTime,
            p_end_time: params.endTime         
        })

    if (error) throw error

    const items = (data ?? []).map((item) => ({
        ...item,
        completed_rings: Number(item.completed_rings),
    }))

    const totalRings = items.reduce(
        (sum, item) => sum + item.completed_rings,
        0
    )

    return {
        period: {
            startTime: params.startTime,
            endTime: params.endTime,
        },
        totalRings,
        items,
    }
}
