"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

import {
  fetchTunnelPicker,
  fetchTunnelPickerById,
} from "@/lib/proj/tunnel/action"

import type { TunnelPickerItem } from "@/lib/proj/tunnel/types"

interface TunnelPickerProps {
  selectedId?: string | null
  onChange?: (id: string | null) => void
  disabled?: boolean
}

export function TunnelPicker({
  selectedId = null,
  onChange,
  disabled = false,
}: TunnelPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [page, setPage] = useState(1)

  const pageSize = 20

  // 搜索防抖
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
      setPage(1)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  // 查询当前选中的隧道（支持编辑回显）
  const { data: selectedItem } = useSWR(
    selectedId ? ["tunnel-picker-selected", selectedId] : null,
    () => fetchTunnelPickerById(selectedId!)
  )

  // 查询可分配隧道
  const { data, isLoading, isValidating } = useSWR(
    open ? ["tunnel-picker-list", debouncedSearch, page, pageSize] : null,
    () =>
      fetchTunnelPicker({
        search: debouncedSearch,
        page,
        pageSize,
      }),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  )

  const total = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  function handleSelect(item: TunnelPickerItem) {
    onChange?.(item.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full justify-between font-normal"
          />
        }
      >
        <span className="truncate">
          {selectedItem?.name ?? (selectedId ? "加载中..." : "请选择隧道")}
        </span>

        <ChevronsUpDown className="ml-2 size-4 opacity-50" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>选择隧道</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="搜索项目、工程单元或隧道名称..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 隧道列表 */}
        <div className="max-h-80 min-h-40 space-y-1 overflow-y-auto">
          {isLoading && !data ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              加载中...
            </p>
          ) : data?.items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              没有符合条件的可分配隧道
            </p>
          ) : (
            data?.items.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-accent"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-sm font-medium">{item.name}</span>

                  <span className="text-xs text-muted-foreground">
                    {[item.project_name, item.engineering_unit_name]
                      .filter(Boolean)
                      .join(" / ")}
                  </span>
                </div>

                {selectedId === item.id && (
                  <Check className="ml-2 size-4 shrink-0" />
                )}
              </button>
            ))
          )}
        </div>

        {/* 分页 */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-xs text-muted-foreground">
            共 {total} 条{isValidating && " · 更新中"}
          </span>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1 || isValidating}
              onClick={() => setPage((p) => p - 1)}
            >
              上一页
            </Button>

            <span className="text-sm">
              {page} / {totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isValidating}
              onClick={() => setPage((p) => p + 1)}
            >
              下一页
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
