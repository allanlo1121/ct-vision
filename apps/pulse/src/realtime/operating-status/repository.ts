// tbm-Runtime.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import type { TbmOperatingStatus } from "@workspace/tbm/runtime"
import { tbmOperatingStatusSchema } from "@workspace/tbm/runtime"

export const operatingStatusRepository = {
  async findByTbmCodes(tbmCodes: string[]): Promise<TbmOperatingStatus[]> {
    if (tbmCodes.length === 0) return []

    const { data, error } = await supabase
      .schema("tbm")
      .from("operating_status")
      .select("*")
      .in("tbm_code", tbmCodes)

    assertNoError(error)

    return tbmOperatingStatusSchema.array().parse(data)
  },
}
