"use client"

import type { ReactNode } from "react"
import { useAuth } from "./auth-provider"
import type { PermissionGrant } from "../core"

interface CanProps {
  permission: PermissionGrant
  children: ReactNode
  fallback?: ReactNode
}

export function Can({ permission, children, fallback = null }: CanProps) {
  const { can } = useAuth()

  return can(permission) ? children : fallback
}
