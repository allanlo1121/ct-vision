"use client"

import { Input } from "@workspace/ui/components/input"

interface SidebarFilterValues {
  search: string
}

interface Props {
  value: SidebarFilterValues
  onChange: (value: SidebarFilterValues) => void
}

export function SidebarFilters({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <Input
        placeholder="搜索盾构机名称 / 编号"
        value={value.search}
        onChange={(e) =>
          onChange({
            ...value,
            search: e.target.value,
          })
        }
      />
    </div>
  )
}
