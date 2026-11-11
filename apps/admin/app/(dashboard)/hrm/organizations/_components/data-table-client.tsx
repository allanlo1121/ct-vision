"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"


import { Organization } from "@workspace/hrm/organization"
import { OrganizationOptions } from "@/lib/hrm/organization"

interface Props {
  data: Organization[]
  options: OrganizationOptions
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
