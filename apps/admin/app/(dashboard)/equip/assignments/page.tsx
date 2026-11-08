import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { ENTITY } from "@/lib/equip/tbm-assignment"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

import { tbmAssignmentRepository } from "@/lib/equip/tbm-assignment/repository"

export const metadata: Metadata = {
  title: ENTITY.label,
}

export default async function Page() {
  const data = await tbmAssignmentRepository.listAll()

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} />
    </div>
  )
}
