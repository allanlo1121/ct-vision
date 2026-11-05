import type { TreeWithChildren } from "./types"

export function flattenTree<T>(
  nodes: TreeWithChildren<T>[]
): T[] {
  const result: T[] = []

  function walk(items: TreeWithChildren<T>[]) {
    for (const { children, ...node } of items) {
      result.push(node as T)

      if (children?.length) {
        walk(children)
      }
    }
  }

  walk(nodes)

  return result
}