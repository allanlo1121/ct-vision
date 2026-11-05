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

import { DataTableToolbar } from "./data-table-toolbar"

import { ParameterThresholdListRow } from "@workspace/tbm/parameter"

import type { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"

interface Props {
  data: ParameterThresholdListRow[]
  tbmCode: string
  options: ParameterThresholdOptions
}

export function DataTableClient({
  data,
  tbmCode,
  options,
}: Props) {
  const columns = React.useMemo(
    () =>
      createColumns(options
      ),
    [options]
  )

  const [createOpen, setCreateOpen] = React.useState(false)

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle>参数阀值</CardTitle>
            <CardDescription>
              管理TBM系统参数阀值及对应的相关信息。
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            toolbar={(table) => (
              <DataTableToolbar
                table={table}
                tbmCode={tbmCode}
                options={options}
                
              />
            )}
          />
        </CardContent>
      </Card>
    </>
  )
}
