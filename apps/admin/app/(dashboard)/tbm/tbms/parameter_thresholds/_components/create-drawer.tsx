"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { CodeNameOption } from "@workspace/shared"
import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"

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

import { TbmParameterListItem } from "@/lib/tbm/tbm-parameter"

interface CreateDrawerProps {
  tbmParameterListItem: TbmParameterListItem
  options: ParameterThresholdOptions
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateDrawer({
  tbmParameterListItem,
  options,
  open,
  onOpenChange,
}: CreateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>绑定{TITLE}</DrawerTitle>
            <DrawerDescription>配置{TITLE}的相关信息。</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <CreateForm
              tbmParameterListItem={tbmParameterListItem}
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
