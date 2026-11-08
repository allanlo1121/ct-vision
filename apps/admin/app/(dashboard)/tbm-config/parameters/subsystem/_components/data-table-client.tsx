"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import { Subsystem } from "@workspace/tbm/parameter"

interface Props {
  data: Subsystem[]
}

export function DataTableClient({ data }: Props) {
  const columns = React.useMemo(() => createColumns(), [])
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} />}
      initialColumnVisibility={{
        created_at: false,
        updated_at: false,
        created_by: false,
        updated_by: false,
      }}
    />
  )
}
