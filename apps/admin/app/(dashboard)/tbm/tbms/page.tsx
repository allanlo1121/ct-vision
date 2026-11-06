import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { tbmRepository } from "@/lib/tbm/tbm/repository"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const data = await tbmRepository.findAll()

  const tbmTypeOptions =
    await dictionaryItemRepository.findOptionsByType("4500")

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} tbmTypeOptions={tbmTypeOptions} />
    </div>
  )
}
