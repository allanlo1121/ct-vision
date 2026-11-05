"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { CodeNameOption } from "@workspace/shared"
import type { Device } from "@workspace/equip/device"

interface Props {
  data: Device[]
}

export function DataTableClient({ data }: Props) {
  const columns = React.useMemo(() => createColumns(), [])
  return <DataTable columns={columns} data={data} />
}
