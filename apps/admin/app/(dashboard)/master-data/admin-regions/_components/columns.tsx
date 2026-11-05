"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react"

import type { TreeNode } from "@workspace/shared/tree"
import { type DataTableFeatures } from "@/components/data-table/data-table-features"

import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Badge } from "@workspace/ui/components/badge"

import type { AdminRegion } from "@workspace/master-data/admin-region"

export type AdminRegionTree = TreeNode<AdminRegion>

const columnHelper = createColumnHelper<DataTableFeatures, AdminRegionTree>()

const levelNames: Record<number, string> = {
  1: "省级",
  2: "市级",
  3: "区县级"
}

export const columns = columnHelper.columns([
  // 选择
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="全选"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="选择行"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  }),

  // 行政区划名称 + 展开
  columnHelper.accessor("name", {
    meta: {
      label: "行政区划名称",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="行政区划名称" />
    ),
    cell: ({ row, getValue }) => (
      <div
        className="flex items-center gap-1"
        style={{
          paddingLeft: `${row.depth * 20}px`,
        }}
      >
        {row.getCanExpand() ? (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0"
            onClick={row.getToggleExpandedHandler()}
            aria-label={row.getIsExpanded() ? "收起" : "展开"}
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        ) : (
          <span className="inline-block size-7 shrink-0" />
        )}

        <span className="font-medium">{getValue()}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 250,
  }),

  // 行政区划代码
  columnHelper.accessor("code", {
    meta: {
      label: "行政区划代码",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="行政区划代码" />
    ),
    cell: ({ getValue }) => <span className="font-mono">{getValue()}</span>,
  }),

  // 简称
  columnHelper.accessor("short_name", {
    meta: {
      label: "简称",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="简称" />
    ),
    cell: ({ getValue }) => getValue(),
  }),

  // 拼音代码
  columnHelper.accessor("pinyin_code", {
    meta: {
      label: "拼音代码",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="拼音代码" />
    ),
    cell: ({ getValue }) => getValue(),
  }),

  // 行政级别
  columnHelper.accessor("level", {
    meta: {
      label: "行政级别",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="行政级别" />
    ),
    cell: ({ getValue }) => {
      const level = getValue()

      return levelNames[level] ?? `第 ${level} 级`
    },
  }),

  // 是否禁用
  columnHelper.accessor("is_disabled", {
    meta: {
      label: "状态",
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="状态" />
    ),
    cell: ({ getValue }) => {
      const isDisabled = getValue()

      return (
        <Badge variant={isDisabled ? "secondary" : "outline"}>
          {isDisabled ? "已禁用" : "启用"}
        </Badge>
      )
    },
    enableSorting: false,
  }),
])
