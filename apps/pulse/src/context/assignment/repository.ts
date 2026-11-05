// tbm-assignment.repository.ts

import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import { TbmAssignmentContext } from "@workspace/tbm/tbm"

export const tbmAssignmentRepository = {
  async findById(id: string): Promise<TbmAssignmentContext | null> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_current_assignments")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .overrideTypes<TbmAssignmentContext>()

    assertNoError(error)

    return data ?? null
  },
  async findByTunnelId(tunnelId: string): Promise<TbmAssignmentContext | null> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_current_assignments")
      .select("*")
      .eq("tunnel_id", tunnelId)
      .select("*")
      .maybeSingle()
      .overrideTypes<TbmAssignmentContext>()

    assertNoError(error)

    return data ?? null
  },
  async list(): Promise<TbmAssignmentContext[]> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_current_assignments")
      .select("*")
      .overrideTypes<TbmAssignmentContext[]>()

    assertNoError(error)

    return data ?? []
  },
  async findByTbmCode(tbmCode: string): Promise<TbmAssignmentContext | null> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("v_current_assignments")
      .select("*")
      .eq("tbm_code", tbmCode)
      .maybeSingle()
      .overrideTypes<TbmAssignmentContext>()

    assertNoError(error)

    return data ?? null
  },
}
