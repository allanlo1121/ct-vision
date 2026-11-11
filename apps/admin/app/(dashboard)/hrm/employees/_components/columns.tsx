"use client"

import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import { type Employee } from "@workspace/hrm/employee"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { EmployeeOptions } from "@/lib/hrm/employee/types"

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any
>

export function createColumns(
  options: EmployeeOptions
): DataTableColumn<Employee>[] {
  const { genderOptions, employmentTypeOptions, statusOptions } = options
  const genderMap = new Map(genderOptions.map((x) => [x.code, x.name]))
  const employmentTypeMap = new Map(
    employmentTypeOptions.map((x) => [x.code, x.name])
  )
  const statusMap = new Map(statusOptions.map((x) => [x.code, x.name]))

  // Use `accessor` for data columns and `display` for columns without one.
  const columnHelper = createColumnHelper<DataTableFeatures, Employee>()

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
        label: "姓名",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="姓名" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[120px] truncate font-medium">
          {row.getValue("name")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("code", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="编码" />
      ),
      meta: {
        label: "编码",
      },
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
      enableSorting: true,
      enableHiding: true,
    }),

    columnHelper.accessor("gender_code", {
      meta: {
        label: "性别",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="性别" />
      ),
      cell: ({ getValue }) => genderMap.get(getValue()) ?? getValue(),
    }),
    columnHelper.accessor("employment_type_code", {
      meta: {
        label: "员工类型",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="员工类型" />
      ),
      cell: ({ getValue }) => employmentTypeMap.get(getValue()) ?? getValue(),
    }),
    columnHelper.accessor("status_code", {
      meta: {
        label: "员工状态",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="员工状态" />
      ),
      cell: ({ getValue }) => statusMap.get(getValue()) ?? getValue(),
    }),
    columnHelper.accessor("phone", {
      meta: {
        label: "手机号",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="手机号" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[100px] truncate font-medium">
          {row.getValue("phone")}
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
