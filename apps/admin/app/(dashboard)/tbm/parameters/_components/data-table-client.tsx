"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { CodeNameOption } from "@workspace/shared"
import type { Parameter } from "@workspace/tbm/parameter"
import { Tunnel } from "@workspace/proj/tunnel"

interface Props {
  data: Parameter[]
  subsystemOptions: CodeNameOption[]
}

export function DataTableClient({ data, subsystemOptions }: Props) {
  const columns = React.useMemo(
    () => createColumns(subsystemOptions),
    [subsystemOptions]
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => (
        <DataTableToolbar table={table} subsystemOptions={subsystemOptions} />
      )}
    />
  )
}
