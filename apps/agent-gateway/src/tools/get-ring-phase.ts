
import { supabase } from "../db/supabase"
import { resolveTbmCodes } from "../services/resolve-tbm-codes"
import { getRingPhaseSchema, ringPhaseResultSchema, type GetRingPhaseInput } from "@workspace/tbm/ring"


export async function getRingPhase(
    input: GetRingPhaseInput
) {
    const params = getRingPhaseSchema.parse(input)
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
        .rpc("get_ring_phase_details", {
            p_tbm_codes: tbmCodes,
            p_start_time: params.startTime,
            p_end_time: params.endTime,
        })

    if (error) throw error


    return ringPhaseResultSchema.parse({
        period: {
            startTime: params.startTime,
            endTime: params.endTime,
        },
        total: data?.length ?? 0,
        items: data ?? [],
    })
}