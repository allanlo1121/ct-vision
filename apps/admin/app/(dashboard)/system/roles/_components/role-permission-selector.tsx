"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

import {
  PERMISSION_MODULES,
  PERMISSION_ACTIONS,
  PERMISSION_MODULE_LABELS,
  PERMISSION_ACTION_LABELS,
  type PermissionModule,
} from "@workspace/system/constants"

import type { Permission } from "@workspace/system/permission"

interface RolePermissionSelectorProps {
  permissions: Permission[]
  value: string[]
  onChange?: (ids: string[]) => void
  disabled?: boolean
}

export function RolePermissionSelector({
  permissions,
  value,
  onChange,
  disabled = false,
}: RolePermissionSelectorProps) {
  const [keyword, setKeyword] = useState("")
  const [expanded, setExpanded] = useState<string[]>([])

  // 当前正在编辑的权限
  const [draftIds, setDraftIds] = useState<string[]>(value)

  const selectedIds = useMemo(() => new Set(draftIds), [draftIds])
  // 是否正在提交
  const [saving, setSaving] = useState(false)
  const groups = useMemo(() => {
    return PERMISSION_MODULES.map((module) => ({
      module,
      name: PERMISSION_MODULE_LABELS[module],
      permissions: permissions
        .filter((p) => p.module === module)
        .sort(
          (a, b) =>
            a.sort_order - b.sort_order ||
            PERMISSION_ACTIONS.indexOf(a.action) -
              PERMISSION_ACTIONS.indexOf(b.action)
        ),
    })).filter((group) => group.permissions.length > 0)
  }, [permissions])

  const filteredGroups = useMemo(() => {
    const search = keyword.trim().toLowerCase()

    if (!search) return groups

    return groups
      .map((group) => ({
        ...group,
        permissions: group.permissions.filter((p) =>
          [
            p.name,
            group.name,
            p.action,
            PERMISSION_ACTION_LABELS[p.action],
          ].some((text) => text.toLowerCase().includes(search))
        ),
      }))
      .filter((group) => group.permissions.length > 0)
  }, [groups, keyword])

  const selectedCount = permissions.filter((p) => selectedIds.has(p.id)).length

  const accordionValue = keyword.trim()
    ? filteredGroups.map((group) => group.module)
    : expanded

  function updateDraftIds(next: string[]) {
    console.log("更新草稿权限:", next)
    setDraftIds(next)
    onChange?.(next)
  }

  function handlePermissionChange(id: string, checked: boolean) {
    console.log("权限变更:", id, checked)
    if (disabled || saving) return

    const permission = permissions.find((p) => p.id === id)

    if (!permission || permission.is_disabled) return

    const next = new Set(draftIds)

    if (checked) {
      next.add(id)
    } else {
      next.delete(id)
    }

    updateDraftIds([...next])
  }

  function handleModuleChange(module: PermissionModule, checked: boolean) {
    if (disabled) return
    const group = groups.find((item) => item.module === module)
    if (!group) return
    const next = new Set(draftIds) // 仅操作未禁用的权限
    for (const permission of group.permissions) {
      if (permission.is_disabled) continue
      if (checked) {
        next.add(permission.id)
      } else {
        next.delete(permission.id)
      }
    }
    updateDraftIds(Array.from(next))
  }

  function getModuleState(items: Permission[]) {
    const available = items.filter((p) => !p.is_disabled)
    const selected = available.filter((p) => selectedIds.has(p.id)).length

    return {
      checked: available.length > 0 && selected === available.length,
      indeterminate: selected > 0 && selected < available.length,
      disabled: available.length === 0,
    }
  }

  //   const isDirty = useMemo(() => {
  //     if (draftIds.length !== value.length) return true

  //     const savedIds = new Set(value)

  //     return draftIds.some((id) => !savedIds.has(id))
  //   }, [draftIds, value])

  //   async function handleSave() {
  //     if (!isDirty || disabled || saving) return

  //     setSaving(true)

  //     try {
  //       await onSave(draftIds)
  //     } finally {
  //       setSaving(false)
  //     }
  //   }

  //   function handleCancel() {
  //   if (saving) return

  //   setDraftIds([...value])
  // }

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">权限分配</h3>

          <Badge variant="secondary">
            已选择 {selectedCount} / {permissions.length}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground">
          按模块分配权限，修改后点击保存统一生效
        </p>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索权限名称、编码或操作类型"
          className="pl-9"
          disabled={disabled}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          共 {groups.length} 个权限模块
        </span>

        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled || !!keyword.trim()}
            onClick={() => setExpanded(groups.map((g) => g.module))}
          >
            全部展开
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled || !!keyword.trim()}
            onClick={() => setExpanded([])}
          >
            全部折叠
          </Button>
        </div>
      </div>

      <div className="rounded-md border px-3">
        {filteredGroups.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            没有找到匹配的权限
          </div>
        ) : (
          <Accordion
            multiple
            value={accordionValue}
            onValueChange={(next) => {
              if (!keyword.trim()) setExpanded(next)
            }}
          >
            {filteredGroups.map((group) => {
              const allItems =
                groups.find((g) => g.module === group.module)?.permissions ?? []

              const state = getModuleState(allItems)

              const moduleSelectedCount = allItems.filter((p) =>
                selectedIds.has(p.id)
              ).length

              return (
                <AccordionItem key={group.module} value={group.module}>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={state.checked}
                      indeterminate={state.indeterminate}
                      disabled={disabled || state.disabled}
                      aria-label={`全选${group.name}`}
                      onCheckedChange={(checked) =>
                        handleModuleChange(group.module, checked)
                      }
                    />

                    <AccordionTrigger className="min-w-0 flex-1 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {group.name}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {moduleSelectedCount}/{allItems.length}
                        </span>
                      </div>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-3 pb-2 pl-7 sm:grid-cols-2">
                      {group.permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-start gap-2.5"
                        >
                          <Checkbox
                            checked={selectedIds.has(permission.id)}
                            disabled={disabled || permission.is_disabled}
                            aria-label={permission.name}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission.id, checked)
                            }
                          />

                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm">{permission.name}</span>

                              <Badge variant="outline" className="text-[10px]">
                                {PERMISSION_ACTION_LABELS[permission.action]}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        )}
      </div>
      {/* <div className="flex items-center justify-between border-t pt-4">
        <span className="text-xs text-muted-foreground">
          {isDirty ? "权限分配已修改，尚未保存" : "暂无未保存的修改"}
        </span>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={!isDirty || saving}
            onClick={handleCancel}
          >
            取消修改
          </Button>

          <Button
            type="button"
            disabled={!isDirty || disabled || saving}
            onClick={handleSave}
          >
            {saving ? "保存中..." : "保存权限"}
          </Button>
        </div>
      </div> */}
    </section>
  )
}
