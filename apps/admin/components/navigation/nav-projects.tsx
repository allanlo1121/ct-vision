"use client";

import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { FavoriteProject } from "@/lib/app-context/types";
import { resolveIcon } from "@/lib/navigation/adapter";
import Link from "next/link";

export function NavProjects({ projects }: { projects: FavoriteProject[] }) {
  const { isMobile } = useSidebar();

  return (
   <SidebarGroup className="group-data-[collapsible=icon]:hidden">
  <SidebarGroupLabel>Projects</SidebarGroupLabel>

  <SidebarMenu>
    {projects.map((item) => {
      const Icon = resolveIcon(item.icon);

      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            render={<Link href={item.url} />}
          >
            {Icon && <Icon />}
            <span>{item.name}</span>
          </SidebarMenuButton>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuAction showOnHover />
              }
            >
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-48 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
            >
              <DropdownMenuItem>
                <Folder className="text-muted-foreground" />
                <span>View Project</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Forward className="text-muted-foreground" />
                <span>Share Project</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Trash2 className="text-muted-foreground" />
                <span>Delete Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )
    })}

    <SidebarMenuItem>
      <SidebarMenuButton className="text-sidebar-foreground/70">
        <MoreHorizontal className="text-sidebar-foreground/70" />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroup>
  );
}
