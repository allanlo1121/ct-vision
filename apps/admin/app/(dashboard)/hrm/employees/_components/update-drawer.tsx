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
import type { DictionaryItem } from "@workspace/master-data/dictionary-item"
import type { CodeNameOption } from "@workspace/shared"

interface UpdateDrawerProps {
  dictionaryItem: DictionaryItem
  dictionaryTypeOptions: CodeNameOption[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateDrawer({
  dictionaryItem,
  dictionaryTypeOptions,
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
              key={dictionaryItem.code}
              dictionaryItem={dictionaryItem}
              dictionaryTypeOptions={dictionaryTypeOptions}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
