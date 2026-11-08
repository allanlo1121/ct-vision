"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Input } from "@workspace/ui/components/input"

import { SidebarFilters } from "./sidebar-filter"
import { TbmSidebarList } from "./sidebar-list"
import type { Tbm } from "@workspace/tbm/tbm"

interface SidebarProps {
  tbms: Tbm[]
}

export function Sidebar({ tbms }: SidebarProps) {
  const params = useParams<{ code: string }>()
  const activeTbmCode = params.code

  const [search, setSearch] = useState("")

  const filteredTbms = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) return tbms

    return tbms.filter((tbm) => tbm.code.toLowerCase().includes(keyword))
  }, [tbms, search])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">盾构机目录</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          共 {tbms.length} 台设备
        </p>
      </div>

      <div className="border-b p-3">
        <SidebarFilters
          value={{ search }}
          onChange={({ search }) => setSearch(search)}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <TbmSidebarList tbms={filteredTbms} activeTbmCode={activeTbmCode} />
      </div>
    </div>
  )
}
