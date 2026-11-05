"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@workspace/supabase/server"

export async function signOut(): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }

  revalidatePath("/", "layout")
}