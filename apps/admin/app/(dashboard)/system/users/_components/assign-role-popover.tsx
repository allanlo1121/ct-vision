"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@workspace/ui/components/toast"

import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import type { UserListItem } from "@workspace/system/user"

import {
  assignUserRole,
  revokeUserRole,
} from "@/lib/system/user/user.action"
import { IdNameOption } from "@workspace/shared"

interface AssignRolesPopoverProps {
  user: UserListItem
  roles: IdNameOption[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssignRolesPopover({
  user,
  roles,
  open,
  onOpenChange,
}: AssignRolesPopoverProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [selectedIds, setSelectedIds] = useState<string[]>(
    user.roles.map((role) => role.id)
  )

  useEffect(() => {
    if (open) {
      setSelectedIds(user.roles.map((role) => role.id))
    }
  }, [open, user.roles])

  function handleChange(roleId: string, checked: boolean) {
    const previousIds = selectedIds

    setSelectedIds((prev) =>
      checked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
    )

    startTransition(async () => {
      try {
        const result = checked
          ? await assignUserRole(user.id, roleId)
          : await revokeUserRole(user.id, roleId)

        if (!result.success) {
          throw new Error(result.message)
        }

        toast.add({
          type: "success",
          description: checked ? "角色分配成功" : "角色撤销成功",
        })
        router.refresh()
      } catch (error) {
        setSelectedIds(previousIds)

        toast.add({
          type: "error",
          description: error instanceof Error ? error.message : "角色操作失败",
          priority: "high",
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>分配角色</DialogTitle>
          <DialogDescription>
            为 {user.displayName ?? user.email ?? "用户"} 分配系统角色
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {roles.map((role) => (
            <label
              key={role.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                checked={selectedIds.includes(role.id)}
                disabled={isPending}
                onCheckedChange={(checked) =>
                  handleChange(role.id, checked === true)
                }
              />

              <span className="text-sm">{role.name}</span>
            </label>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
