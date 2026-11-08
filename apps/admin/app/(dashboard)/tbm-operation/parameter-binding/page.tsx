import React from "react"

import { ParameterTabs } from "./_components/parameter-tabs"
import { ParameterTable } from "./parameter-table"
import { ThresholdTable } from "./parameter-threshold/page"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

interface PageProps {
  searchParams: Promise<{
    tbmCode?: string
    subsystemCode?: string
    tab?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const { tbmCode, subsystemCode, tab } = await searchParams

  const severityOptions =
    await dictionaryItemRepository.findOptionsByType("5201")

  const options: ParameterThresholdDefaultOptions = {
    severityOptions,
  }

  // 这里保留原来的 tbmCode 缺失时 redirect 逻辑

  const activeTab = tab === "threshold" ? "threshold" : "parameter"

  return (
    <div className="flex flex-col gap-4">
      <ParameterTabs />

      {activeTab === "threshold" ? (
        <ThresholdTable
          tbmCode={tbmCode!}
          subsystemCode={subsystemCode || null}
          options={options}
        />
      ) : (
        <ParameterTable
          tbmCode={tbmCode!}
          subsystemCode={subsystemCode || null}
          options={options}
        />
      )}
    </div>
  )
}
