// packages/auth/src/server/get-required-auth-context.ts

import "server-only"

import { redirect } from "next/navigation"
import { getCurrentAuthContext } from "./get-current-auth-context"

export async function getRequiredAuthContext() {
  const auth = await getCurrentAuthContext()

  if (!auth) {
    redirect("/auth/login")
  }

  return auth
}