import type { AuthContext, CreateAuthContextInput } from "./types"

function unique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)]
}

export function createAuthContext(input: CreateAuthContextInput): AuthContext {
  return {
    user: input.user,
    roles: unique(input.roles ?? []),
    permissions: unique(input.permissions ?? []),
  }
}
