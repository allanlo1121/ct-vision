"use client"

import {createColumnHelper } from "@tanstack/react-table"

import { Checkbox } from "@workspace/ui/components/checkbox"

import { type UserListItem } from "@workspace/system/user"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateTime } from "@workspace/shared/utils"
import { Badge } from "@workspace/ui/components/badge"
import { IdNameOption } from "@workspace/shared"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, UserListItem>()

export function getUserColumns(roleOptions: IdNameOption[]) {
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
    columnHelper.accessor("email", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="邮箱" />
      ),
      meta: {
        label: "邮箱",
      },
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("email")}</div>
      ),
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelper.accessor("displayName", {
      meta: {
        label: "昵称",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="昵称" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px] truncate font-medium">
          {row.getValue("displayName")}
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),
    columnHelper.accessor("roles", {
      meta: {
        label: "角色",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="角色" />
      ),
      cell: ({ row }) => {
        const roles = row.original.roles

        return (
          <div className="flex flex-wrap gap-1">
            {roles.length > 0 ? (
              roles.map((role) => (
                <Badge key={role.id} variant="secondary">
                  {role.name}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">未分配角色</span>
            )}
          </div>
        )
      },
      enableSorting: false,
      enableHiding: true,
    }),
    columnHelper.accessor("avatarPath", {
      meta: {
        label: "头像",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="头像" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px] truncate font-medium">
          <img
            src={row.getValue("avatarPath") ?? "/default-avatar.png"}
            alt="头像"
            className="h-8 w-8 rounded-full"
          />
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    }),

    columnHelper.accessor("createdAt", {
      meta: {
        label: "创建时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="创建时间" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">
          {formatDateTime(row.getValue("createdAt"))}
        </div>
      ),
      enableSorting: true,
      enableHiding: true,
    }),
    columnHelper.accessor("lastSignInAt", {
      meta: {
        label: "最后登录时间",
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="最后登录时间" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">
          {formatDateTime(row.getValue("lastSignInAt"))}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions row={row} roleOptions={roleOptions} />
      ),
    }),
  ])
}
