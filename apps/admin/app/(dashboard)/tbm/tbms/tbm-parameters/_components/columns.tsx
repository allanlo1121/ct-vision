"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"
import Link from "next/link"

import type { TbmParameterListItem } from "@/lib/tbm/tbm-parameter"
import type { CodeNameOption } from "@workspace/shared"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { routes } from "@/lib/routes/routers"
import { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold/types"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(
  options: ParameterThresholdOptions
): DataTableColumn<TbmParameterListItem>[] {
  const subsystemMap = new Map(
    options.subsystemOptions.map((x) => [x.code, x.name])
  )
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<
    DataTableFeatures,
    TbmParameterListItem
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

    columnHelper.accessor("parameter_code", {
      meta: {
        label: "参数编码",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="参数编码" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] font-medium">
          {row.getValue("parameter_code")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("name", {
      meta: {
        label: "参数名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="参数名称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] font-medium">{row.getValue("name")}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("custom_name", {
      meta: {
        label: "自定义参数名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="自定义参数名称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] font-medium">
          {row.getValue("custom_name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("subsystem_code", {
      meta: {
        label: "所属子系统",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="所属子系统" />
      ),
      cell: ({ getValue }) => subsystemMap.get(getValue()) ?? getValue(),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("data_type", {
      meta: {
        label: "数据类型",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="数据类型" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("data_type")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("unit", {
      meta: {
        label: "单位",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="单位" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("unit")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("custom_unit", {
      meta: {
        label: "自定义单位",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="自定义单位" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("custom_unit")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("digits", {
      meta: {
        label: "小数位数",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="小数位数" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("digits")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("value_min", {
      meta: {
        label: "最小值",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="最小值" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("value_min")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("value_max", {
      meta: {
        label: "最大值",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="最大值" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("value_max")}
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

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} options={options} />,
    }),
  ])
}
