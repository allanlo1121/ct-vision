// tbm-Risk.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import type { TbmThresholdRule } from "@workspace/tbm/parameter"
import { tbmThresholdRuleSchema } from "@workspace/tbm/parameter"

export const thresholdRuleRepository = {
  async findById(id: number) {
    const { data, error } = await supabase
      .schema("tbm")
      .from("tbm_parameter_threshold_rules")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data
  },
  async findByTbmCode(tbmCode: string) {
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_parameter_threshold_list")
      .select("*")
      .eq("tbm_code", tbmCode)

    assertNoError(error)

    return data
  },
  async findByTbmCodes(tbmCodes: string[]): Promise<TbmThresholdRule[]> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_parameter_threshold_list")
      .select("*")
      .in("tbm_code", tbmCodes)

    assertNoError(error)

    return tbmThresholdRuleSchema.array().parse(data ?? [])
  },
}
