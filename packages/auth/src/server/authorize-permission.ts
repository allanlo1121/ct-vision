// packages/auth/src/server/authorize-permission.ts

import "server-only"

import {
  requirePermission,
  type PermissionGrant,
} from "../core"

import { getRequiredAuthContext } from "./get-required-auth-context"

export async function authorizePermission(
  permission: PermissionGrant
) {
  const auth = await getRequiredAuthContext()

  return requirePermission(auth, permission)
}