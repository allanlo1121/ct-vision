"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar"

import type { MenuNode } from "@workspace/system/menu"
import { resolveIcon } from "@/lib/navigation/adapter"

export function resolveMenuPath(pathUrl?: string | null) {
  if (!pathUrl) return "#"

  if (pathUrl.startsWith("/")) {
    return pathUrl
  }

  return `/${pathUrl}`
}

function isPathActive(pathname: string, pathUrl: string) {
  if (pathUrl === "#") return false

  return pathname === pathUrl || pathname.startsWith(`${pathUrl}/`)
}

export function NavMain({ items }: { items: MenuNode[] }) {
  const pathname = usePathname()

  const [openMenus, setOpenMenus] = React.useState<string[]>([])

  return (
    <SidebarGroup>
      <SidebarGroupLabel>管理后台</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const children = item.children ?? []

          const isRouteOpen = children.some((subItem) => {
            const pathUrl = resolveMenuPath(subItem.pathUrl)

            return isPathActive(pathname, pathUrl)
          })

          const isOpen = isRouteOpen || openMenus.includes(item.id)
          const Icon = resolveIcon(item.icon)

          return (
            <Collapsible
              key={item.id}
              render={<SidebarMenuItem />}
              open={isOpen}
              onOpenChange={(open) => {
                setOpenMenus((prev) =>
                  open
                    ? Array.from(new Set([...prev, item.id]))
                    : prev.filter((id) => id !== item.id)
                )
              }}
              className="group/collapsible"
            >
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton tooltip={item.name} />
                }
              >
                {Icon && <Icon />}

                <span>{item.name}</span>

                <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {children.map((subItem) => {
                    const pathUrl = resolveMenuPath(subItem.pathUrl)

                    const isActive = isPathActive(pathname, pathUrl)
                    const SubIcon = resolveIcon(subItem.icon)

                    return (
                      <SidebarMenuSubItem
                        key={subItem.id}
                        data-active={isActive}
                      >
                        <SidebarMenuSubButton
                          isActive={isActive}
                          render={<Link href={pathUrl} />}
                        >
                          {SubIcon && <SubIcon />}
                          <span>{subItem.name}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}