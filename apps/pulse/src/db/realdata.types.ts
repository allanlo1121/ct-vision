// lib/realdata.types.ts

import type { Database } from "@workspace/supabase"

type RealdataValue = number | string | boolean | null

type ShieldTable = {
  Row: {
    id: number
    tbm_code: string
    sampled_at: string
    created_at: string
    updated_at: string | null
  } & Record<string, RealdataValue>

  Insert: {
    tbm_code: string
    sampled_at: string
    created_at?: string
    updated_at?: string | null
  } & Record<string, RealdataValue | undefined>

  Update: Record<string, RealdataValue | undefined>

  Relationships: []
}

export type PulseDatabase = Omit<Database, "tbm"> & {
  tbm: Omit<Database["tbm"], "Tables"> & {
    Tables: Database["tbm"]["Tables"] & {
      [K in `shield_${string}`]: ShieldTable
    }
  }
}