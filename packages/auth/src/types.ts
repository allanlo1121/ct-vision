export type UserId = string

export type RoleCode = string

export type PermissionCode = string

/**
 * 授权作用域。
 *
 * system:
 *   整个平台
 *
 * organization:
 *   指定组织
 *
 * project:
 *   指定项目
 */
export type AuthorizationScope =
  | {
      type: "system"
    }
  | {
      type: "organization"
      organizationId: string
    }
  | {
      type: "project"
      projectId: string
      organizationId?: string
    }

/**
 * 当前认证用户的基础信息。
 *
 * 这里只保存授权系统真正关心的信息，
 * 不把 Supabase User 整个对象传进来。
 */
export interface AuthUser {
  id: UserId

  email?: string

  displayName?: string
}

/**
 * 当前作用域下已经计算完成的授权上下文。
 *
 * roles / permissions 应由应用层从数据库读取并计算。
 *
 * packages/auth 不负责数据库访问。
 */
export interface AuthContext {
  user: AuthUser

  scope: AuthorizationScope

  roles: readonly RoleCode[]

  permissions: readonly PermissionCode[]
}

/**
 * 用于创建 AuthContext 的输入类型。
 */
export interface CreateAuthContextInput {
  user: AuthUser

  scope: AuthorizationScope

  roles?: readonly RoleCode[]

  permissions?: readonly PermissionCode[]
}