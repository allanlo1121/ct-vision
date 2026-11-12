"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { EngineeringUnit } from "@workspace/proj/unit"
import { type EngineeringUnitOptions } from "@/lib/proj/unit"

interface Props {
  data: EngineeringUnit[]
  options: EngineeringUnitOptions
}

export function DataTableClient({ data, options }: Props) {
  const columns = React.useMemo(() => createColumns(options), [options])
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} options={options} />}
    />
  )
}
