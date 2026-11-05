"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

import CreateForm from "./create-form"

export function CreateDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            新增权限
          </Button>
        }
      ></DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>新增权限</DrawerTitle>
            <DrawerDescription>配置权限的相关信息。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <CreateForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
