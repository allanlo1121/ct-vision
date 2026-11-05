import type {
  AuthContext,
  CreateAuthContextInput,
  PermissionGrant,
} from "./types"

// 字符串去重
function unique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)]
}

// 权限去重
function uniquePermissions(
  permissions: readonly PermissionGrant[]
): PermissionGrant[] {
  const map = new Map<string, PermissionGrant>()

  for (const permission of permissions) {
    const key = `${permission.module}.${permission.action}`

    map.set(key, permission)
  }

  return [...map.values()]
}

export function createAuthContext(
  input: CreateAuthContextInput
): AuthContext {
  return {
    user: input.user,
    roles: unique(input.roles ?? []),
    permissions: uniquePermissions(input.permissions ?? []),
  }
}