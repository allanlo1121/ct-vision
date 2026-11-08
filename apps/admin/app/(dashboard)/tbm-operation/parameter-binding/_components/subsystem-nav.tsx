"use client"

import { Check, ChevronDown } from "lucide-react"

import { cn } from "cn"
import { useQueryNavigation } from "@/hooks/use-query-navigation"
import type { SubsystemBase } from "@workspace/tbm/parameter"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

interface Props {
  subsystems: SubsystemBase[]
}

const QUICK_COUNT = 4

export function SubsystemNav({ subsystems }: Props) {
  const { navigate, searchParams } = useQueryNavigation()

  const selectedCode = searchParams.get("subsystemCode")

  // 启用的子系统，按 sort_order 排序
  const items = [...subsystems]
    .filter((item) => !item.is_disabled)
    .sort((a, b) => a.sort_order - b.sort_order || a.code.localeCompare(b.code))

  const quickItems = items.slice(0, QUICK_COUNT)
  const moreItems = items.slice(QUICK_COUNT)

  const selectedMore = moreItems.find((item) => item.code === selectedCode)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* 全部 */}
      <Button
        type="button"
        size="sm"
        variant={!selectedCode ? "default" : "outline"}
        onClick={() => navigate({ subsystemCode: null })}
      >
        全部
      </Button>

      {/* 常用子系统 */}
      {quickItems.map((item) => (
        <Button
          key={item.code}
          type="button"
          size="sm"
          variant={selectedCode === item.code ? "default" : "outline"}
          onClick={() => navigate({ subsystemCode: item.code })}
        >
          {item.name}
        </Button>
      ))}

      {/* 更多子系统 */}
      {moreItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                size="sm"
                variant={selectedMore ? "default" : "outline"}
                className="gap-1"
              >
                <span className="max-w-40 truncate">
                  {selectedMore?.name ?? "更多"}
                </span>

                <ChevronDown className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent
            align="start"
            className="max-h-80 w-56 overflow-y-auto"
          >
            {moreItems.map((item) => (
              <DropdownMenuItem
                key={item.code}
                onSelect={() => navigate({ subsystemCode: item.code })}
                className={cn(
                  "flex cursor-pointer items-center justify-between",
                  selectedCode === item.code && "bg-accent font-medium"
                )}
              >
                <span className="truncate">{item.name}</span>

                {selectedCode === item.code && (
                  <Check className="size-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
