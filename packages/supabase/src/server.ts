import {
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr"

import type { Database } from "./database.types.js"
import type {
  SupabasePublicConfig,
} from "./browser.js"

export type SupabaseServerClient = ReturnType<
  typeof createServerClient<Database>
>

export type SupabaseCookie = {
  name: string
  value: string
}

export type SupabaseCookieToSet = {
  name: string
  value: string
  options: CookieOptions
}

export type SupabaseCookieAdapter = {
  getAll:
    | (() => SupabaseCookie[] | null)
    | (() => Promise<SupabaseCookie[] | null>)

  setAll:
    | ((cookies: SupabaseCookieToSet[]) => void)
    | ((
        cookies: SupabaseCookieToSet[]
      ) => Promise<void>)
}

export type SupabaseServerConfig =
  SupabasePublicConfig & {
    cookies: SupabaseCookieAdapter
  }

export function createSupabaseServerClient({
  url,
  publicKey,
  cookies,
}: SupabaseServerConfig): SupabaseServerClient {
  return createServerClient<Database>(
    url,
    publicKey,
    {
      cookies,
    }
  )
}