import { appErrors } from "@workspace/errors"

import type { AuthContext } from "./types"

/**
 * 判断当前是否存在认证上下文。
 */
export function isAuthenticated(
  auth: AuthContext | null | undefined
): auth is AuthContext {
  return Boolean(auth?.user?.userId)
}

/**
 * 要求用户已登录。
 *
 * 如果 auth 不存在，则抛 UnauthorizedError。
 */
export function requireAuthenticated(
  auth: AuthContext | null | undefined
): AuthContext {
  if (!isAuthenticated(auth)) {
    throw appErrors.unauthorized()
  }

  return auth
}
