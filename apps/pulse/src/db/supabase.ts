// apps/pulse/src/lib/supabase.ts

import { createSupabasePrivilegedClient } from "@workspace/supabase/privileged"

export const supabase = createSupabasePrivilegedClient({
  url: process.env.SUPABASE_URL!,
  secretKey: process.env.SUPABASE_SECRET_KEY!,
})


import { createClient } from "@supabase/supabase-js"
import type { PulseDatabase } from "./realdata.types"

export const realdataSupabase = createClient<PulseDatabase>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
)