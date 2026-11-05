import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { DataTableClient as ParameterThresholdDataTableClient } from "../parameter_thresholds/_components/data-table-client"
import { getTbmParametersByTbmCode } from "@/lib/tbm/tbm-parameter/service"
import { DetailItem } from "@/components/common/detail-item"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { notFound } from "next/navigation"
import { DataTableClient as TbmParameterDataTableClient } from "../tbm-parameters/_components/data-table-client"
// import { DataTableClient as RiskDataTableClient } from "../risks/_components/data-table-client"
import { tbmRepository } from "@/lib/tbm/tbm/repository"
import { TbmHeaderCard } from "../_components/tbm-header"
import { subsystemRepository } from "@/lib/tbm/subsystem/repository"
import { dictionaryItemRepository } from "@/lib/master-data/dictionary-item/repository"
import { parameterThresholdRepository } from "@/lib/tbm/parameter-threshold"
import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"

export default async function DetailPage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  const tbm = await tbmRepository.findByCode(code)
  console.log(tbm)

  if (!tbm) {
    notFound()
  }
  const tbmParameters = await getTbmParametersByTbmCode(code)
  const subsystemOptions = await subsystemRepository.findOptions()
  console.log(subsystemOptions)
  const severityTypeOptions =
    await dictionaryItemRepository.findOptionsByType("5201")
  console.log("severityOptions", severityTypeOptions)

  const thresholds = await parameterThresholdRepository.findByTbmCodes([code])

  const parameterThresholdOptions: ParameterThresholdOptions = {
    subsystemOptions,
    severityOptions: severityTypeOptions,
  }

  // const segments = await segmentRepository.findByTunnelId(id)
  // console.log(segments)
  // const risks = await riskRepository.findByTunnelId(id)
  // console.log(risks)

  return (
    <div className="space-y-6">
      <TbmHeaderCard tbm={tbm} />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">概述</TabsTrigger>
          <TabsTrigger value="parameters">参数</TabsTrigger>
          <TabsTrigger value="thresholds">参数阀值</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>概述</CardTitle>
              <CardDescription>
                View your key metrics and recent project activity. Track
                progress across all your active projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <DetailItem label="编码" value={tbm.code} />
              <DetailItem label="名称" value={tbm.name} />
              <DetailItem label="TBM类型" value={tbm.tbm_type_code} />
              <DetailItem label="直径" value={tbm.diameter} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parameters">
          <TbmParameterDataTableClient
            data={tbmParameters}
            tbmCode={code}
            options={parameterThresholdOptions}
          />
        </TabsContent>
        <TabsContent value="thresholds">
          {/* <RiskDataTableClient tunnel={tunnel} data={risks} /> */}
          <ParameterThresholdDataTableClient
            data={thresholds}
            tbmCode={code}
            options={parameterThresholdOptions}
          />
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>设置</CardTitle>
              <CardDescription>
                管理您的账户偏好和选项。根据您的需求自定义体验。
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              配置通知、安全性和主题。
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
