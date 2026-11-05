"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"

import UpdateForm from "./update-form"
import type { Permission } from "@workspace/system/permission"

interface UpdateDrawerProps {
  permission: Permission
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  permission,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>更新权限</DrawerTitle>
            <DrawerDescription>修改权限的基本信息及状态。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={permission.id}
              permission={permission}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
