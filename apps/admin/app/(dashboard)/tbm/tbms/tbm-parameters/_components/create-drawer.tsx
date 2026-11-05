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
import { TITLE } from "../constants"

interface CreateDrawerProps {
  tbmCode: string
}

export function CreateDrawer({ tbmCode }: CreateDrawerProps) {
  const [open, setOpen] = useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            绑定{TITLE}
          </Button>
        }
      />
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>新增{TITLE}</DrawerTitle>
            <DrawerDescription>配置{TITLE}的相关信息。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <CreateForm
              tbmCode={tbmCode}
              onSuccess={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
