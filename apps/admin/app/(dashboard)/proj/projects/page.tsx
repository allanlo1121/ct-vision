import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"
import type { ProjectOptions } from "./_components/types"

import { projectRepository } from "@/lib/proj/project/repository"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const data = await projectRepository.findAll()
  console.log("data:", data)
  const projectTypeOptions =
    await dictionaryItemRepository.findOptionsByType("1011")
  const managementModeOptions =
    await dictionaryItemRepository.findOptionsByType("1021")
  const unitTypeOptions =
    await dictionaryItemRepository.findOptionsByType("2072")

  const options: ProjectOptions = {
    projectTypeOptions,
    managementModeOptions,
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
