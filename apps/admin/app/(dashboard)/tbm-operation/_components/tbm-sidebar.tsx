"use client"

import { HardHat } from "lucide-react"

import type { Tbm } from "@workspace/tbm/tbm"
import { cn } from "cn"
import { useQueryNavigation } from "@/hooks/use-query-navigation"

interface Props {
  tbms: Tbm[]
}

export function TbmSidebar({ tbms }: Props) {
  const { navigate, searchParams } = useQueryNavigation()

  const selectedCode = searchParams.get("tbmCode")

  return (
    <div className="rounded-lg border bg-card p-2">
      <div className="px-3 py-2 text-sm font-semibold">TBM 设备</div>

      <nav aria-label="TBM 设备选择" className="flex flex-col gap-1">
        {tbms.map((tbm) => {
          const active = selectedCode === tbm.code

          return (
            <button
              key={tbm.code}
              type="button"
              onClick={() => navigate({ tbmCode: tbm.code })}
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

              <span className="min-w-0 flex-1 truncate">{tbm.name}</span>
            </button>
          )
        })}

        {tbms.length === 0 && (
          <p className="px-3 py-4 text-center text-sm text-muted-foreground">
            暂无 TBM 设备
          </p>
        )}
      </nav>
    </div>
  )
}
