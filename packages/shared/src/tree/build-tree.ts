import type { BuildTreeOptions, TreeBaseNode, TreeWithChildren } from "./types"

// 标准节点：不需要传 options
export function buildTree<T extends TreeBaseNode>(
  items: T[]
): TreeWithChildren<T>[]

// 自定义节点：需要传 options
export function buildTree<T>(
  items: T[],
  options: BuildTreeOptions<T>
): TreeWithChildren<T>[]

// 具体实现
export function buildTree<T>(
  items: T[],
  options: BuildTreeOptions<T> = {}
): TreeWithChildren<T>[] {
  const {
    getId = (item) => (item as TreeBaseNode).id,
    getParentId = (item) => (item as TreeBaseNode).parentId,
    getSortOrder = (item) => (item as TreeBaseNode).sortOrder,
  } = options

  const map = new Map<string, TreeWithChildren<T>>()
  const roots: TreeWithChildren<T>[] = []

  // 创建节点
  for (const item of items) {
    map.set(getId(item), {
      ...item,
      children: [],
    })
  }

  // 构建父子关系
  for (const item of items) {
    const node = map.get(getId(item))!
    const parentId = getParentId(item)

    if (parentId !== null && map.has(parentId)) {
      map.get(parentId)!.children.push(node)
    } else {
      roots.push(node)
    }
  }

  // 递归排序
  const sortNodes = (nodes: TreeWithChildren<T>[]) => {
    nodes.sort((a, b) => getSortOrder(a) - getSortOrder(b))

    for (const node of nodes) {
      sortNodes(node.children)
    }
  }

  sortNodes(roots)

  return roots
}
