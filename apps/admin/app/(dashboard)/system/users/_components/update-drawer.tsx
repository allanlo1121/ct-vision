"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"

import UpdateForm from "./update-form"
import type { Role } from "@workspace/system/role"

interface UpdateDrawerProps {
  role: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  role,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>更新角色</DrawerTitle>
            <DrawerDescription>修改角色信息及权限配置。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={role.id}
              role={role}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
