"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { ENTITY } from "@/lib/tbm/parameter"

import UpdateForm from "./update-form"

import { Parameter } from "@workspace/tbm/parameter"

interface UpdateDrawerProps {
  parameter: Parameter
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  parameter,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>
              更新{ENTITY.label}-{parameter.code}
            </DrawerTitle>
            <DrawerDescription>
              修改{ENTITY.label}的基本信息及状态。
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={parameter.code}
              parameter={parameter}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
