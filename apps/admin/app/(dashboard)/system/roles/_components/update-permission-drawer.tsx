"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@workspace/ui/components/drawer"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/toast"

import type {
  RoleWithPermissions,
} from "@workspace/system/role-permission"

import type { Permission } from "@workspace/system/permission"

import { RolePermissionSelector } from "./role-permission-selector"
import { syncRolePermissions } from "@/lib/system/permission/role-permission.action"

interface UpdateDrawerProps {
  role: RoleWithPermissions
  permissions: Permission[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdatePermissionDrawer({
  role,
  permissions,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  const router = useRouter()

  // 数据库中已保存的权限
  const initialIds = useMemo(
    () => role.permissions.map((permission) => permission.id),
    [role.permissions]
  )

  // 当前编辑的权限
  const [draftIds, setDraftIds] = useState<string[]>(() => [...initialIds])

  const [saving, setSaving] = useState(false)

  // 是否存在未保存修改
  const isDirty = useMemo(() => {
    const initial = new Set(initialIds)
    const draft = new Set(draftIds)

    return (
      initial.size !== draft.size ||
      [...draft].some((id) => !initial.has(id))
    )
  }, [initialIds, draftIds])

  function handleOpenChange(nextOpen: boolean) {
    if (saving) return

    if (nextOpen) {
      // 打开时加载当前角色权限
      setDraftIds([...initialIds])
    }

    onOpenChange(nextOpen)
  }

  async function handleSave() {
    if (!isDirty || saving) return

    setSaving(true)

    try {
      const result = await syncRolePermissions(role.id, draftIds)

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        description: "角色权限更新成功",
      })

      onOpenChange(false)

      router.refresh()
    } catch {
      toast.add({
        type: "error",
        description: "角色权限更新失败",
        priority: "high",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>更新角色权限</DrawerTitle>
            <DrawerDescription>
              修改角色权限配置，保存后统一生效。
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[65vh] overflow-y-auto px-4 pb-4">
            <RolePermissionSelector
              permissions={permissions}
              value={draftIds}
              onChange={setDraftIds}
              disabled={saving}
            />
          </div>

          <DrawerFooter className="border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {isDirty ? "权限配置已修改，尚未保存" : "暂无修改"}
              </span>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={saving}
                  onClick={() => handleOpenChange(false)}
                >
                  取消
                </Button>

                <Button
                  type="button"
                  disabled={!isDirty || saving}
                  onClick={handleSave}
                >
                  {saving ? "保存中..." : "保存权限"}
                </Button>
              </div>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}