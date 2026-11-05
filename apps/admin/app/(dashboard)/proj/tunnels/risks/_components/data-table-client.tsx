"use client"

import React from "react"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns } from "./columns"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Plus } from "lucide-react"
import { DataTableToolbar } from "./data-table-toolbar"

import { Risk, Tunnel } from "@workspace/proj/tunnel"
import { CreateDrawer } from "./create-drawer"

interface Props {
  tunnel: Tunnel
  data: Risk[]
}

export function DataTableClient({ tunnel, data }: Props) {
  const columns = React.useMemo(() => createColumns(), [])

  const [createOpen, setCreateOpen] = React.useState(false)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle>风险点</CardTitle>
            <CardDescription>管理隧道风险点及对应的相关信息。</CardDescription>
          </div>

          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            新增风险点
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            // toolbar={(table) => <DataTableToolbar table={table} />}
          />
        </CardContent>
      </Card>

      <CreateDrawer
        tunnel={tunnel}
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </>
  )
}
