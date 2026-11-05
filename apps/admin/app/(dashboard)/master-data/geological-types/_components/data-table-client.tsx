"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import type { TreeNode } from "@workspace/shared/tree"
import { GeologicalType } from "@workspace/master-data/geological-type"

interface Props {
  data: TreeNode<GeologicalType>[]
}

export function DataTableClient({ data }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      getSubRows={(row) => row.children}
      getRowId={(row) => row.code}

      // toolbar={(table) => <DataTableToolbar table={table} />}
    />
  )
}
