import React from "react"
import { DataTableClient } from "./_components/data-table-client"
import { PageHeader } from "@/components/layout/page-header"

import { dictionaryTypeRepository } from "@/lib/master-data/dictionary-type/repository"

import { TITLE } from "./constants"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: TITLE,
}

export default async function Page() {
  const dictionaryTypes = await dictionaryTypeRepository.findAll()
  console.log("dictionaryTypes:", dictionaryTypes)
  return (
    <div className="h-full w-full flex-col">
      <PageHeader title={`${TITLE}管理`} />

      {/* 表格 */}

      <DataTableClient data={dictionaryTypes} />
    </div>
  )
}
