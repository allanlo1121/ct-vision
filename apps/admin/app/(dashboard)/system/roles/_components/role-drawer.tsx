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

import Form from "./create-form"

type SegmentDrawerProps = {
  tunnelId: string
}

export function SegmentDrawer({ tunnelId }: SegmentDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            新增角色
          </Button>
        }
      ></DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>新增角色</DrawerTitle>
            <DrawerDescription>配置角色的权限及相关信息。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <Form tunnel_id={tunnelId} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
