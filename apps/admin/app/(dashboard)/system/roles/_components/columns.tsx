"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import { type RoleWithPermissions } from "@workspace/system/role-permission"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"

import { Badge } from "@workspace/ui/components/badge"
import { formatDateTime } from "@workspace/shared/utils"
import { type Permission } from "@workspace/system/permission";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
  DataTableFeatures,
  RoleWithPermissions
>()

export function getRoleColumns(permissions: Permission[]) {
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
      <DataTableColumnHeader column={column} title="编码" />
    ),
    meta: {
      label: "编码",
    },
    cell: ({ row }) => <div className="w-[120px]">{row.getValue("code")}</div>,
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
  columnHelper.accessor("permissions", {
    meta: {
      label: "权限",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="权限" />
    ),
    cell: ({ row }) => {
      const permissions = row.original.permissions
      return (
        <div className="max-w-[400px] truncate">
          {permissions.length > 0
            ? permissions.map((permission) => (
                <Badge key={permission.id} className="mr-1">
                  {permission.name}
                </Badge>
              ))
            : ""}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("description", {
    meta: {
      label: "描述",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="描述" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("is_disabled", {
    meta: {
      label: "状态",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="状态" />
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
    cell: ({ row }) => <DataTableRowActions row={row} permissions={permissions} />,
  }),
  ])
}

