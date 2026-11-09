"use client"
import { TbmRealdataTableButton } from "./syn-realdata-table"

import { type ReactTable, type RowData } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Can } from "@workspace/auth/components"
import { ENTITY } from "@/lib/tbm/tbm-parameter"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import type { TbmCode } from "@workspace/shared"
import { CreateDrawer } from "./create-drawer"
import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"
import { ImportDrawer } from "./import-drawer"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>
  tbmCode: TbmCode
  options: ParameterThresholdDefaultOptions
}

export function DataTableToolbar<TData extends RowData>({
  table,
  tbmCode,
  options,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.state.columnFilters.length > 0
  // console.log("orgTypeOptions", orgTypeOptions)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder={`查找${ENTITY.label}...`}
          value={(table.getColumn("parameter.name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

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
          <CreateDrawer tbmCode={tbmCode} />
        </Can>
        <ImportDrawer tbmCode={tbmCode} />
        <TbmRealdataTableButton tbmCode={tbmCode} />
      </div>
    </div>
  )
}
