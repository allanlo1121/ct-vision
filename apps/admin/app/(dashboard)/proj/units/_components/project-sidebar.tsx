"use client"

import { HardHat } from "lucide-react"

import type { Project } from "@workspace/proj/project"
import { cn } from "cn"
import { useQueryNavigation } from "@/hooks/use-query-navigation"

interface Props {
  projects: Project[]
}

export function ProjectSidebar({ projects }: Props) {
  const { navigate, searchParams } = useQueryNavigation()

  const selectedCode = searchParams.get("projectId")

  return (
    <div className="rounded-lg border bg-card p-2">
      <div className="px-3 py-2 text-sm font-semibold">项目</div>

      <nav aria-label="项目选择" className="flex flex-col gap-1">
        {projects.map((project) => {
          const active = selectedCode === project.id

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => navigate({ projectId: project.id })}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                active && "bg-primary/10 font-medium text-primary"
              )}
            >
              <HardHat
                className={cn(
                  "size-4 shrink-0",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              />

              <span className="min-w-0 flex-1 truncate">{project.name}</span>
            </button>
          )
        })}

        {projects.length === 0 && (
          <p className="px-3 py-4 text-center text-sm text-muted-foreground">
            暂无 项目
          </p>
        )}
      </nav>
    </div>
  )
}
