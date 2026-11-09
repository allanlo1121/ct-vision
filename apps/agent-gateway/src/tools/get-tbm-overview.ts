import { supabase } from "../db/supabase"

export async function getTbmOverview() {
    const { data, error } = await supabase
        .schema("tbm")
        .from("v_current_assignments")
        .select(
            "tbm_code,tbm_name,project_name,tunnel_name"
        )

    if (error) {
        throw error
    }

    return {
        total: data?.length ?? 0,
        items: data ?? [],
    }
}