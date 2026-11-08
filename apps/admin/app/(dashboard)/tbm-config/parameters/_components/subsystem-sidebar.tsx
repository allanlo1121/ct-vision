"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Folder, Layers3 } from "lucide-react"

import { cn } from "cn"
import type { Subsystem } from "@workspace/tbm/parameter"

interface Props {
  subsystems: Subsystem[]
}

export function SubsystemSidebar({ subsystems }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedCode = searchParams.get("subsystemCode")

  function getHref(code: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (code) {
      params.set("subsystemCode", code)
    } else {
      params.delete("subsystemCode")
    }

    // 切换子系统时重置分页
    params.delete("page")

    const query = params.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  return (
    <div className="rounded-lg border bg-card p-2">
      <div className="px-3 py-2 text-sm font-semibold">
        子系统
      </div>

      <nav className="flex flex-col gap-1">
        <Link
          href={getHref(null)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
            "hover:bg-accent hover:text-accent-foreground",
            !selectedCode &&
              "bg-primary/10 font-medium text-primary"
          )}
        >
          <Layers3 className="size-4" />
          全部参数
        </Link>

        {subsystems.map((subsystem) => (
          <Link
            key={subsystem.code}
            href={getHref(subsystem.code)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
              "hover:bg-accent hover:text-accent-foreground",
              selectedCode === subsystem.code &&
                "bg-primary/10 font-medium text-primary"
            )}
          >
            <Folder className="size-4 shrink-0" />

            <span className="truncate">
              {subsystem.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}