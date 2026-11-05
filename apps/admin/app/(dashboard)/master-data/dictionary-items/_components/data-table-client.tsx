"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import { DictionaryItem } from "@workspace/master-data/dictionary-item"
import type { CodeNameOption } from "@workspace/shared"

interface Props {
  data: DictionaryItem[]
  dictionaryTypeOptions: CodeNameOption[]
}

export function DataTableClient({ data, dictionaryTypeOptions }: Props) {
  const columns = React.useMemo(
    () => createColumns(dictionaryTypeOptions),
    [dictionaryTypeOptions]
  )
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => (
        <DataTableToolbar
          table={table}
          dictionaryTypeOptions={dictionaryTypeOptions}
        />
      )}
    />
  )
}
