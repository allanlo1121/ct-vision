// packages/auth/src/server/require-user.ts

import "server-only"
import { redirect } from "next/navigation"
import { getCurrentAuthContext } from "./get-current-auth-context"

export async function requireUser() {
  const auth = await getCurrentAuthContext()

  if (!auth) {
    redirect("/auth/login")
  }

  return auth
}