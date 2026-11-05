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

import { Segment, Tunnel } from "@workspace/proj/tunnel"
import { CreateDrawer } from "./create-drawer"

interface Props {
  tunnel: Tunnel
  data: Segment[]
}

export function DataTableClient({ tunnel, data }: Props) {
  const columns = React.useMemo(() => createColumns(), [])

  const [createOpen, setCreateOpen] = React.useState(false)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle>管片段</CardTitle>
            <CardDescription>
              管理隧道管片分段及对应的环号范围、管片尺寸。
            </CardDescription>
          </div>

          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            新增管片段
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
