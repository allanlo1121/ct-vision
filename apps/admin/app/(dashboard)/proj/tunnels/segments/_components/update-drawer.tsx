"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { TITLE } from "../constants"

import UpdateForm from "./update-form"
import { Segment } from "@workspace/proj/tunnel";

interface UpdateDrawerProps {
  segment: Segment

  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  segment,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>更新{TITLE}</DrawerTitle>
            <DrawerDescription>修改{TITLE}的基本信息及状态。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={segment.id}
              segment={segment}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
