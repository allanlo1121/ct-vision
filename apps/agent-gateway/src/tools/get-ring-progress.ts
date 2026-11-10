
import { z } from "zod"
import { supabase } from "../db/supabase"
import { resolveTbmCodes } from "../services/resolve-tbm-codes"
import { getRingProgressSchema, ringProgressResultSchema, type GetRingProgressInput } from "@workspace/tbm/ring"



export async function getRingProgress(
    input: GetRingProgressInput
) {
    const params = getRingProgressSchema.parse(input)
    const tbmCodes = await resolveTbmCodes(params.tbmCodes)

    if (tbmCodes.length === 0) {
        return {
            period: {
                startTime: params.startTime,
                endTime: params.endTime,
            },
            total: 0,
            truncated: false,
            items: [],
        }
    }

    const { data, error } = await supabase
        .schema("tbm")
        .rpc("get_ring_progress", {
            p_tbm_codes: tbmCodes,
            p_start_time: params.startTime,
            p_end_time: params.endTime
        })

    if (error) throw error

    return ringProgressResultSchema.parse({
        period: {
            startTime: params.startTime,
            endTime: params.endTime,
        },
        total: data?.length ?? 0,
        items: data ?? [],
    })
}
