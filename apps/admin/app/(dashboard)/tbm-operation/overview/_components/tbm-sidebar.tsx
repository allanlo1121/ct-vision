"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Folder } from "lucide-react"
import { Tbm } from "@workspace/tbm/tbm"

import { cn } from "cn"

interface Props {
  tbms: Tbm[]
}

export function TbmSidebar({ tbms }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedCode = searchParams.get("code")

  function getHref(code: string) {
    const params = new URLSearchParams(searchParams.toString())

    params.set("code", code)

    // 切换 TBM 时重置分页
    params.delete("page")

    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="rounded-lg border bg-card p-2">
      <div className="px-3 py-2 text-sm font-semibold">TBM 设备</div>

      <nav className="flex flex-col gap-1">
        {tbms.map((tbm) => {
          const active = selectedCode === tbm.code

          return (
            <Link
              key={tbm.code}
              href={getHref(tbm.code)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                active && "bg-primary/10 font-medium text-primary"
              )}
            >
              <Folder className="size-4 shrink-0" />

              <span className="truncate">{tbm.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
