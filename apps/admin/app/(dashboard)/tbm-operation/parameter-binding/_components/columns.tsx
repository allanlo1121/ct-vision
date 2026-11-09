"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import type { TbmParameterWithBase } from "@workspace/tbm/parameter"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@workspace/ui/components/badge"
import type { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(
  options: ParameterThresholdDefaultOptions
): DataTableColumn<TbmParameterWithBase>[] {
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<
    DataTableFeatures,
    TbmParameterWithBase
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
    columnHelper.accessor((row) => row.parameter?.name, {
      id: "parameter_name",
      meta: {
        label: "名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="名称" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] truncate font-medium">{getValue()}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor((row) => row.parameter?.unit, {
      id: "parameter_unit",
      meta: {
        label: "单位",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="单位" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] font-medium">{getValue()}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor((row) => row.parameter?.data_type, {
      id: "data_type",
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
    columnHelper.accessor((row) => row.parameter?.digits, {
      id: "digits",
      meta: {
        label: "小数位数",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="小数位数" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] truncate font-medium">{getValue()}</div>
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
