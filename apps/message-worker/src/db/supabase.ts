// apps/pulse/src/lib/supabase.ts

import { createSupabasePrivilegedClient } from "@workspace/supabase/privileged"

export const supabase = createSupabasePrivilegedClient({
  url: process.env.SUPABASE_URL!,
  secretKey: process.env.SUPABASE_SECRET_KEY!,
})

