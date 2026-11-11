"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"


import { Employee } from "@workspace/hrm/employee"
import { type EmployeeOptions } from "@/lib/hrm/employee"

interface Props {
  data: Employee[]
  options: EmployeeOptions
}

export function DataTableClient({ data, options }: Props) {
  const columns = React.useMemo(() => createColumns(options), [options])
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} options={options} />}
      initialColumnVisibility={{
        code: false,
        created_at: false,
        updated_at: false,
        created_by: false,
        updated_by: false,
      }}
    />
  )
}
