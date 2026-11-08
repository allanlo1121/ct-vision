import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { tbmRepository } from "@/lib/equip/tbm/repository"

import { ENTITY } from "@/lib/equip/tbm"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"


export const metadata: Metadata = {
  title: ENTITY.label,
}

export default async function Page() {
  const data = await tbmRepository.findAll()

  const tbmTypeOptions =
    await dictionaryItemRepository.findOptionsByType("4500")

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} tbmTypeOptions={tbmTypeOptions} />
    </div>
  )
}
