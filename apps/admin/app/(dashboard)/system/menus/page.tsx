import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { menuRepository } from "@/lib/system/navigation/repository"
import { applicationRepository } from "@/lib/system/application/repository"

export default async function Page() {
  const menus = await menuRepository.findAll()
  const appOptions = await applicationRepository.findOptions()
  console.log("menus:", menus)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title="应用管理" />

      {/* 表格 */}

      <DataTableClient data={menus} appOptions={appOptions} />
    </div>
  )
}
