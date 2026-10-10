"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"

import {
  hasPermission,
  hasRole,
  type AuthContext,
  type PermissionCode,
  type RoleCode,
} from "@workspace/auth"

interface AuthContextValue {
  auth: AuthContext

  user: AuthContext["user"]
  roles: AuthContext["roles"]
  permissions: AuthContext["permissions"]

  can: (permission: PermissionCode) => boolean
  hasRole: (role: RoleCode) => boolean
}

const AuthReactContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
  initialContext: AuthContext
}

export function AuthProvider({
  children,
  initialContext,
}: AuthProviderProps) {
  const value = useMemo<AuthContextValue>(
    () => ({
      auth: initialContext,

      user: initialContext.user,
      roles: initialContext.roles,
      permissions: initialContext.permissions,

      can(permission) {
        return hasPermission(initialContext, permission)
      },

      hasRole(role) {
        return hasRole(initialContext, role)
      },
    }),
    [initialContext]
  )

  return (
    <AuthReactContext.Provider value={value}>
      {children}
    </AuthReactContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthReactContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
