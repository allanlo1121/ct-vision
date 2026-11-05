"use client"

import { useCallback, useEffect, useState } from "react"

import type { TreeDataNode } from "./types"

interface UseTreeRuntimeOptions {
  data: TreeDataNode[]
  selectedId?: string
}

// 查找选中节点的所有祖先节点
function findAncestorIds(
  nodes: TreeDataNode[],
  targetId: string,
  ancestors: string[] = []
): string[] | null {
  for (const node of nodes) {
    if (node.id === targetId) {
      return ancestors
    }

    if (node.children?.length) {
      const result = findAncestorIds(node.children, targetId, [
        ...ancestors,
        node.id,
      ])

      if (result) return result
    }
  }

  return null
}

export function useTreeRuntime({ data, selectedId }: UseTreeRuntimeOptions) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())

  // 自动展开选中节点的祖先
  useEffect(() => {
    if (!selectedId || data.length === 0) return

    const ancestorIds = findAncestorIds(data, selectedId)

    if (!ancestorIds?.length) return

    setExpandedIds((prev) => {
      const next = new Set(prev)
      let changed = false

      for (const id of ancestorIds) {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      }

      return changed ? next : prev
    })
  }, [data, selectedId])

  // 展开 / 收起
  const toggleExpand = useCallback((node: TreeDataNode) => {
    if (!node.hasChildren) return

    setExpandedIds((prev) => {
      const next = new Set(prev)

      if (next.has(node.id)) {
        next.delete(node.id)
      } else {
        next.add(node.id)
      }

      return next
    })
  }, [])

  // 展开全部
  const expandAll = useCallback(() => {
    const ids = new Set<string>()

    function traverse(nodes: TreeDataNode[]) {
      for (const node of nodes) {
        if (node.hasChildren) {
          ids.add(node.id)
        }

        if (node.children?.length) {
          traverse(node.children)
        }
      }
    }

    traverse(data)
    setExpandedIds(ids)
  }, [data])

  // 收起全部
  const collapseAll = useCallback(() => {
    setExpandedIds(new Set())
  }, [])

  return {
    expandedIds,
    toggleExpand,
    expandAll,
    collapseAll,
  }
}
