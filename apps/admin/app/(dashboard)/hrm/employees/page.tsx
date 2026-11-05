import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { employeeRepository } from "@/lib/hrm/employee/repository"

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

import { z } from "zod"

export default async function Page({ searchParams }: PageProps) {
  const { organizationId } = await searchParams

  // 验证组织 ID，未选择时为 null
  const parsed = z.uuid().safeParse(organizationId)
  const orgId = parsed.success ? parsed.data : null

  const [data, genderOptions, employmentTypeOptions, statusOptions] =
    await Promise.all([
      orgId
        ? employeeRepository.findByOrganizationId(orgId)
        : Promise.resolve([]),

      dictionaryItemRepository.findOptionsByType("1016"),
      dictionaryItemRepository.findOptionsByType("1017"),
      dictionaryItemRepository.findOptionsByType("1031"),
    ])

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      <DataTableClient
        data={data}
        genderOptions={genderOptions}
        employmentTypeOptions={employmentTypeOptions}
        statusOptions={statusOptions}
      />
    </div>
  )
}
