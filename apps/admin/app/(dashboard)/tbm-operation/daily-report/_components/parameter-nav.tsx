"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layers3, Network, Gauge, ArrowUpRight } from "lucide-react"

import { cn } from "cn"

const items = [
  {
    title: "参数管理",
    description: "维护标准参数的编码、名称、单位及精度",
    href: "/tbm-config/parameters",
    icon: Layers3,
  },
  {
    title: "子系统管理",
    description: "维护参数所属子系统及分类排序",
    href: "/tbm-config/parameters/subsystem",
    icon: Network,
  },
  {
    title: "通用阈值",
    description: "配置标准参数的默认报警阈值规则",
    href: "/tbm-config/parameters/threshold-default",
    icon: Gauge,
  },
] as const

export function ParameterNav() {
  const pathname = usePathname()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group rounded-xl border bg-card p-4 transition-colors",
              "hover:border-primary/40 hover:bg-accent/30",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              active && "border-primary bg-primary/5"
            )}
          >
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg bg-muted",
                  active && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="size-5" />
              </div>

              <ArrowUpRight
                className={cn(
                  "size-4 text-muted-foreground transition-colors",
                  "group-hover:text-primary",
                  active && "text-primary"
                )}
              />
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
