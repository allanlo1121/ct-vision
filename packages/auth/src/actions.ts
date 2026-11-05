"use server"

import { signIn as signInAction } from "./server/sign-in"
import { signOut as signOutAction } from "./server/sign-out"

export async function signIn(
  email: string,
  password: string
) {
  return signInAction(email, password)
}

export async function signOut() {
  return signOutAction()
}