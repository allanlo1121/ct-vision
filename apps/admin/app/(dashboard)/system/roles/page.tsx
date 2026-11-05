import React from "react"

import { PageHeader } from "@/components/layout/page-header"

import { rolePermissionRepository } from "@/lib/system/permission/role-permission.repository"

import { DataTableClient } from "./_components/data-table-client"
import { permissionRepository } from "@/lib/system/permission/permission.repository";

export default async function Page() {
  const roles = await rolePermissionRepository.findAllWithPermissions()
  console.log("roles:", roles)
  const permissions = await permissionRepository.findAll()
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title="角色权限管理" />

      {/* 表格 */}

      <DataTableClient data={roles} permissions={permissions} />
    </div>
  )
}
