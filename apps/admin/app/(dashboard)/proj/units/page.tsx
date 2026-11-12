import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { ENTITY, type EngineeringUnitOptions } from "@/lib/proj/unit"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"

import { engineeringUnitRepository } from "@/lib/proj/unit/repository"

export const metadata: Metadata = {
  title: ENTITY.label,
}

interface PageProps {
  searchParams: Promise<{
    projectId?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { projectId } = await searchParams

  const data = await engineeringUnitRepository.findByProjectId(projectId)

  const unitTypeOptions =
    await dictionaryItemRepository.findOptionsByType("2072")

  const options: EngineeringUnitOptions = {
    unitTypeOptions,
  }

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} options={options} />
    </div>
  )
}
