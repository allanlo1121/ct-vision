"use client"

import { Tree } from "./tree"
import type { TreeNode, TreeDataNode } from "./types"
import { useRouter, useSearchParams } from "next/navigation"
import { useTreeRuntime } from "./use-tree-runtime"

interface TreeContainerProps {
  data: TreeDataNode[]
  queryKey: string
  loading?: boolean
}

export function TreeContainer({
  data,
  queryKey,
  loading = false,
}: TreeContainerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedId = searchParams.get(queryKey) ?? undefined

  const { expandedIds, toggleExpand } = useTreeRuntime({
    data,
    selectedId,
  })

  function handleSelect(node: TreeNode) {
    if (node.id === selectedId) return

    const params = new URLSearchParams(searchParams.toString())
    params.set(queryKey, node.id)

    router.replace(`?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <Tree
      data={data}
      selectedId={selectedId}
      expandedIds={expandedIds}
      loading={loading}
      onSelect={handleSelect}
      onToggleExpand={toggleExpand}
    />
  )
}
