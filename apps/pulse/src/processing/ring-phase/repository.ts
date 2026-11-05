// tbm-Runtime.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import {
  type RingPhaseRecordRepository,
  type ApplyRingPhaseInput,
  type ApplyRingPhaseResult,
  applyRingPhaseResultSchema,
} from "@workspace/tbm/runtime"

export const ringPhaseRecordRepository: Pick<
  RingPhaseRecordRepository,
  "apply"
> = {
  async apply(input: ApplyRingPhaseInput): Promise<ApplyRingPhaseResult> {
    const { data, error } = await supabase
      .schema("tbm")
      .rpc("apply_ring_phase", {
        p_tbm_code: input.tbm_code,
        p_tunnel_id: input.tunnel_id,
        p_ring_no: input.ring_no,
        p_phase_type: input.tbm_phase_type,
        p_started_at: input.started_at,
        p_chainage: input.start_chainage,
      })
    assertNoError(error)

    // console.log("ApplyRingPhaseResult",data)

    return applyRingPhaseResultSchema.parse(data)
  },
}
