console.log("[tbm realtime context runtime loaded]")

import { supabase } from "../db/supabase/client"
import { tbmAssignmentRepository } from "./tbm-assignment/"
import { TbmRealtimeContextEngine, tbmRealtimeContextStore } from "./realtime-context"
import { tbmConnectionRepository } from "./tbm-connection"
import { tbmRuntimeRepository } from "./tbm-runtime/repository"
import { tbmRiskStateRepository } from "./tbm-risk/repository"
import { tbmParameterThresholdRuleRepository } from "./parameter-alarm/repository"


const tbmRealtimeContextEngine = new TbmRealtimeContextEngine(
    tbmRealtimeContextStore,
    tbmAssignmentRepository,
    tbmConnectionRepository,
    tbmRuntimeRepository,
    tbmRiskStateRepository,
    tbmParameterThresholdRuleRepository,
    supabase
)
let started = false

let startPromise: Promise<void> | null = null

export async function startTbmRealtimeContextRuntime() {
    if (started) {
        return
    }

    if (startPromise) {
        return startPromise
    }

    startPromise = (async () => {
        await tbmRealtimeContextEngine.start()

        started = true
    })()

    return startPromise
}
