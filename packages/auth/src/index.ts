export type {
  AuthContext,
  AuthUser,
  AuthorizationResult,
  CreateAuthContextInput,
  PermissionGrant,
  RoleCode,
  UserId,
} from "./core"

export { createAuthContext } from "./core"

export {
  isAuthenticated,
  requireAuthenticated,
  hasAllRoles,
  hasAnyRole,
  hasRole,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
  requireAllPermissions,
  requireAnyPermission,
  requirePermission,
  requireRole,
} from "./core"

export { SUPER_ADMIN_ROLE } from "./constants"
