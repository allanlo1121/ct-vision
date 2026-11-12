
"use client"

import { useEffect, useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  HardHat,
  Layers,
} from "lucide-react"

import { cn } from "cn"
import { useQueryNavigation } from "@/hooks/use-query-navigation"

// ============================================
// Types
// ============================================

export interface EngineeringTreeUnit {
  id: string
  name: string
}

export interface EngineeringTreeProject {
  id: string
  name: string
  units: EngineeringTreeUnit[]
}

interface Props {
  projects: EngineeringTreeProject[]
  title?: string
  className?: string
}

// ============================================
// Component
// ============================================

export function EngineeringTreeSidebar({
  projects,
  title = "工程导航",
  className,
}: Props) {
  const { navigate, searchParams } = useQueryNavigation()

  const projectId = searchParams.get("projectId")
  const unitId = searchParams.get("unitId")

  // 记录已展开的项目
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(projectId ? [projectId] : [])
  )

  // URL 变化时，自动展开当前项目
  useEffect(() => {
    if (!projectId) return

    setExpandedIds((prev) => {
      if (prev.has(projectId)) return prev

      const next = new Set(prev)
      next.add(projectId)
      return next
    })
  }, [projectId])

  // ==========================================
  // Actions
  // ==========================================

  function toggleProject(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  function selectProject(id: string) {
    navigate({
      projectId: id,
      unitId: null,
      page: 1,
    })
  }

  function selectUnit(
    selectedProjectId: string,
    selectedUnitId: string
  ) {
    navigate({
      projectId: selectedProjectId,
      unitId: selectedUnitId,
      page: 1,
    })
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <aside
      className={cn(
        "rounded-lg border bg-card p-2",
        className
      )}
    >
      <div className="px-3 py-2 text-sm font-semibold">
        {title}
      </div>

      <nav
        aria-label={title}
        className="flex flex-col gap-1"
      >
        {projects.map((project) => {
          const expanded = expandedIds.has(project.id)

          const projectActive =
            projectId === project.id && !unitId

          const units = project.units

          return (
            <div key={project.id}>
              {/* ==================================
                  Project
              ================================== */}
              <div className="flex items-center gap-1">
                {/* 展开 / 收起 */}
                <button
                  type="button"
                  onClick={() => toggleProject(project.id)}
                  aria-label={
                    expanded
                      ? `收起${project.name}`
                      : `展开${project.name}`
                  }
                  aria-expanded={expanded}
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center",
                    "rounded-md text-muted-foreground",
                    "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {expanded ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>

                {/* 项目节点 */}
                <button
                  type="button"
                  onClick={() => selectProject(project.id)}
                  aria-current={
                    projectActive ? "page" : undefined
                  }
                  title={project.name}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-2",
                    "rounded-md px-2 py-2 text-left text-sm",
                    "transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    projectActive &&
                      "bg-primary/10 font-medium text-primary"
                  )}
                >
                  <HardHat
                    className={cn(
                      "size-4 shrink-0",
                      projectActive
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />

                  <span className="min-w-0 flex-1 truncate">
                    {project.name}
                  </span>
                </button>
              </div>

              {/* ==================================
                  Engineering Units
              ================================== */}
              {expanded && (
                <div className="ml-7 flex flex-col gap-1 border-l pl-2">
                  {units.map((unit) => {
                    const active =
                      projectId === project.id &&
                      unitId === unit.id

                    return (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() =>
                          selectUnit(project.id, unit.id)
                        }
                        aria-current={
                          active ? "page" : undefined
                        }
                        title={unit.name}
                        className={cn(
                          "flex w-full min-w-0 items-center gap-2",
                          "rounded-md px-3 py-2 text-left text-sm",
                          "transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          active &&
                            "bg-primary/10 font-medium text-primary"
                        )}
                      >
                        <Layers
                          className={cn(
                            "size-4 shrink-0",
                            active
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />

                        <span className="min-w-0 flex-1 truncate">
                          {unit.name}
                        </span>
                      </button>
                    )
                  })}

                  {units.length === 0 && (
                    <div className="px-3 py-2 text-xs text-muted-foreground">
                      暂无工程单元
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Empty */}
        {projects.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            暂无项目
          </div>
        )}
      </nav>
    </aside>
  )
}
