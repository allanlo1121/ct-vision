// tbm-Risk.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"


export const thresholdRuleRepository = {
  async findById(id: number) {
    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_alarms")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    assertNoError(error)

    return data ? parameterAlarmSchema.parse(data) : null
  },
  async findByTbmCode(tbmCode: string) {
    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_alarms")
      .select("*")
      .eq("tbm_code", tbmCode)

    assertNoError(error)

    return data ? (parameterAlarmSchema.array().parse(data) ?? []) : []
  },
  async findAll() {
    const { data, error } = await supabase
      .schema("tbm")
      .from("parameter_alarms")
      .select("*")

    assertNoError(error)

    return data ? (parameterAlarmSchema.array().parse(data) ?? []) : []
  },

}
