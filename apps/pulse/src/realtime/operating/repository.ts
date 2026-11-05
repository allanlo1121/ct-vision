// tbm-Runtime.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import type {
  TbmOperatingStatus,
  TbmOperatingStatusRepository,
} from "@workspace/tbm/runtime"
import { tbmOperatingStatusSchema } from "@workspace/tbm/runtime"

export const tbmOperatingStatusRepository: TbmOperatingStatusRepository = {
  async findByTbmCode(tbmCode: string): Promise<TbmOperatingStatus | null> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("operating_status")
      .select("*")
      .eq("tbm_code", tbmCode)
      .maybeSingle()

    assertNoError(error)

    return data ? tbmOperatingStatusSchema.parse(data) : null
  },
  async findAll(): Promise<TbmOperatingStatus[]> {
    const { data, error } = await supabase
      .schema("tbm")
      .from("operating_status")
      .select("*")

    assertNoError(error)

    return data ? tbmOperatingStatusSchema.array().parse(data) : []
  },
  async upsert(input): Promise<void> {
    const { error } = await supabase
      .schema("tbm")
      .from("operating_status")
      .upsert(input, {
        onConflict: "tbm_code",
      })

    assertNoError(error)
  },
  async delete(tbmCode: string): Promise<void> {
    const { error } = await supabase
      .schema("tbm")
      .from("operating_status")
      .delete()
      .eq("tbm_code", tbmCode)

    assertNoError(error)
  },
}

// export const tbmRuntimeRepository = new TbmRuntimeRepository()
