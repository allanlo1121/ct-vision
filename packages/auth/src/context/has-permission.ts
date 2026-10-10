import { appErrors } from "@workspace/errors";


import type { AuthContext, PermissionCode, RoleCode } from "./types"
import { requireAuthenticated } from "./has-authorization"
import { hasRole } from "./has-role"

/**
 * 判断当前用户是否拥有指定权限。
 */
export function hasPermission(
  auth: AuthContext,
  permission: PermissionCode
): boolean {
  return auth.permissions.includes(permission)
}

/**
 * 判断当前用户是否拥有任意一个权限。
 */
export function hasAnyPermission(
  auth: AuthContext,
  permissions: readonly PermissionCode[]
): boolean {
  return permissions.some((permission) => hasPermission(auth, permission))
}

/**
 * 判断当前用户是否同时拥有全部权限。
 */
export function hasAllPermissions(
  auth: AuthContext,
  permissions: readonly PermissionCode[]
): boolean {
  return permissions.every((permission) => hasPermission(auth, permission))
}

/**
 * 要求当前用户拥有指定角色。
 */
export function requireRole(
  auth: AuthContext | null | undefined,
  role: RoleCode
): AuthContext {
  const context = requireAuthenticated(auth)

  if (!hasRole(context, role)) {
    throw appErrors.permissionDenied(`缺少角色: ${role}`)
  }

  return context
}

/**
 * 要求当前用户拥有指定权限。
 */
export function requirePermission(
  auth: AuthContext | null | undefined,
  permission: PermissionCode
): AuthContext {
  const context = requireAuthenticated(auth)

  if (!hasPermission(context, permission)) {
    throw appErrors.permissionDenied(`缺少权限: ${permission}`)
  }

  return context
}

/**
 * 要求当前用户至少拥有其中一个权限。
 */
export function requireAnyPermission(
  auth: AuthContext | null | undefined,
  permissions: readonly PermissionCode[]
): AuthContext {
  const context = requireAuthenticated(auth)

  if (!hasAnyPermission(context, permissions)) {
    throw appErrors.permissionDenied(`缺少任一权限: ${permissions.join(", ")}`)
  }

  return context
}

/**
 * 要求当前用户拥有所有指定权限。
 */
export function requireAllPermissions(
  auth: AuthContext | null | undefined,
  permissions: readonly PermissionCode[]
): AuthContext {
  const context = requireAuthenticated(auth)

  if (!hasAllPermissions(context, permissions)) {
    throw appErrors.permissionDenied(`缺少权限: ${permissions.join(", ")}`)
  }

  return context
}
