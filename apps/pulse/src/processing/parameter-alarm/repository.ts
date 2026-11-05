// tbm-Runtime.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import {
  type ApplyParameterAlarmInput,
  ParameterAlarmRepository,
} from "@workspace/tbm/runtime"

export const parameterAlarmRepository: Pick<
  ParameterAlarmRepository,
  "applyParameterAlarm"
> = {
  async applyParameterAlarm(
    input: ApplyParameterAlarmInput
  ): Promise<number | null> {
    const { data, error } = await supabase
      .schema("tbm")
      .rpc("apply_parameter_alarm", {
        p_tbm_code: input.tbm_code,
        p_tunnel_id: input.tunnel_id,
        p_parameter_code: input.parameter_code,
        p_severity_code: input.severity_code!,
        p_rule_snapshot: input.rule_snapshot,
        p_alarm_value: input.alarm_value,
        p_ring_no: input.ring_no,
        p_chainage: input.chainage as number,
        p_occurred_at: input.occurred_at,
      })
    assertNoError(error)

    return data ?? null
  },
}
