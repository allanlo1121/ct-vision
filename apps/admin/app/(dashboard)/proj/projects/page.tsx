import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { projectRepository } from "@/lib/proj/project/repository"

import { ENTITY, type ProjectOptions } from "@/lib/proj/project"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"

export const metadata: Metadata = {
  title: ENTITY.label,
}

export default async function Page() {
  const [
    data,
    projectTypeOptions,
    managementModeOptions,
    regionOptions,
    projectSubTypeOptions,
    unitTypeOptions,
  ] = await Promise.all([
    projectRepository.findAll(),

    dictionaryItemRepository.findOptionsByType("1011"),
    dictionaryItemRepository.findOptionsByType("1021"),
    dictionaryItemRepository.findOptionsByType("1009"),
    dictionaryItemRepository.findOptionsByType("2055"),
    dictionaryItemRepository.findOptionsByType("2072"),
  ])

  const options: ProjectOptions = {
    projectTypeOptions,
    managementModeOptions,
    regionOptions,
    projectSubTypeOptions,
    unitTypeOptions,
  }

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} options={options} />
    </div>
  )
}
