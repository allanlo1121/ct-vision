"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"
import type { TbmConnectivity } from "@workspace/tbm/runtime"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { OnlineTimeCell } from "@/components/common/online-time-cell"
import Link from "next/link"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(): DataTableColumn<TbmConnectivity>[] {
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<DataTableFeatures, TbmConnectivity>()
  const now = Date.now()
  return columnHelper.columns([
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }),

    columnHelper.accessor("tbm_code", {
      meta: {
        label: "盾构机编号",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="盾构机编号" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("tbm_code")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("last_realdata_at", {
      meta: {
        label: "盾构在线时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="盾构在线时间" />
      ),
      cell: ({ row }) => (
        <OnlineTimeCell value={row.original.last_realdata_at} now={now} />
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("last_heartbeat_at", {
      meta: {
        label: "心跳在线时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="心跳在线时间" />
      ),
      cell: ({ row }) => (
        <OnlineTimeCell value={row.original.last_heartbeat_at} now={now} />
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("last_sampled_at", {
      meta: {
        label: "数据采集时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="数据采集时间" />
      ),
      cell: ({ row }) => (
        <OnlineTimeCell value={row.original.last_sampled_at} now={now} />
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("updated_at", {
      meta: {
        label: "更新时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="更新时间" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">
          {formatDateTime(row.getValue("updated_at"))}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    }),
  ])
}
