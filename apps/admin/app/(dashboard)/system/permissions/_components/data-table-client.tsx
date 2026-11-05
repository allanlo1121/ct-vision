"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"
import { type Permission } from "@workspace/system/permission"

interface Props {
  data: Permission[]
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