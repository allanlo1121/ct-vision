import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { engineeringUnitRepository } from "@/lib/proj/unit"

import { EngineeringUnitOptions } from "./_components/types"

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const data = await engineeringUnitRepository.findAll()

  const unitTypeOptions =
    await dictionaryItemRepository.findOptionsByType("2072")

  const options: EngineeringUnitOptions = {
    unitTypeOptions,
  }

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} options={options} />
    </div>
  )
}
