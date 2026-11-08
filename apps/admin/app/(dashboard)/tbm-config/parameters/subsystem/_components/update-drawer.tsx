"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { ENTITY } from "@/lib/tbm/subsystem"

import UpdateForm from "./update-form"
import type { Subsystem } from "@workspace/tbm/parameter"

interface UpdateDrawerProps {
  subsystem: Subsystem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  subsystem,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
                     <DrawerTitle>
              更新{ENTITY.label}-{subsystem.code}
            </DrawerTitle>
            <DrawerDescription>
              修改{ENTITY.label}的基本信息及状态。
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={subsystem.code}
              subsystem={subsystem}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
