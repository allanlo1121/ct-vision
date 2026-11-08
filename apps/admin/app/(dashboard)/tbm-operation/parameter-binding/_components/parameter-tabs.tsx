"use client"

import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { useQueryNavigation } from "@/hooks/use-query-navigation"

export function ParameterTabs() {
  const { navigate, searchParams } = useQueryNavigation()

  const activeTab =
    searchParams.get("tab") === "threshold" ? "threshold" : "parameter"

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) =>
        navigate({
          tab: value === "parameter" ? null : value,
        })
      }
    >
      <TabsList>
        <TabsTrigger value="parameter">绑定参数</TabsTrigger>

        <TabsTrigger value="threshold">专用阈值</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
