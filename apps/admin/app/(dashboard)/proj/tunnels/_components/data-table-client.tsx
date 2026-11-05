"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { CodeNameOption } from "@workspace/shared"
import { Tunnel } from "@workspace/proj/tunnel"

interface Props {
  data: Tunnel[]
}

export function DataTableClient({ data }: Props) {
  const columns = React.useMemo(() => createColumns(), [])
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} />}
    />
  )
}
