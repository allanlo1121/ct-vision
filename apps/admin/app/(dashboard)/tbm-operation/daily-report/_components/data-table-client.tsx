"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { Parameter } from "@workspace/tbm/parameter"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

interface Props {
  data: Parameter[]
  options: ParameterThresholdDefaultOptions
}

export function DataTableClient({ data, options }: Props) {
  const columns = React.useMemo(() => createColumns(options), [options])
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table}  />}
      initialColumnVisibility={{
        created_at: false,
        updated_at: false,
        created_by: false,
        updated_by: false,
      }}
    />
  )
}
