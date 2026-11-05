import React from "react"

import { PageHeader } from "@/components/layout/page-header"

import { UserDataTablePagination } from "@/components/data-table/user-data-table-pagination"

import { userRepository } from "@/lib/system/user/user.repository"

import { DataTableClient } from "./_components/data-table-client"
import { userQuerySchema } from "@workspace/system/user"
import { QueryToolbar } from "./_components/query-toolbar"
import { roleRepository } from "@/lib/system/permission/role.repository"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const rawParams = await searchParams

  const query = userQuerySchema.parse(rawParams)

  const roleOptions = await roleRepository.findOptions()

  const users = await userRepository.findPage(query)

  console.log("users:", users)

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader title="用户管理" />
      <QueryToolbar roles={roleOptions} />

      {/* table */}
      {/* <div>users: {JSON.stringify(users)}</div> */}
      <DataTableClient data={users.data} roleOptions={roleOptions} />

      <UserDataTablePagination
        page={users.page}
        pageSize={users.pageSize}
        total={users.total}
        totalPages={users.totalPages}
      />
    </div>
  )
}
