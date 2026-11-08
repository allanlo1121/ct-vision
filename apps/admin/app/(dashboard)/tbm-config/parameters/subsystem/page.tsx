import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { subsystemRepository } from "@/lib/tbm/subsystem/repository"

import { ENTITY } from "@/lib/tbm/subsystem"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

export const metadata: Metadata = {
  title: ENTITY.label,
}

export default async function Page() {
  const data = await subsystemRepository.findAll()

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} />
    </div>
  )
}
