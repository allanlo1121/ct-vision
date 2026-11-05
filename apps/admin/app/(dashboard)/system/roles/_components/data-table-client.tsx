"use client"

import { getRoleColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"
import { type RoleWithPermissions } from "@workspace/system/role-permission"
import { type Permission } from "@workspace/system/permission"
import { useMemo } from "react"
import { DataTable } from "@/components/data-table/data-table"
interface Props {
  data: RoleWithPermissions[]
  permissions: Permission[]
}

export function DataTableClient({ data, permissions }: Props) {
  const columns = useMemo(() => getRoleColumns(permissions), [permissions])
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={(table) => <DataTableToolbar table={table} />}
    />
  )
}
