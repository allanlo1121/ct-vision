"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import { type Role } from "@workspace/system/role"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Role>()

export const columns = columnHelper.columns([
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
      <DataTableColumnHeader column={column} title="编码" />
    ),
    meta: {
      label: "编码",
    },
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
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
  columnHelper.accessor("description", {
    meta: {
      label: "描述",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="描述" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("description")}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("sort_order", {
    meta: {
      label: "排序",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="排序" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("sort_order")}</div>
    ),
    enableSorting: false,
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
      <div className="w-[80px]">{row.getValue("created_at")}</div>
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
      <div className="w-[80px]">{row.getValue("updated_at")}</div>
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
      <div className="w-[80px]">{row.getValue("created_by")}</div>
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
      <div className="w-[80px]">{row.getValue("updated_by")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  }),

  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  }),
])
