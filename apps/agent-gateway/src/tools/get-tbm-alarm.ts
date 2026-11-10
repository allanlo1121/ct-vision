import { supabase } from "../db/supabase"

import {
    tbmAlarmDetailSchema,
    getTbmAlarmDetailSchema,
    tbmAlarmDetailResultSchema,
    type GetTbmAlarmDetailInput
} from "@workspace/tbm/runtime"
import { getTodayRange } from "@workspace/shared/utils"


export async function getTbmAlarmDetails(
    input: GetTbmAlarmDetailInput
) {
    const params = getTbmAlarmDetailSchema.parse(input)
    const today = getTodayRange()

    const startTime = params.startTime ?? today.startTime
    const endTime = params.endTime ?? today.endTime

    if (new Date(startTime) >= new Date(endTime)) {
        throw new Error("结束时间必须晚于开始时间")
    }

    let query = supabase
        .schema("tbm")
        .from("v_parameter_alarm_details")
        .select("*")
        .gte("occurred_at", startTime)
        .lt("occurred_at", endTime)

    if (params.tbmCodes?.length) {
        query = query.in("tbm_code", params.tbmCodes)
    }

    const { data, error } = await query.order("occurred_at", {
        ascending: false,
    })

    if (error) throw error

    console.log("getTbmAlarmDetails",data,error)

    const items = tbmAlarmDetailSchema.array().parse(data ?? [])

    return tbmAlarmDetailResultSchema.parse({
        period: {
            startTime,
            endTime,
        },
        total: items.length,
        items,
    })
}