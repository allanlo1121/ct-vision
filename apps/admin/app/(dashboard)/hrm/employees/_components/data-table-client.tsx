"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { CodeNameOption } from "@workspace/shared"
import { Employee } from "@workspace/hrm/employee"

interface Props {
  data: Employee[]
  genderOptions: CodeNameOption[]
  employmentTypeOptions: CodeNameOption[]
  statusOptions: CodeNameOption[]
}

export function DataTableClient({
  data,
  genderOptions,
  employmentTypeOptions,
  statusOptions,
}: Props) {
  const columns = React.useMemo(
    () => createColumns(genderOptions, employmentTypeOptions, statusOptions),
    [genderOptions, employmentTypeOptions, statusOptions]
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => (
        <DataTableToolbar
          table={table}
          genderOptions={genderOptions}
          employmentTypeOptions={employmentTypeOptions}
          statusOptions={statusOptions}
        />
      )}
    />
  )
}
