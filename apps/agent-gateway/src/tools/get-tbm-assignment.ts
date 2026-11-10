import { supabase } from "../db/supabase"
import { resolveTbmCodes } from "../services/resolve-tbm-codes"
import {
    tbmAssignmentDetailSchema,
    getTbmAssignmentDetailSchema,
    tbmAssignmentDetailResultSchema,
    type GetTbmAssignmentDetailInput
} from "@workspace/tbm/tbm"


export async function getTbmAssignmentDetails(
    input: GetTbmAssignmentDetailInput
) {
    const params = getTbmAssignmentDetailSchema.parse(input)

    // 1. 处理默认日期（北京时间）
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date())

    const startDate = params.startDate ?? today
    const endDate = params.endDate ?? startDate

    // 2. 参数验证
    if (startDate > endDate) {
        throw new Error("结束日期不能早于开始日期")
    }

    // 3. 构建查询
    let query = supabase
        .schema("tbm")
        .from("v_assignment_details")
        .select("*")
        .lte("start_date", endDate)
        .or(`end_date.is.null,end_date.gte.${startDate}`)

    // 4. 指定 TBM 时才筛选
    if (params.tbmCodes?.length) {
        query = query.in("tbm_code", params.tbmCodes)
    }

    // 5. 执行查询
    const { data, error } = await query
        .order("start_date", { ascending: false })

    if (error) throw error

    console.log("getTbmAssignmentDetails",data,error)

    const items = tbmAssignmentDetailSchema.array().parse(data ?? [])

    return tbmAssignmentDetailResultSchema.parse({
        period: {
            startDate,
            endDate,
        },
        total: items.length,
        items,
    })
}