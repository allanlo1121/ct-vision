"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import { type Menu } from "@workspace/system/menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"

import { IconRenderer } from "@workspace/ui/icon"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Menu>()

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
      <div className="max-w-[120px] truncate font-medium">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  }),
  columnHelper.accessor("path_url", {
    meta: {
      label: "路径",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="路径" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate">{row.getValue("path_url")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  }),
    columnHelper.accessor("parent_id", {
    meta: {
      label: "上级菜单",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="上级菜单" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate">{row.getValue("parent_id")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("icon", {
    meta: {
      label: "图标",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="图标" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        <IconRenderer
          name={row.getValue("icon")}
          className="size-4 text-muted-foreground"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("app_code", {
    meta: {
      label: "所属应用",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="所属应用" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[120px] truncate">{row.getValue("app_code")}</div>
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
    columnHelper.accessor("is_visible", {
    meta: {
      label: "是否显示",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="是否显示" />
    ),
    cell: ({ row }) => {
      const disabled = row.original.is_disabled

      return (
        <Badge variant={row.original.is_visible ? "secondary" : "destructive"}>
          {row.original.is_visible ? "显示" : "隐藏"}
        </Badge>
      )
    },
    enableSorting: false,
    enableHiding: true,
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
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // }),
])
