"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { CodeNameOption } from "@workspace/shared"

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
import { ENTITY } from "@/lib/tbm/parameter"

export function CreateDrawer() {
  const [open, setOpen] = useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            新增{ENTITY.label}
          </Button>
        }
      ></DrawerTrigger>
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
              onSuccess={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
