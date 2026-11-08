import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { parameterThresholdDefaultRepository } from "@/lib/tbm/parameter-threshold-default/repository"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default/"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"

import { ENTITY } from "@/lib/tbm/subsystem"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

export const metadata: Metadata = {
  title: ENTITY.label,
}

interface PageProps {
  searchParams: Promise<{
    subsystemCode?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { subsystemCode } = await searchParams
  const data = await parameterThresholdDefaultRepository.listAll(
    subsystemCode || null
  )

  const severityTypeOptions =
    await dictionaryItemRepository.findOptionsByType("5201")

  const options: ParameterThresholdDefaultOptions = {
    severityOptions: severityTypeOptions,
  }

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} options={options} />
    </div>
  )
}
