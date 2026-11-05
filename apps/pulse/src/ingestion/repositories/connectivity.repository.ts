import { supabase } from "../../db/supabase"
import { assertNoError } from "@workspace/supabase/errors"
import type {
  TbmConnectionStatusRepository,
  CreateTbmConnectionStatusInput,
} from "@workspace/tbm/runtime"

export type PulseConnectionRepository = Pick<
  TbmConnectionStatusRepository,
  "upsert"
>

export const connectivityRepository: PulseConnectionRepository = {
  async upsert(input: CreateTbmConnectionStatusInput): Promise<void> {
    // Implement the insert logic here
    const {  error } = await supabase
      .schema("tbm")
      .from("connection_status")
      .upsert(input, {
        onConflict: "tbm_code",
      })

    // console.log("TBM Parameter creation error:", error)

    assertNoError(error)
  },
}
