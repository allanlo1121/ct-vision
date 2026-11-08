"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import { type ParameterThresholdDefaultWithBase } from "@workspace/tbm/parameter"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"

import { thresholdTypeLabels, type ThresholdType } from "@workspace/shared"
import { ParameterThresholdDefaultOptions } from "@/lib/tbm/parameter-threshold-default"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(
  options: ParameterThresholdDefaultOptions
): DataTableColumn<ParameterThresholdDefaultWithBase>[] {
  const { severityOptions } = options
  const severityMap = new Map(severityOptions.map((x) => [x.code, x.name]))
  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<
    DataTableFeatures,
    ParameterThresholdDefaultWithBase
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
        label: "编码",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="编码" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[250px] truncate font-medium">
          {row.getValue("code")}
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
        label: "最短时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="最短时间" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("min_record_interval_seconds")}
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
    columnHelper.accessor((row) => row.parameter?.sort_order, {
      id: "parameter_order",
      meta: {
        label: "排序",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="排序" />
      ),
      cell: ({ getValue }) => (
        <div className="max-w-[200px] truncate font-medium">{getValue()}</div>
      ),
      enableSorting: true,
      enableHiding: false,
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
      cell: ({ row }) => <DataTableRowActions row={row} options={options} />,
    }),
  ])
}
