"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { CodeNameOption } from "@workspace/shared"
import { Organization } from "@workspace/hrm/organization"

interface Props {
  data: Organization[]
  orgTypeOptions: CodeNameOption[]
  orgCatagoryOptions: CodeNameOption[]
}

export function DataTableClient({
  data,
  orgTypeOptions,
  orgCatagoryOptions,
}: Props) {
  const columns = React.useMemo(
    () =>
      createColumns(orgTypeOptions, orgCatagoryOptions),
    [orgTypeOptions, orgCatagoryOptions]
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => (
        <DataTableToolbar
          table={table}
          orgTypeOptions={orgTypeOptions}      
          orgCatagoryOptions={orgCatagoryOptions}
        />
      )}
    />
  )
}
