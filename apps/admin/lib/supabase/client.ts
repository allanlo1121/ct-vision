import {
  createSupabaseBrowserClient,
  type SupabaseBrowserClient,
} from "@workspace/supabase/browser"

export function createClient(): SupabaseBrowserClient {
  return createSupabaseBrowserClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  })
}
