import type { Database } from "@workspace/supabase/database"

export type PermissionModule =
  Database["iam"]["Enums"]["permission_module"]

export type PermissionAction =
  Database["iam"]["Enums"]["permission_action"]


export type UserId = string

export type RoleCode = string

export interface PermissionGrant {
  module: PermissionModule
  action: PermissionAction
}





/**
 * 当前认证用户的基础信息。
 *
 * 这里只保存授权系统真正关心的信息，
 * 不把 Supabase User 整个对象传进来。
 */
export interface AuthUser {
  /**
   * Supabase auth.users.id
   */
  userId: UserId

  email: string | null

  /**
   * 显示姓名
   */
  displayName: string

    /**
   * 头像地址
   */
  avatarUrl?: string | null

}



export interface AuthorizationResult {
  roles: readonly RoleCode[]
  permissions: readonly PermissionGrant[]
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

  roles: readonly RoleCode[]

  permissions: readonly PermissionGrant[]


}

/**
 * 用于创建 AuthContext 的输入类型。
 */
export interface CreateAuthContextInput {
  user: AuthUser


  roles?: readonly RoleCode[]

  permissions?: readonly PermissionGrant[]
}

