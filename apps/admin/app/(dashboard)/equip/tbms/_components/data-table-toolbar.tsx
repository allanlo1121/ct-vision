"use client"

import { type ReactTable, type RowData } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Can } from "@workspace/auth/components"
import { ENTITY } from "@/lib/equip/tbm"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"

import { CreateDrawer } from "./create-drawer"
import type { CodeNameOption } from "@workspace/shared"
import { ImportDrawer } from "./import-drawer"

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  tbmTypeOptions: CodeNameOption[]
}

export function DataTableToolbar<TData extends RowData>({
  table,
  tbmTypeOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.state.columnFilters.length > 0
  // console.log("orgTypeOptions", orgTypeOptions)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={`查找${ENTITY.label}...`}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("tbm_type_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("tbm_type_code")}
            title="TBM类型"
            options={
              tbmTypeOptions?.map((type) => ({
                value: type.code,
                label: type.name,
              })) ?? []
            }
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
        <Can permission={{ module: "tbm", action: "write" }}>
          <CreateDrawer tbmTypeOptions={tbmTypeOptions} />
        </Can>
        <ImportDrawer />
      </div>
    </div>
  )
}
