import type { ReactNode } from "react"

import { projectRepository } from "@/lib/proj/project/repository"
import { ProjectSidebar } from "./_components/project-sidebar"

interface LayoutProps {
  children: ReactNode
}

export default async function ProjectLayout({ children }: LayoutProps) {
  const projects = await projectRepository.findAll()

  return (
    <div className="flex h-full min-h-0 min-w-0 overflow-hidden">
      {/* 所有生产运行页面共用 */}
      <aside className="w-56 shrink-0 overflow-y-auto border-r pr-3">
        <ProjectSidebar projects={projects} />
      </aside>

      {/* 子页面内容区域 */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pl-4">
        {children}
      </main>
    </div>
  )
}
