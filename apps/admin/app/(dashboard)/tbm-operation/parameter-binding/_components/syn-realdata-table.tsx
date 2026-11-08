"use client"

import { useState } from "react"
import { toast } from "@workspace/ui/components/toast"
import { Table } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

import { syncTbmRealdataTable } from "@/lib/tbm/tbm-parameter/action"

export function TbmRealdataTableButton({ tbmCode }: { tbmCode: string }) {
  const [pending, setPending] = useState(false)

  async function handleClick() {
    try {
      setPending(true)

      const result = await syncTbmRealdataTable(tbmCode)

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        description: "实时数据表同步成功",
      })
    } catch (error) {
      console.error(error)

      toast.add({
        type: "error",
        description: "实时数据表同步失败",
        priority: "high",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={handleClick}
    >
      <Table className="size-4" />
      {pending ? "同步中..." : "同步实时表"}
    </Button>
  )
}
