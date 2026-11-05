"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"
import type { Menu } from "@workspace/system/menu"
import type { CodeNameOption } from "@workspace/shared"

interface Props {
  data: Menu[]
  appOptions: CodeNameOption[]
}

export function DataTableClient({ data, appOptions }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} appOptions={appOptions} />}
    />
  )
}