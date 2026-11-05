"use client"

import { CircleHelp } from "lucide-react"
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic"

import type { ComponentProps } from "react"

type IconRendererProps = Omit<ComponentProps<typeof DynamicIcon>, "name"> & {
  name?: string | null
}

const validIcons = new Set<string>(iconNames)

export function IconRenderer({ name, ...props }: IconRendererProps) {
  if (!name || !validIcons.has(name)) {
    return <CircleHelp {...props} />
  }

  return <DynamicIcon name={name as IconName} {...props} />
}
