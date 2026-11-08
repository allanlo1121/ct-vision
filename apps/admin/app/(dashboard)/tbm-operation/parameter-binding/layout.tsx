import type { ReactNode } from "react"

import { subsystemRepository } from "@/lib/tbm/subsystem/repository"
import { SubsystemNav } from "./_components/subsystem-nav"

interface LayoutProps {
  children: ReactNode
}

export default async function ParameterBindingLayout({
  children,
}: LayoutProps) {
  const subsystems = await subsystemRepository.findAll()

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {/* 参数配置独有的标题和子系统导航 */}
      <div className="shrink-0 space-y-4 border-b pb-4">
        <div>
          <h1 className="text-xl font-semibold">TBM 参数配置</h1>
          <p className="text-sm text-muted-foreground">
            管理 TBM 绑定参数及专用报警阈值
          </p>
        </div>

        <SubsystemNav subsystems={subsystems} />
      </div>

      {/* 独立滚动 */}
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto pt-4">
        {children}
      </div>
    </div>
  )
}
