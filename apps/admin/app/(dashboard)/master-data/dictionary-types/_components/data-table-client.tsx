"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import { DictionaryType } from "@workspace/master-data/dictionary-type"

interface Props {
  data: DictionaryType[]
}

export function DataTableClient({ data }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} />}
    />
  )
}
