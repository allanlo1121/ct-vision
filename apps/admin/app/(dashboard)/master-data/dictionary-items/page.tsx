import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryTypeRepository } from "@/lib/master-data/dictionary-type/repository"

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const dictionaryItems = await dictionaryItemRepository.findAll()
  console.log("dictionaryItems:", dictionaryItems)
  const dictionaryTypeOptions = await dictionaryTypeRepository.findOptions()
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient
        data={dictionaryItems}
        dictionaryTypeOptions={dictionaryTypeOptions}
      />
    </div>
  )
}
