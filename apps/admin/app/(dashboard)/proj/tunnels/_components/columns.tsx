"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"
import Link from "next/link"

import { type Tunnel } from "@workspace/proj/tunnel"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { routes } from "@/lib/routes/routers"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(): DataTableColumn<Tunnel>[] {
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<DataTableFeatures, Tunnel>()

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

    columnHelper.accessor("name", {
      meta: {
        label: "隧道简称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="隧道简称" />
      ),
      cell: ({ row }) => {
        const tunnel = row.original

        return (
          <Link href={routes.tunnels.detail(tunnel.id!)} className="w-[200px]">
            {tunnel.name}
          </Link>
        )
      },
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("full_name", {
      meta: {
        label: "隧道全称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="隧道全称" />
      ),
      cell: ({ row }) => {
        const tunnel = row.original

        return (
          <Link href={routes.tunnels.detail(tunnel.id!)} className="w-[200px]">
            {tunnel.full_name}
          </Link>
        )
      },
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("overview", {
      meta: {
        label: "隧道概述",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="隧道概述" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("overview")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("chainage_prefix", {
      meta: {
        label: "里程前缀",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="里程前缀" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("chainage_prefix")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("start_chainage", {
      meta: {
        label: "起始里程",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="起始里程" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("start_chainage")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("end_chainage", {
      meta: {
        label: "结束里程",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="结束里程" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("end_chainage")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("chainage_adjustment", {
      meta: {
        label: "短链/长链",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="短链/长链" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("chainage_adjustment")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("start_ring", {
      meta: {
        label: "起始环号",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="起始环号" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("start_ring")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("end_ring", {
      meta: {
        label: "结束环号",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="结束环号" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("end_ring")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("excavation_diameter", {
      meta: {
        label: "开挖直径",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="开挖直径" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("excavation_diameter")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("is_disabled", {
      meta: {
        label: "是否禁用",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="是否禁用" />
      ),
      cell: ({ row }) => {
        const disabled = row.original.is_disabled

        return (
          <Badge variant={disabled ? "destructive" : "secondary"}>
            {disabled ? "已禁用" : "正常"}
          </Badge>
        )
      },
      enableSorting: false,
      enableHiding: true,
    }),
    columnHelper.accessor("created_at", {
      meta: {
        label: "创建时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="创建时间" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">
          {formatDateTime(row.getValue("created_at"))}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
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
    columnHelper.accessor("created_by", {
      meta: {
        label: "创建人",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="创建人" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px] truncate">{row.getValue("created_by")}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    }),
    columnHelper.accessor("updated_by", {
      meta: {
        label: "更新人",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="更新人" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px] truncate">{row.getValue("updated_by")}</div>
      ),
      enableSorting: false,
      enableHiding: true,
    }),

    // columnHelper.display({
    //   id: "actions",
    //   cell: ({ row }) => <DataTableRowActions row={row} dictionaryTypeOptions={dictionaryTypeOptions} />,
    // }),
  ])
}
