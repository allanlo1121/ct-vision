"use client"

import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"


import type { AdminRegion } from "@workspace/master-data/admin-region";
import type { TreeNode } from "@workspace/shared/tree"

interface Props {
  data: TreeNode<AdminRegion>[]
}

export function DataTableClient({ data }: Props) {
  return (
    <DataTable
      columns={columns}
      data={data}
      getSubRows={(row) => row.children}
      getRowId={(row)=>row.code}

      // toolbar={(table) => <DataTableToolbar table={table} />}
    />
  )
}
