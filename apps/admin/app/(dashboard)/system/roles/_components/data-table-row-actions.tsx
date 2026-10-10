"use client"

import { type Row, type RowData } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { roleSchema } from "@workspace/system/role"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<DataTableFeatures, TData>
}

export function DataTableRowActions<TData extends RowData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const role = roleSchema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-8 data-[state=open]:bg-muted"
          />
        }
      >
        <MoreHorizontal />
        <span className="sr-only">打开</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>编辑</DropdownMenuItem>
        <DropdownMenuItem>复制</DropdownMenuItem>
        <DropdownMenuItem>收藏</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          删除
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// <DropdownMenuTrigger
//   render={() => (
//     <Button
//       variant="ghost"
//       size="icon"
//       className="size-8 data-[state=open]:bg-muted"
//     >
//       <MoreHorizontal />
//       <span className="sr-only">打开</span>
//     </Button>
//   )}
// />
