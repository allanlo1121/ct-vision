// sign-in.ts
"use server"

import { createClient } from "@workspace/supabase/server"

export async function signIn(
  email: string,
  password: string
) {
  const supabase = await createClient()

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (error) {
    throw error
  }
}