import React from "react"
import { redirect } from "next/navigation"

import { tbmRepository } from "@/lib/equip/tbm/repository"

import { ENTITY } from "@/lib/tbm/tbm-parameter"
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"

interface PageProps {
  searchParams: Promise<{
    code?: string
  }>
}

export const metadata: Metadata = {
  title: ENTITY.label,
}

export default async function Page({ searchParams }: PageProps) {
  const { code } = await searchParams
  // 1. 首次进入，没有 code
  if (!code) {
    const tbm = await tbmRepository.findFirst()

    if (!tbm) {
      return <div>暂无 TBM 设备</div>
    }

    redirect(`/tbm/tbms?code=${encodeURIComponent(tbm.code)}`)
  }
  // const data = await tbmParameterRepository.findByTbmCode(code)

  const tbmTypeOptions =
    await dictionaryItemRepository.findOptionsByType("4500")

  const severityTypeOptions =
    await dictionaryItemRepository.findOptionsByType("5201")

  const options = {
    tbmTypeOptions,
    severityTypeOptions,
  }

  return <div className="flex h-full w-full flex-col gap-6"></div>
}
