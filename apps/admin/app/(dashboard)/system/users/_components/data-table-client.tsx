"use client"

import { DataTable } from "@/components/data-table/data-table"
import { getUserColumns } from "./columns"
import { DataTableToolbar } from "./data-table-toolbar"

import { UserListItem } from "@workspace/system/user"
import { IdNameOption } from "@workspace/shared"
import { useMemo } from "react"

interface Props {
  data: UserListItem[]
  roleOptions: IdNameOption[]
}

export function DataTableClient({ data, roleOptions }: Props) {
  const columns = useMemo(() => getUserColumns(roleOptions), [roleOptions])

  return <DataTable columns={columns} data={data} server={true} />
}
