"use client"

import { type Row, type RowData } from "@tanstack/react-table"
import { type Permission } from "@workspace/system/permission"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  setRoleDisabled,
  deleteRole,
} from "@/lib/system/permission/role.action"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { roleWithPermissionsSchema } from "@workspace/system/role-permission"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { UpdateDrawer } from "./update-drawer"
import { useAuth, Can } from "@workspace/auth/components"
import { toast } from "@workspace/ui/components/toast"
import { useRouter } from "next/navigation"
import { RolePermissionSelector } from "./role-permission-selector"
import { UpdatePermissionDrawer } from "./update-permission-drawer"

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<DataTableFeatures, TData>
  permissions: Permission[]
}

export function DataTableRowActions<TData extends RowData>({
  row,
  permissions,
}: DataTableRowActionsProps<TData>) {
  const role = roleWithPermissionsSchema.parse(row.original)
  const [editRoleOpen, setEditRoleOpen] = useState(false)
  const [editPermissionOpen, setEditPermissionOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { can } = useAuth()
  const router = useRouter()
  const canEdit = can({ module: "iam", action: "write" })
  const canDelete = can({ module: "iam", action: "delete" })

  // const hasManagePermission = canEdit || canDelete

  async function handleToggleDisabled() {
    if (isUpdating) return

    setIsUpdating(true)

    try {
      const result = await setRoleDisabled(role.id, {
        is_disabled: !role.is_disabled,
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
        title: role.is_disabled ? "角色已启用" : "角色已禁用",
      })

      router.refresh()
    } catch (error) {
      console.error("修改角色状态失败:", error)

      toast.add({
        type: "error",
        title: "操作失败",
        description: "修改角色状态失败",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleDelete() {
    if (isUpdating) return

    setIsUpdating(true)

    try {
      const result = await deleteRole(role.id)

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
        title: "角色已删除",
      })

      router.refresh()
    } catch (error) {
      console.error("删除角色失败:", error)

      toast.add({
        type: "error",
        title: "操作失败",
        description: "删除角色失败",
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
          <Can permission={{ module: "iam", action: "write" }}>
            <DropdownMenuItem onClick={() => setEditRoleOpen(true)}>
              编辑角色
            </DropdownMenuItem>
          </Can>
          <Can permission={{ module: "iam", action: "write" }}>
            <DropdownMenuItem onClick={() => setEditPermissionOpen(true)}>
              分配角色权限
            </DropdownMenuItem>
          </Can>
          <Can permission={{ module: "iam", action: "write" }}>
            <DropdownMenuItem
              disabled={isUpdating}
              onClick={handleToggleDisabled}
            >
              {role.is_disabled ? "启用" : "禁用"}
            </DropdownMenuItem>
          </Can>
          <Can permission={{ module: "iam", action: "delete" }}>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
              删除
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Can>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateDrawer
        role={role}
        open={editRoleOpen}
        onOpenChange={setEditRoleOpen}
      />
      <UpdatePermissionDrawer
        role={role}
        permissions={permissions}
        open={editPermissionOpen}
        onOpenChange={setEditPermissionOpen}
      />
    </>
  )
}

// <DropdownMenuTrigger
//   render={() => (
//     <Button
//       variant="ghost"
//       size="icon"
//       className="size-8 data-[state=open]:bg-muted"
//     >
//       <MoreHorizontal />
//       <span className="sr-only">打开</span>
//     </Button>
//   )}
// />
