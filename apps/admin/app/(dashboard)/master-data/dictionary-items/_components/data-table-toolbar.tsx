"use client"

import { type ReactTable, type RowData } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Can } from "@workspace/auth/components"
import { TITLE } from "../constants"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"

import { CreateDrawer } from "./create-drawer"
import type { CodeNameOption } from "@workspace/shared"

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  dictionaryTypeOptions:CodeNameOption[]
}

export function DataTableToolbar<TData extends RowData>({
  table,
  dictionaryTypeOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.state.columnFilters.length > 0
  // console.log("dictionaryTypeOptions",dictionaryTypeOptions)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={`查找${TITLE}...`}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("dictionary_type_code") && (
          <DataTableFacetedFilter
            column={table.getColumn("dictionary_type_code")}
            title="字典类型"
            options={dictionaryTypeOptions?.map((type) => ({
              value: type.code,
              label: type.name,
            })) ?? []}
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
        <Can permission={{ module: "master_data", action: "write" }}>
          <CreateDrawer dictionaryTypeOptions={dictionaryTypeOptions} />
        </Can>
      </div>
    </div>
  )
}
