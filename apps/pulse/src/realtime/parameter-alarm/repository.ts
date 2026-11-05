// tbm-Risk.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import type {
  ParameterAlarmRepository,
  CreateParameterAlarmInput,
} from "@workspace/tbm/runtime"
import { parameterAlarmSchema } from "@workspace/tbm/runtime"

export const parameterAlarmRepository: ParameterAlarmRepository = {
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
  async create(input) {
    const { error } = await supabase
      .schema("tbm")
      .from("parameter_alarms")
      .insert(input)
      .single()

    assertNoError(error)
  },
  async upsert(input: CreateParameterAlarmInput): Promise<void> {
    const { error } = await supabase
      .schema("tbm")
      .rpc("upsert_parameter_alarm", {
        p_tbm_code: input.tbm_code,
        p_parameter_code: input.parameter_code,
        p_severity_code: input.severity_code,
        p_alarm_value: input.alarm_value,
        p_rule_snapshot: input.rule_snapshot,
        p_started_at: input.started_at,
        p_ring_no: input.ring_no,
        p_chainage: input.chainage ?? undefined,
      })

    assertNoError(error)
  },
  async update(id, input) {
    const { error } = await supabase
      .schema("tbm")
      .from("parameter_alarms")
      .update(input)
      .eq("id", id)
      .single()

    assertNoError(error)
  },
  async delete(id) {
    const { error } = await supabase
      .schema("tbm")
      .from("parameter_alarms")
      .delete()
      .eq("id", id)
      .single()

    assertNoError(error)
  },
}
