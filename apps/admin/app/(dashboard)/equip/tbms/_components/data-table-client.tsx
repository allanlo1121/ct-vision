"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { CodeNameOption } from "@workspace/shared"
import { Tbm } from "@workspace/tbm/tbm"

interface Props {
  data: Tbm[]
  tbmTypeOptions: CodeNameOption[]
}

export function DataTableClient({ data, tbmTypeOptions }: Props) {
  const columns = React.useMemo(
    () => createColumns(tbmTypeOptions),
    [tbmTypeOptions]
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => (
        <DataTableToolbar table={table} tbmTypeOptions={tbmTypeOptions} />
      )}
    />
  )
}
