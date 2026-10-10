// RuntimeProvider.tsx
import type { AuthContext } from "@workspace/auth"

import { MenuProvider } from "./menu/MenuProvider"

import type { MenuNode } from "@/lib/system/navigation"

import { RuntimeAuthProvider } from "./auth/AuthProvider"

interface RuntimeProviderProps {
  children: React.ReactNode
  authContext: AuthContext
  menus: MenuNode[]
}

export function RuntimeProvider({
  children,
  authContext,
  menus,
}: RuntimeProviderProps) {
  return (
    <RuntimeAuthProvider initialContext={authContext}>
      <MenuProvider initialMenus={menus}>{children}</MenuProvider>
    </RuntimeAuthProvider>
  )
}
