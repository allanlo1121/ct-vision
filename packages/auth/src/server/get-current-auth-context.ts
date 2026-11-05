import "server-only"
import { cache } from "react"

import { createClient } from "@workspace/supabase/server"
import { authContextSchema } from "../core/auth-context.schema"
import { createAuthContext } from "../core/create-auth-context"

export const getCurrentAuthContext = cache(async () => {
  const supabase = await createClient()

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims()

  if (claimsError || !claimsData?.claims) {
    return null
  }

  const { data, error } = await supabase
    .schema("api")
    .rpc("get_current_auth_context")

  if (error) {
    throw error
  }

  return createAuthContext(authContextSchema.parse(data))
})
