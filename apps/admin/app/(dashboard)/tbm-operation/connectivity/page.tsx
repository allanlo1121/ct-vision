import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { ENTITY } from "@/lib/tbm/parameter"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"

import { getTbmConnectivityList } from "@/lib/tbm-runtime/connectivity/services"

export const metadata: Metadata = {
  title: ENTITY.label,
}

interface PageProps {
  searchParams: Promise<{
    tbmCode?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { tbmCode } = await searchParams
  const data = await getTbmConnectivityList(tbmCode)

  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${ENTITY.label}管理`} />

      {/* 表格 */}

      <DataTableClient data={data} />
    </div>
  )
}
