import type { PermissionCode } from "./types.js"

export class UnauthorizedError extends Error {
  readonly code = "UNAUTHORIZED"

  constructor(
    message = "用户未登录"
  ) {
    super(message)

    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends Error {
  readonly code = "FORBIDDEN"

  readonly permission?: PermissionCode

  constructor(
    message = "没有访问权限",
    permission?: PermissionCode
  ) {
    super(message)

    this.name = "ForbiddenError"
    this.permission = permission
  }
}