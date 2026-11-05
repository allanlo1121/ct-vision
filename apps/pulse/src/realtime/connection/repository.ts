// tbm-Runtime.repository.ts
import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"

import type { TbmConnectionStatus } from "@workspace/tbm/runtime"
import { tbmConnectionStatusSchema } from "@workspace/tbm/runtime"

export const connectionStatusRepository = {
  async findByTbmCodes(tbmCodes: string[]): Promise<TbmConnectionStatus[]> {
    if (tbmCodes.length === 0) return []

    const { data, error } = await supabase
      .schema("tbm")
      .from("connection_status")
      .select("*")
      .in("tbm_code", tbmCodes)

    assertNoError(error)

    return tbmConnectionStatusSchema.array().parse(data)
  },
}
