import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { permissionRepository } from "@/lib/system/permission/permission.repository"

export default async function Page() {
  const permissions = await permissionRepository.findAll()
  console.log("permissions:", permissions)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title="权限管理" />

      {/* 表格 */}

      <DataTableClient data={permissions} />
    </div>
  )
}
