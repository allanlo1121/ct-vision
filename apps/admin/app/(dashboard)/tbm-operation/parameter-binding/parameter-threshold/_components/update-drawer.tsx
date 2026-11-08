"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer"
import { ENTITY } from "@/lib/tbm/parameter-threshold"

import UpdateForm from "./update-form"
import { TbmParameterThresholdWithBase } from "@workspace/tbm/parameter"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default/"

interface UpdateDrawerProps {
  row: TbmParameterThresholdWithBase
  options: ParameterThresholdDefaultOptions
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
