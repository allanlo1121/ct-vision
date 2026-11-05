"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"
import type { TbmAssignmentListRow } from "@workspace/tbm/tbm"

import { Checkbox } from "@workspace/ui/components/checkbox"
import Link from "next/link"


import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { routes } from "@/lib/routes/routers"

import { advanceDirectionLabels, type AdvanceDirection } from "@workspace/shared"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(): DataTableColumn<TbmAssignmentListRow>[] {
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<
    DataTableFeatures,
    TbmAssignmentListRow
  >()

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
        label: "TBM编号",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TBM编号" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("tbm_code")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("tbm_name", {
      meta: {
        label: "TBM名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TBM名称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("tbm_name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("advance_direction", {
      meta: {
        label: "掘进方向",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="掘进方向" />
      ),
      cell: ({ getValue }) =>
        advanceDirectionLabels[getValue() as AdvanceDirection] ?? getValue(),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("tunnel_name", {
      meta: {
        label: "所属隧道",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="所属隧道" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("tunnel_name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("section_name", {
      meta: {
        label: "标段",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="标段" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("section_name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("project_name", {
      meta: {
        label: "项目名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="项目名称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("project_name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("start_date", {
      meta: {
        label: "开始日期",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="开始日期" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {formatDateTime(row.getValue("start_date"))}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("end_date", {
      meta: {
        label: "结束日期",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="结束日期" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {formatDateTime(row.getValue("end_date"))}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("remark", {
      meta: {
        label: "备注",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="备注" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("remark")}
        </div>
      ),
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
    //   cell: ({ row }) => (
    //     <DataTableRowActions row={row} />
    //   ),
    // }),
  ])
}
