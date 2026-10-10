"use client"

import * as React from "react"
import type { AppTeam, FavoriteProject } from "@/lib/app-context"

import { NavMain } from "@/components/navigation/nav-main"
import { NavProjects } from "@/components/navigation/nav-projects"
import { NavUser } from "@/components/navigation/nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

import { MenuNode } from "@workspace/system/menu"
import type { AuthUser } from "@workspace/auth/context"
// import { useAppContext } from "@/lib/runtime/appContext/useAppContext";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  menus: MenuNode[]
  authUser: AuthUser
  appTeams: AppTeam[]
  favoriteProjects: FavoriteProject[]
}

export function AppSidebar({
  menus,
  authUser,
  appTeams,
  favoriteProjects,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={appTeams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
        <NavProjects projects={favoriteProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={authUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
