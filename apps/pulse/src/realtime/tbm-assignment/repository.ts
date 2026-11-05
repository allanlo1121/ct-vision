// tbm-assignment.repository.ts

import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import {
  type TbmAssignmentCurrentRow,
  TbmAssignmentCurrentRepository,
} from "@workspace/tbm/tbm"



export const tbmAssignmentRepository: TbmAssignmentCurrentRepository =
  {
    async findById(id: string) {
      const { data, error } = await supabase
        .schema("tbm")
        .from("v_current_assignments")
        .select("*")
        .eq("id", id)
        .maybeSingle()

      assertNoError(error)

      return data ?? null
    },
    async findByTunnelId(tunnelId: string) {
      const { data, error } = await supabase
        .schema("tbm")
        .from("v_current_assignments")
        .select("*")
        .eq("tunnel_id", tunnelId)
        .select("*")
        .maybeSingle()

      assertNoError(error)

      return data ?? null
    },
    async list() {

      const { data, error } = await supabase
        .schema("tbm")
        .from("v_current_assignments")
        .select("*")

      assertNoError(error)

      return data ?? []
    },
    async findByTbmCode(tbmCode: string) {
      const { data, error } = await supabase
        .schema("tbm")
        .from("v_current_assignments")
        .select("*")
        .eq("tbm_code", tbmCode)
        .maybeSingle()

      assertNoError(error)

      return data ?? null
    },
  }
