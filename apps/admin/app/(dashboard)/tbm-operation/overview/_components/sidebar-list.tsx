"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"
import type { Tbm } from "@workspace/tbm/tbm"

interface TbmSidebarListProps {
  tbms: Tbm[]
  activeTbmCode?: string
}

export function TbmSidebarList({ tbms, activeTbmCode }: TbmSidebarListProps) {
  const pathname = usePathname()

  const suffix = pathname.replace(/^\/tbm\/tbms\/[^/]+/, "")

  return (
    <nav className="space-y-1 p-2">
      {tbms.map((tbm) => (
        <Link
          key={tbm.code}
          href={`/tbm/tbms/${encodeURIComponent(tbm.code)}${suffix}`}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm",
            "hover:bg-accent hover:text-accent-foreground",
            activeTbmCode === tbm.code &&
              "bg-accent font-medium text-accent-foreground"
          )}
        >
          {tbm.name}
        </Link>
      ))}
    </nav>
  )
}
