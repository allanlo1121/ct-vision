import type {
  AuthContext,
  CreateAuthContextInput,
  PermissionCode,
  RoleCode,
} from "./types.js"

function unique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)]
}

export function createAuthContext(input: CreateAuthContextInput): AuthContext {
  const roles = unique<RoleCode>(input.roles ?? [])

  const permissions = unique<PermissionCode>(input.permissions ?? [])

  return {
    user: input.user,
    scope: input.scope,
    roles,
    permissions,
  }
}
