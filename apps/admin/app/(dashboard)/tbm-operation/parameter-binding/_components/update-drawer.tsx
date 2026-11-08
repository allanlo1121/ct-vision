"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { ENTITY } from "@/lib/tbm/tbm-parameter"

import UpdateForm from "./update-form"
import type { TbmParameterWithBase } from "@workspace/tbm/parameter"

interface UpdateDrawerProps {
  row: TbmParameterWithBase
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({ row, open, onOpenChange }: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>更新{ENTITY.label}</DrawerTitle>
            <DrawerDescription>修改{ENTITY.label}的基本信息及状态。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={row.id}
              row={row}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
