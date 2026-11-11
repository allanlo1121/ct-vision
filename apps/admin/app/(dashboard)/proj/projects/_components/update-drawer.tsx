"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { ENTITY, type ProjectOptions } from "@/lib/proj/project"

import UpdateForm from "./update-form"

import type { Project } from "@workspace/proj/project"

interface UpdateDrawerProps {
  row: Project
  options: ProjectOptions
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  row,
  options,
  open,
  onOpenChange,
}: UpdateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>更新{ENTITY.label}</DrawerTitle>
            <DrawerDescription>
              修改{ENTITY.label}的基本信息及状态。
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <UpdateForm
              key={row.id}
              row={row}
              options={options}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
