// 普通树（children 可选）
export type TreeNode<T> = T & {
  children?: TreeNode<T>[]
}

// 完整树（children 必填）
export type TreeWithChildren<T> = T & {
  children: TreeWithChildren<T>[]
}

// 扁平数据
export type FlatTreeNode<T, TId = string> = T & {
  parent_id: TId | null
}

export interface TreeBaseNode {
  id: string
  parentId: string | null
  sortOrder: number
}

export interface BuildTreeOptions<T> {
  getId?: (item: T) => string
  getParentId?: (item: T) => string | null
  getSortOrder?: (item: T) => number
}