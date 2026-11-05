"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { MqttAcl } from "@workspace/mqtt/acl"

interface Props {
  data: MqttAcl[]
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
