"use client"

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

interface UserDataTablePaginationProps {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export function UserDataTablePagination({
  page,
  pageSize,
  total,
  totalPages,
}: UserDataTablePaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateParams(updates: {
    page?: number
    pageSize?: number
  }) {
    const params = new URLSearchParams(searchParams.toString())

    if (updates.page && updates.page > 1) {
      params.set("page", String(updates.page))
    } else {
      params.delete("page")
    }

    if (updates.pageSize && updates.pageSize !== 20) {
      params.set("pageSize", String(updates.pageSize))
    } else {
      params.delete("pageSize")
    }

    const query = params.toString()

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      { scroll: false }
    )
  }

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        共 {total} 条，第 {from} - {to} 条
      </div>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">每页</p>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              updateParams({
                page: 1,
                pageSize: Number(value),
              })
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 30, 50, 100].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-sm font-medium">
          第 {page} / {Math.max(totalPages, 1)} 页
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => updateParams({ page: 1, pageSize })}
            disabled={page <= 1}
          >
            <span className="sr-only">第一页</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              updateParams({ page: page - 1, pageSize })
            }
            disabled={page <= 1}
          >
            <span className="sr-only">上一页</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              updateParams({ page: page + 1, pageSize })
            }
            disabled={page >= totalPages}
          >
            <span className="sr-only">下一页</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              updateParams({ page: totalPages, pageSize })
            }
            disabled={page >= totalPages}
          >
            <span className="sr-only">最后一页</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}