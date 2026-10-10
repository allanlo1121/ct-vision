import { redirect } from "next/navigation"

import { getAuthContext } from "@/lib/auth/services"

import { AppSidebar } from "./_components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { Separator } from "@workspace/ui/components/separator"
import { DashboardBreadcrumbs } from "./_components/dashboard-breadcrumbs"

import { appTeams, favoriteProjects } from "@/lib/app-context"
import { menuRepository } from "@/lib/navigation/repository"
import { buildMenuTree } from "@workspace/system/menu"
import { AuthProvider } from "@/providers/auth/AuthProvider"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authContext = await getAuthContext()

  if (!authContext) {
    redirect("/auth/login")
  }
  const menus = await menuRepository.findByScope("global")

  // console.log("admin-menus", menus)

  const menuTree = buildMenuTree(menus)

  return (
    <AuthProvider initialContext={authContext}>
      <SidebarProvider>
        <AppSidebar
          menus={menuTree}
          authUser={authContext.user}
          appTeams={appTeams}
          favoriteProjects={favoriteProjects}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />

            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-center"
            />

            <DashboardBreadcrumbs menus={menuTree} />
          </header>

          <main className="flex-1 overflow-auto px-4 pt-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}

//   const supabase = await createClient()

//   const { data, error } = await supabase.auth.getClaims()

//   console.log("claims:", data?.claims)
//   console.log("claims error:", error)

//   const appContext = await getAppContext(authContext)
