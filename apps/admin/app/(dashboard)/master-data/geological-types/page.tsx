import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"
import { buildTree } from "@workspace/shared/tree"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

import { geologicalTypeRepository } from "@/lib/master-data/geological-type/repository";

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const geologicalTypes = await geologicalTypeRepository.findAll()
  const data = buildTree(geologicalTypes, {
    getId: (item) => item.code,
    getParentId: (item) => item.parent_code,
    getSortOrder: (item) => Number(item.code),
  })
  console.log("geological-types:", data)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} />
    </div>
  )
}
