"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"
import Link from "next/link"
import { type Tbm } from "@workspace/tbm/tbm"
import type { CodeNameOption } from "@workspace/shared"
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

export function createColumns(
  tbmTypeOptions: CodeNameOption[]
): DataTableColumn<Tbm>[] {
  const tbmTypeMap = new Map(tbmTypeOptions.map((x) => [x.code, x.name]))

  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<DataTableFeatures, Tbm>()

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
    columnHelper.accessor("code", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TBM编码" />
      ),
      meta: {
        label: "TBM编码",
      },
      cell: ({ row }) => {
        const tbm = row.original

        return (
          <Link href={routes.tbms.detail(tbm.code!)} className="w-[200px]">
            {tbm.code}
          </Link>
        )
      },
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelper.accessor("name", {
      meta: {
        label: "名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="名称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("tbm_type_code", {
      meta: {
        label: "TBM类型",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TBM类型" />
      ),
      cell: ({ getValue }) => tbmTypeMap.get(getValue()) ?? getValue(),
    }),

    columnHelper.accessor("diameter", {
      meta: {
        label: "直径",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="直径" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("diameter")}
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

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions row={row} tbmTypeOptions={tbmTypeOptions} />
      ),
    }),
  ])
}
