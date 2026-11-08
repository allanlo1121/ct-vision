import { supabase } from "../db/supabase"

export function testRealtime() {
    const channel = supabase
        .channel("test-multi-tables")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "tbm",
                table: "parameter_thresholds",
            },
            (payload) => {
                console.log("✅ 专用阈值变化", payload)
            }
        )
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "tbm",
                table: "parameter_threshold_defaults",
            },
            (payload) => {
                console.log("✅ 通用阈值变化", payload)
            }
        )
        .subscribe((status, error) => {
            console.log("📡 Realtime 状态:", status, error)
        })

    return channel
}