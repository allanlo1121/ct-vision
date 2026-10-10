import React from "react"

import { PageHeader } from "@/components/layout/page-header"

import { roleRepository } from "@/lib/system/permisssion/role.repository"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./_components/columns"

export default async function Page() {
  const roles = await roleRepository.findAll()
  console.log("roles:", roles)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title="角色管理" />

      {/* 表格 */}

      <DataTable data={roles} columns={columns} />
    </div>
  )
}
