import { supabase } from "../db/supabase"

export async function resolveTbmCodes(
    tbmCodes: string[]
): Promise<string[]> {
    if (tbmCodes.length > 0) {
        return [...new Set(tbmCodes)]
    }

    const { data, error } = await supabase
        .schema("tbm")
        .from("assignments")
        .select("tbm_code")
        .is("end_date", null)

    if (error) throw error

    return [
        ...new Set(
            (data ?? []).map((item) => item.tbm_code)
        ),
    ]
}