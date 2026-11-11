import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { ENTITY, type OrganizationOptions } from "@/lib/hrm/organization"
import { PageHeader } from "@/components/layout/page-header"

import { organizationRepository } from "@/lib/hrm/organization/repository"

import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"

export const metadata: Metadata = {
  title: ENTITY.label,
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

  const orgTypeOptions =
    await dictionaryItemRepository.findOptionsByType("1023")
  const orgCategoryOptions =
    await dictionaryItemRepository.findOptionsByType("1025")

  const options: OrganizationOptions = {
    orgTypeOptions,
    orgCategoryOptions,
  }

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} options={options} />
    </div>
  )
}
