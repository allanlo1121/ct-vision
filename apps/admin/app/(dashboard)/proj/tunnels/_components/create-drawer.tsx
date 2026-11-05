"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { CodeNameOption } from "@workspace/shared"
import type { Project } from "@workspace/proj/project"

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
import { EngineeringUnit } from "@workspace/proj/unit"

interface CreateDrawerProps {
  unit: EngineeringUnit
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateDrawer({ unit, open, onOpenChange }: CreateDrawerProps) {
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
              unit={unit}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
