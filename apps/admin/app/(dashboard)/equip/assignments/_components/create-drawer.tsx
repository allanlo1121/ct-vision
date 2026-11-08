"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer"

import CreateForm from "./create-form"
import { ENTITY } from "@/lib/equip/tbm-assignment"
import type { Tbm } from "@workspace/tbm/tbm"


interface CreateDrawerProps {
  row: Tbm
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateDrawer({ row, open, onOpenChange }: CreateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>新增{ENTITY.label}</DrawerTitle>
            <DrawerDescription>
              配置{ENTITY.label}的相关信息。
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <CreateForm
              tbm={row}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
