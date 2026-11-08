import type { ReactNode } from "react"

import { tbmRepository } from "@/lib/equip/tbm/repository"
import { ParameterNav } from "./_components/parameter-nav"
import { TbmSidebar } from "./_components/tbm-sidebar"

interface LayoutProps {
  children: ReactNode
}
export default async function TbmLayout({ children }: LayoutProps) {
  const tbms = await tbmRepository.findAll()

  return (
    <div className="flex h-full min-h-0 min-w-0 overflow-hidden">
      {/* 左侧独立滚动 */}
      <aside className="h-full min-h-0 w-56 shrink-0 overflow-y-auto border-r pr-3">
        <TbmSidebar tbms={tbms} />
      </aside>

      {/* 右侧独立滚动 */}
      <div className="h-full min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">参数管理</h1>

            <p className="text-sm text-muted-foreground">
              管理 TBM 标准参数、子系统及通用报警阈值
            </p>
          </div>

          <ParameterNav />

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
