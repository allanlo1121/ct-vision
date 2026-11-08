"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"
import Link from "next/link"

import type { TbmParameterThresholdWithBase } from "@workspace/tbm/parameter"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { routes } from "@/lib/routes/routers"
import { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"
import { thresholdTypeLabels, type ThresholdType } from "@workspace/shared"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(
  options: ParameterThresholdDefaultOptions
): DataTableColumn<TbmParameterThresholdWithBase>[] {
  const { severityOptions } = options

  const severityMap = new Map(severityOptions.map((x) => [x.code, x.name]))

  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<
    DataTableFeatures,
    TbmParameterThresholdWithBase
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

    columnHelper.accessor((row) => row.tbm_parameter?.parameter.code, {
      id: "parameter_code",
      meta: {
        label: "参数编码",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="参数编码" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] font-medium">{getValue()}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor((row) => row.tbm_parameter?.parameter.name, {
      id: "parameter_name",
      meta: {
        label: "参数名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="参数名称" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] font-medium">{getValue()}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor((row) => row.tbm_parameter?.parameter.data_type, {
      id: "data_type",
      meta: {
        label: "数据类型",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="数据类型" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] font-medium">{getValue()}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor(
      (row) =>
        row.tbm_parameter.custom_unit?.trim() ||
        row.tbm_parameter.parameter.unit,
      {
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
      }
    ),
    columnHelper.accessor("severity_code", {
      meta: {
        label: "告警级别",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="告警级别" />
      ),
      cell: ({ getValue }) => severityMap.get(getValue()) ?? getValue(),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("threshold_type", {
      meta: {
        label: "阈值类型",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="阈值类型" />
      ),
      cell: ({ row }) => {
        thresholdTypeLabels[row.getValue<ThresholdType>("threshold_type")]
      },
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("threshold_value", {
      meta: {
        label: "阈值",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="阈值" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("threshold_value")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("reference_value", {
      meta: {
        label: "参考值",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="参考值" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("reference_value")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("min_record_delta", {
      meta: {
        label: "报警最小波动值",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="报警最小波动值" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("min_record_delta")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("min_record_interval_seconds", {
      meta: {
        label: "最小时间差",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="小时间差" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("min_record_interval_ms")}
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
