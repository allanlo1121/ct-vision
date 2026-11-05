"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Plus } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,

} from "@workspace/ui/components/drawer"

import CreateForm from "./create-form"
import { TITLE } from "../constants"
import { MqttUser } from "@workspace/mqtt/user"

interface CreateDrawerProps {
  user: MqttUser
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateDrawer({ user, open, onOpenChange }: CreateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>新增{TITLE}</DrawerTitle>
            <DrawerDescription>配置{TITLE}的相关信息。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <CreateForm
              user={user}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
