"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"
import type { Application } from "@workspace/system/application"

interface Props {
  data: Application[]
}

export function DataTableClient({ data }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} />}
    />
  )
}