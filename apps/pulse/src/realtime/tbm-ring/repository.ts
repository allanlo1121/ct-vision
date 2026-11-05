// tbm-progress.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import type {
  RingRecord,
  CreateRingRecordInput,
  CreateRingPhaseRecordInput,
} from "@workspace/tbm/runtime"

import {
  RingRecordRepository,
  RingPhaseRecordRepository,
  ringPhaseRecordSchema,
  ringRecordSchema,
} from "@workspace/tbm/runtime"

export type PulseRingRecordRepository = Pick<
  RingRecordRepository,
  "findByRingNo" | "upsert"
>

export const ringRecordRepository: PulseRingRecordRepository = {
  async findByRingNo(
    tunnelId: string,
    ringNo: number
  ): Promise<RingRecord | null> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("ring_records")
      .select("*")
      .eq("tunnel_id", tunnelId)
      .eq("ring_no", ringNo)
      .maybeSingle()
    assertNoError(error)
    return data ? ringRecordSchema.parse(data) : null
  },
  async upsert(input: CreateRingRecordInput): Promise<void> {
    const { error } = await supabase.schema("tbm").rpc("upsert_ring_record", {
      p_tbm_code: input.tbm_code,
      p_tunnel_id: input.tunnel_id,
      p_ring_no: input.ring_no,
      p_chainage: input.end_chainage!,
      p_recorded_at: input.ended_at!,
    })
    assertNoError(error)
  },
}

export type PulseRingPhaseRecordRepository = Pick<
  RingPhaseRecordRepository,
  "findActive" | "create" | "switchPhase"
>

export const ringPhaseRepository: PulseRingPhaseRecordRepository = {
  async findActive(tbmCode: string) {
    const { data, error } = await supabase
      .schema("tbm")
      .from("ring_phase_records")
      .select("*")
      .eq("tbm_code", tbmCode)
      .is("ended_at", null)
      .maybeSingle()
    assertNoError(error)
    // console.log("findActive", { tbmCode, data })
    return data ? ringPhaseRecordSchema.parse(data) : null
  },
  async create(input: CreateRingPhaseRecordInput): Promise<void> {
    const { error } = await supabase
      .schema("tbm")
      .from("ring_phase_records")
      .insert(input)
      .single()
    assertNoError(error)
  },
  async switchPhase(input: CreateRingPhaseRecordInput): Promise<boolean> {
    const { data, error } = await supabase
      .schema("tbm")
      .rpc("switch_ring_phase", {
        p_tbm_code: input.tbm_code,
        p_ring_record_id: input.ring_record_id,
        p_phase: input.tbm_phase_type,
        p_recorded_at: input.started_at,
      })

    assertNoError(error)

    return data === true
  },
}
