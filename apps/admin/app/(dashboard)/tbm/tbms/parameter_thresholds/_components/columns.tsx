"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"
import Link from "next/link"

import type { ParameterThresholdListRow } from "@workspace/tbm/parameter"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { routes } from "@/lib/routes/routers"
import { ParameterThresholdOptions } from "@/lib/tbm/parameter-threshold"
import { thresholdTypeLabels, type ThresholdType } from "@workspace/shared"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(
  options: ParameterThresholdOptions
): DataTableColumn<ParameterThresholdListRow>[] {
  const { subsystemOptions, severityOptions } = options

  const severityTypeMap = new Map(severityOptions.map((x) => [x.code, x.name]))
  const subsystemMap = new Map(subsystemOptions.map((x) => [x.code, x.name]))
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<
    DataTableFeatures,
    ParameterThresholdListRow
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
    columnHelper.accessor("parameter_name", {   
      meta: {
        label: "参数名称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="参数名称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] font-medium">{row.getValue("parameter_name")}</div>
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
      cell: ({ getValue }) => {
        return subsystemMap.get(getValue()) ?? getValue()
      },
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
    columnHelper.accessor("parameter_unit", {    
      meta: {
        label: "单位",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="单位" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] font-medium">{row.getValue("parameter_unit")}</div>
      ),
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
        const thresholdType = row.getValue("threshold_type") as ThresholdType
        const thresholdTypeLabel = thresholdTypeLabels[thresholdType]
        return thresholdTypeLabel ?? row.getValue("threshold_type")
      },
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("severity_code", {
      meta: {
        label: "告警级别",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="告警级别" />
      ),
      cell: ({ getValue }) => severityTypeMap.get(getValue()) ?? getValue(),
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
    columnHelper.accessor("min_record_interval_ms", {
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
