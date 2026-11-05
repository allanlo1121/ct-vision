import React from "react"
import TestToast from "./_components/test-toast"
import { Checkbox } from "@workspace/ui/components/checkbox"
import * as Icons from "lucide-react"
import { FolderKanban } from "lucide-react"
import {  IconRenderer } from "@workspace/ui/icon"

export default function Page() {
  console.log("Same component:", Icons.FolderKanban === FolderKanban)
  // const Icon = resolveIcon("folder-kanban")
  return (
    <div>
      test page
      <TestToast />
      <Checkbox defaultChecked />
      {/* <Icon size={24} color="red" /> */}
      <FolderKanban size={24} color="blue" />
      <IconRenderer
        name="folder-kanban"
        className="size-4 text-muted-foreground"
      />
    </div>
  )
}
