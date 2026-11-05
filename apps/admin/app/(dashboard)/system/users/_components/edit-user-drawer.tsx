"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@workspace/ui/components/toast"
import { Pencil } from "lucide-react"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"
import { Separator } from "@workspace/ui/components/separator"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@workspace/ui/components/drawer"

import type { UserListItem } from "@workspace/system/user"
import type { IdNameOption } from "@workspace/shared"

import { assignUserRole, revokeUserRole } from "@/lib/system/user/user.action"
import { saveUserProfile } from "@/lib/system/user/user-profile.action"
import { syncUserRoles } from "@/lib/system/permission/user-role.action";

interface EditUserDrawerProps {
  user: UserListItem
  roleOptions: IdNameOption[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditUserDrawer({
  user,
  roleOptions,
  open,
  onOpenChange,
}: EditUserDrawerProps) {
  const DEFAULT_AVATAR = "/images/default-avatar.png"
  const router = useRouter()

  const [isProfilePending, startProfileTransition] = useTransition()
  const [isRolePending, startRoleTransition] = useTransition()

  const [displayName, setDisplayName] = useState(user.displayName ?? "")

  const [avatarPath, setAvatarPath] = useState(user.avatarPath ?? "")

  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(
    user.roles.map((role) => role.id)
  )

  useEffect(() => {
    if (!open) return

    setDisplayName(user.displayName ?? "")
    setAvatarPath(user.avatarPath ?? DEFAULT_AVATAR)
    setSelectedRoleIds(user.roles.map((role) => role.id))
  }, [open, user])

  const isPending = isProfilePending || isRolePending

  // 保存基本资料
  function handleSaveProfile() {
    startProfileTransition(async () => {
      try {
        const result = await saveUserProfile(user.id, {
          display_name: displayName.trim(),
          avatar_path: avatarPath,
        })

        if (!result.success) {
          toast.add({
            type: "error",
            title: "用户资料更新失败",
            description: result.message,
          })
          return
        }

        toast.add({
          type: "success",
          title: "用户资料更新成功",
        })
        router.refresh()
      } catch {
        toast.add({
          type: "error",
          title: "用户资料更新失败",
        })
      }
    })
  }

  // 处理角色选择变化
function handleRoleChange(roleId: string, checked: boolean) {
  setSelectedRoleIds((previous) =>
    checked
      ? [...new Set([...previous, roleId])]
      : previous.filter((id) => id !== roleId)
  )
}

  function handleSaveRoles() {
  startRoleTransition(async () => {
    try {
      const result = await syncUserRoles(
        user.id,
        selectedRoleIds
      )

      if (!result.success) {
        toast.add({
          type: "error",
          title: "用户角色更新失败",
          description: result.message,
        })
        return
      }

      toast.add({
        type: "success",
        title: "用户角色更新成功",
      })
      router.refresh()
    } catch {
      toast.add({
        type: "error",
        title: "用户角色更新失败",
      })
    }
  })
}

  return (
    <Drawer
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending) return
        onOpenChange(nextOpen)
      }}
      swipeDirection={"right"}
    >
      <DrawerContent className="h-full w-full sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>编辑用户</DrawerTitle>
          <DrawerDescription>修改用户基本资料及角色分配</DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {/* 用户信息 */}
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Pencil className="size-5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {user.displayName || "未设置名称"}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <Separator />

          {/* 基本资料 */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold">基本资料</h3>

            <div className="space-y-2">
              <Label htmlFor="user-display-name">显示名称</Label>

              <Input
                id="user-display-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                disabled={isPending}
                maxLength={100}
                placeholder="请输入显示名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-email">电子邮箱</Label>

              <Input
                id="user-email"
                value={user.email ?? ""}
                disabled
                readOnly
              />
            </div>
            {/* 用户头像 */}
            <div className="space-y-2">
              <Label>用户头像</Label>

              <div className="flex items-center gap-3">
                <Avatar className="size-16">
                  <AvatarImage
                    src={avatarPath || DEFAULT_AVATAR}
                    alt={user.displayName ?? "用户头像"}
                  />
                  <AvatarFallback>用户</AvatarFallback>
                </Avatar>

                <span className="text-xs text-muted-foreground">
                  暂不支持修改头像
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={
                  isPending || displayName.trim() === (user.displayName ?? "")
                }
                onClick={handleSaveProfile}
              >
                {isProfilePending ? "保存中..." : "保存资料"}
              </Button>
            </div>
          </section>

          <Separator />

          {/* 角色分配 */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">角色分配</h3>
              <p className="text-xs text-muted-foreground">
                可选择多个角色，点击保存后统一生效
              </p>
            </div>

            <div className="space-y-3">
              {roleOptions.map((role) => (
                <label
                  key={role.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md border p-3"
                >
                  <Checkbox
                    checked={selectedRoleIds.includes(role.id)}
                    disabled={isRolePending}
                    onCheckedChange={(checked) =>
                      handleRoleChange(role.id, checked === true)
                    }
                  />

                  <span className="text-sm">{role.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={isRolePending}
                onClick={handleSaveRoles}
              >
                {isRolePending ? "保存中..." : "保存角色"}
              </Button>
            </div>
          </section>
        </div>

        <DrawerFooter className="border-t">
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            关闭
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
