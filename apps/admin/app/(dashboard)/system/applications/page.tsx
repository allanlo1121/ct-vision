import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { applicationRepository } from "@/lib/system/application/repository"

export default async function Page() {
  const applications = await applicationRepository.findAll()
  // console.log("applications:", applications)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title="应用管理" />

      {/* 表格 */}

      <DataTableClient data={applications} />
    </div>
  )
}
