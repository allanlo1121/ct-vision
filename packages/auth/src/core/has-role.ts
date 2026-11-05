
import type {
  AuthContext,
  RoleCode,
} from "./types"
/**
 * 判断当前用户是否拥有指定角色。
 */
export function hasRole(
  auth: AuthContext,
  role: RoleCode
): boolean {
  return auth.roles.includes(role)
}

/**
 * 判断当前用户是否拥有任意一个角色。
 */
export function hasAnyRole(
  auth: AuthContext,
  roles: readonly RoleCode[]
): boolean {
  return roles.some((role) =>
    hasRole(auth, role)
  )
}

/**
 * 判断当前用户是否同时拥有所有角色。
 */
export function hasAllRoles(
  auth: AuthContext,
  roles: readonly RoleCode[]
): boolean {
  return roles.every((role) =>
    hasRole(auth, role)
  )
}


