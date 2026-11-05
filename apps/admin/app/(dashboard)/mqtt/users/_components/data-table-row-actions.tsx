"use client"

import { type Row, type RowData } from "@tanstack/react-table"
import type { CodeNameOption } from "@workspace/shared"
import { MoreHorizontal } from "lucide-react"
import { TITLE } from "../constants"

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
import { CreateDrawer as CreateAclDrawer } from "../../acls/_components/create-drawer"
import { Can } from "@workspace/auth/components"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"

import { deleteMqttUser, setDisabledMqttUser } from "@/lib/mqtt/user/action"

import { mqttUserSchema } from "@workspace/mqtt/user"
import { ResetPasswordDialog } from "./reset-password-dialog"
// import { setApplicationDisabled ,deleteApplication } from "@/lib/system/permission/permission.action";

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<DataTableFeatures, TData>
}

export function DataTableRowActions<TData extends RowData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const rowData = mqttUserSchema.parse(row.original)

  const [isUpdating, setIsUpdating] = useState(false)
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false)
  const [createAclOpen, setCreateAclOpen] = useState(false)
  const router = useRouter()

  async function handleToggleDisabled() {
    if (isUpdating) return

    setIsUpdating(true)

    try {
      const result = await setDisabledMqttUser(rowData.id, !rowData.is_disabled)

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
        title: rowData.is_disabled ? `${TITLE}已启用` : `${TITLE}已禁用`,
      })

      router.refresh()
    } catch (error) {
      console.error(`修改${TITLE}状态失败:`, error)

      toast.add({
        type: "error",
        title: "操作失败",
        description: `修改${TITLE}状态失败`,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleDelete() {
    if (isUpdating) return

    setIsUpdating(true)

    try {
      const result = await deleteMqttUser(rowData.id)

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
        title: `${TITLE}已删除`,
      })

      router.refresh()
    } catch (error) {
      console.error(`删除${TITLE}失败:`, error)

      toast.add({
        type: "error",
        title: "操作失败",
        description: `删除${TITLE}失败`,
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
          <Can permission={{ module: "mqtt", action: "write" }}>
            <DropdownMenuItem onClick={() => setResetPasswordOpen(true)}>
              重置密码
            </DropdownMenuItem>
          </Can>

          <Can permission={{ module: "mqtt", action: "write" }}>
            <DropdownMenuItem onClick={() => setCreateAclOpen(true)}>
              新增ACL
            </DropdownMenuItem>
          </Can>

          <Can permission={{ module: "mqtt", action: "write" }}>
            <DropdownMenuItem
              disabled={isUpdating}
              onClick={handleToggleDisabled}
            >
              {rowData.is_disabled ? "启用" : "禁用"}
            </DropdownMenuItem>
          </Can>
          <Can permission={{ module: "mqtt", action: "delete" }}>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
              删除
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <UpdateDrawer
        unit={rowData}
        options={options}
        open={editOpen}
        onOpenChange={setEditOpen}
      />*/}
      <CreateAclDrawer
        user={rowData}
        open={createAclOpen}
        onOpenChange={setCreateAclOpen}
      />
      <ResetPasswordDialog
        user={rowData}
        open={resetPasswordOpen}
        onOpenChange={setResetPasswordOpen}
      />
    </>
  )
}
