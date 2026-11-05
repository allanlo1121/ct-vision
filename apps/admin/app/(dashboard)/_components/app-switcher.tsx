"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"

import { IconRenderer } from "@workspace/ui/icon"
import { Application } from "@workspace/system/application"

export function AppSwitcher({
  applications,
  currentAppCode,
}: {
  applications: Application[]
  currentAppCode: string
}) {
  const { isMobile } = useSidebar()
  const activeApp =
  applications.find((app) => app.code === currentAppCode)
  if (!activeApp) {
    return null
  }

  // const ActiveLogo = resolveIcon(activeTeam.logo)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <IconRenderer name={activeApp.icon} className="size-4" />
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeApp.name}</span>

              {/* <span className="truncate text-xs">
                {activeApp.type}
              </span> */}
            </div>

            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Applications
              </DropdownMenuLabel>

              {applications.map((app, index) => {
                // const TeamIcon = resolveIcon(team.logo)

                return (
                  <DropdownMenuItem
                    key={app.code}
                    render={<a href={app.base_url} />}                    
                    disabled={app.code === currentAppCode}
                    className="gap-2 p-2"
                  
                  >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                      <IconRenderer
                        name={app.icon}
                        className="size-3.5 shrink-0"
                      />
                    </div>
                    <span className="flex-1">{app.name}</span>
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

          {/*   <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>

                <div className="font-medium text-muted-foreground">
                  Add application
                </div>
              </DropdownMenuItem> 
            </DropdownMenuGroup>*/}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
