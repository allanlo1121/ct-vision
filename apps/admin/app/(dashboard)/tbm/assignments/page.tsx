import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"


import { tbmAssignmentRepository } from "@/lib/tbm/tbm-assignment";

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const data = await tbmAssignmentRepository.listAll()
  console.log("data:", data)

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} />
    </div>
  )
}
