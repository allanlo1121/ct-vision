"use client"

import { type Row, type RowData } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
import { ENTITY } from "@/lib/equip/tbm-assignment"

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
import { Can } from "@workspace/auth/components"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import { remove } from "@/lib/equip/tbm-assignment/action"
import { type TbmAssignmentListRow } from "@workspace/tbm/tbm"
// import { setApplicationDisabled ,deleteApplication } from "@/lib/system/permission/permission.action";

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<DataTableFeatures, TData>
}

export function DataTableRowActions<TData extends RowData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original as TbmAssignmentListRow
  const [editOpen, setEditOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const router = useRouter()

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
          <Can permission={{ module: "master_data", action: "write" }}>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              编辑
            </DropdownMenuItem>
          </Can>

          <Can permission={{ module: "master_data", action: "delete" }}>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
              删除
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateDrawer row={rowData} open={editOpen} onOpenChange={setEditOpen} />
    </>
  )
}
