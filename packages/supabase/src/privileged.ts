import { createClient } from "@supabase/supabase-js"

import type { Database } from "./database.types.js"

export type SupabasePrivilegedConfig = {
  url: string
  secretKey: string
}

export type SupabasePrivilegedClient = ReturnType<
  typeof createClient<Database>
>

export function createSupabasePrivilegedClient({
  url,
  secretKey,
}: SupabasePrivilegedConfig): SupabasePrivilegedClient {
  return createClient<Database>(
    url,
    secretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  )
}