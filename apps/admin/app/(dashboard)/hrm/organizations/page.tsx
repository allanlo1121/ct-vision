import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { organizationRepository } from "@/lib/hrm/organization/repository"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"

export const metadata: Metadata = {
  title: TITLE,
}
interface PageProps {
  searchParams: Promise<{
    organizationId?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { organizationId } = await searchParams
  const parentId = organizationId || null
  const data = await organizationRepository.findByParentId(parentId)
  console.log("data:", data)
  const orgTypeOptions =
    await dictionaryItemRepository.findOptionsByType("1023")
  const orgCatagoryOptions =
    await dictionaryItemRepository.findOptionsByType("1025")
  console.log("orgTypeOptions:", orgTypeOptions)
  console.log("orgCatagoryOptions:", orgCatagoryOptions)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient
        data={data}
        orgTypeOptions={orgTypeOptions}
        orgCatagoryOptions={orgCatagoryOptions}
      />
    </div>
  )
}
