"use client"

import { type ReactTable, type RowData } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Can } from "@workspace/auth/components"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"

import {
  PERMISSION_MODULES,
  PERMISSION_MODULE_LABELS,
  PERMISSION_ACTIONS,
  PERMISSION_ACTION_LABELS
} from "@workspace/system/constants"

import { CreateDrawer } from "./create-drawer"

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
}

export function DataTableToolbar<TData extends RowData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.state.columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="查找权限..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("module") && (
          <DataTableFacetedFilter
            column={table.getColumn("module")}
            title="权限模块"
            options={PERMISSION_MODULES.map((module) => ({
              value: module,
              label: PERMISSION_MODULE_LABELS[module],
            }))}
          />
        )}
        {table.getColumn("action") && (
          <DataTableFacetedFilter
            column={table.getColumn("action")}
            title="权限操作"
            options={PERMISSION_ACTIONS.map((action) => ({
              value: action,
              label: PERMISSION_ACTION_LABELS[action],
            }))}
          />
        )}
  
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            重置
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Can permission={{ module: "iam", action: "write" }}>
          <CreateDrawer />
        </Can>
      </div>
    </div>
  )
}
