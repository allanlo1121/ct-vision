import { ArrowLeft } from "lucide-react"
import { tunnelRepository } from "@/lib/proj/tunnel/repository"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { DetailItem } from "@/components/common/detail-item"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { notFound } from "next/navigation"
import { segmentRepository } from "@/lib/proj/tunnel_segment/repository"
import { riskRepository } from "@/lib/proj/tunnel_risk/repository"
import { DataTableClient as SegmentDataTableClient } from "../segments/_components/data-table-client"
import { DataTableClient as RiskDataTableClient } from "../risks/_components/data-table-client"

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const tunnel = await tunnelRepository.findById(id)
  console.log(tunnel)

  if (!tunnel) {
    notFound()
  }
  const segments = await segmentRepository.findByTunnelId(id)
  console.log(segments)
  const risks = await riskRepository.findByTunnelId(id)
  console.log(risks)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">概述</TabsTrigger>
          <TabsTrigger value="segments">管片</TabsTrigger>
          <TabsTrigger value="risks">风险</TabsTrigger>
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
              <DetailItem label="起始里程" value={tunnel.start_chainage} />
              <DetailItem label="结束里程" value={tunnel.end_chainage} />
              <DetailItem label="长短链" value={tunnel.chainage_adjustment} />
              <DetailItem
                label="隧道长度"
                value={
                  tunnel.end_chainage -
                  tunnel.start_chainage +
                  tunnel.chainage_adjustment
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="segments">
          <SegmentDataTableClient tunnel={tunnel} data={segments} />
        </TabsContent>
        <TabsContent value="risks">
                <RiskDataTableClient tunnel={tunnel} data={risks} />
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
