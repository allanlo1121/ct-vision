// packages/supabase/src/browser.ts

import { createBrowserClient } from "@supabase/ssr"

import type { Database } from "./database.types.js"

export type SupabasePublicConfig = {
  url: string
  publicKey: string
}

export type SupabaseBrowserClient = ReturnType<
  typeof createBrowserClient<Database>
>

export function createSupabaseBrowserClient({
  url,
  publicKey,
}: SupabasePublicConfig): SupabaseBrowserClient {
  return createBrowserClient<Database>(url, publicKey)
}
