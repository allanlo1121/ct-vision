"use client"

import { type Row, type RowData } from "@tanstack/react-table"

import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"
import { setDisabled } from "@/lib/tbm/tbm-parameter/action"

import { MoreHorizontal } from "lucide-react"
import { ENTITY } from "@/lib/tbm/tbm-parameter"

import { Button } from "@workspace/ui/components/button"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { UpdateDrawer } from "./update-drawer"
import { CreateDrawer as CreateThresholdDrawer } from "../parameter-threshold/_components/create-drawer"
import { Can } from "@workspace/auth/components"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import { remove } from "@/lib/tbm/tbm-parameter/action"

import { TbmParameterWithBase } from "@workspace/tbm/parameter"
// import { CreateDrawer } from "../../parameter_thresholds/_components/create-drawer"

import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<DataTableFeatures, TData>
  options: ParameterThresholdDefaultOptions
}

export function DataTableRowActions<TData extends RowData>({
  row,
  options,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as TbmParameterWithBase
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [createThresholdOpen, setCreateThresholdOpen] = useState(false)

  const router = useRouter()

  async function handleToggleDisabled() {
    if (isUpdating) return

    setIsUpdating(true)

    try {
      const result = await setDisabled(rowData.id, {
        is_disabled: !rowData.is_disabled,
      })

      if (!result.success) {
        toast.add({
          type: "error",
          title: "操作失败",
          description: result.message,
        })
        return
      }

      toast.add({
        type: "success",
        title: rowData.is_disabled
          ? `${ENTITY.label}已启用`
          : `${ENTITY.label}已禁用`,
      })

      router.refresh()
    } catch (error) {
      console.error(`修改${ENTITY.label}状态失败:`, error)

      toast.add({
        type: "error",
        title: "操作失败",
        description: `修改${ENTITY.label}状态失败`,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleDelete() {
    if (isUpdating) return

    setIsUpdating(true)

    try {
      const result = await remove(rowData.id)

      if (!result.success) {
        toast.add({
          type: "error",
          title: "操作失败",
          description: result.message,
        })
        return
      }

      toast.add({
        type: "success",
        title: `${ENTITY.label}已删除`,
      })

      router.refresh()
    } catch (error) {
      console.error(`删除${ENTITY.label}失败:`, error)

      toast.add({
        type: "error",
        title: "操作失败",
        description: `删除${ENTITY.label}失败`,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="size-8 data-[state=open]:bg-muted"
            />
          }
        >
          <MoreHorizontal />
          <span className="sr-only">打开</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>收藏</DropdownMenuItem>

          <DropdownMenuSeparator />
          <Can permission={{ module: "tbm", action: "write" }}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCreateThresholdOpen(true)}>
              增加报警阀值
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleToggleDisabled}>
              {rowData.is_disabled ? "启用" : "禁用"}
            </DropdownMenuItem>
          </Can>

          <Can permission={{ module: "tbm", action: "delete" }}>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
              删除
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateDrawer row={rowData} open={editOpen} onOpenChange={setEditOpen} />
      <CreateThresholdDrawer
        row={rowData}
        options={options.severityOptions}
        open={createThresholdOpen}
        onOpenChange={setCreateThresholdOpen}
      />
    </>
  )
}
