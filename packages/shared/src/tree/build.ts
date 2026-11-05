// import type { TreeNode } from "./types"

// export interface BuildTreeOptions<T, TId = string> {
//   getId: (item: T) => TId
//   getParentId: (item: T) => TId | null | undefined
// }

// /**
//  * 扁平数组转树形结构
//  *
//  * - 时间复杂度 O(n)
//  * - 保留原始数组顺序
//  * - 不修改原始数据
//  * - 找不到父节点时作为根节点
//  */
// export function buildTree<T extends object, TId = string>(
//   items: readonly T[],
//   options: BuildTreeOptions<T, TId>
// ): TreeNode<T>[] {
//   const { getId, getParentId } = options

//   const nodeMap = new Map<TId, TreeNode<T>>()
//   const roots: TreeNode<T>[] = []

//   // 创建节点
//   for (const item of items) {
//     const node = {
//       ...item,
//       children: [],
//     } as TreeNode<T>

//     nodeMap.set(getId(item), node)
//   }

//   // 建立父子关系
//   for (const item of items) {
//     const id = getId(item)
//     const parentId = getParentId(item)
//     const node = nodeMap.get(id)!

//     if (parentId == null || parentId === id) {
//       roots.push(node)
//       continue
//     }

//     const parent = nodeMap.get(parentId)

//     if (parent) {
//       parent.children!.push(node)
//     } else {
//       roots.push(node)
//     }
//   }

//   return roots
// }



// export interface FlattenTreeOptions<T> {
//   getChildren?: (node: T) => readonly T[] | undefined
// }

// /**
//  * 树形结构转扁平数组
//  *
//  * - 深度优先遍历
//  * - 父节点排在子节点前
//  * - 不修改原始数据
//  * - 返回的节点保留原有 children 属性
//  */
// export function flattenTree<T>(
//   tree: readonly T[],
//   options: FlattenTreeOptions<T> = {},
// ): T[] {
//   const getChildren =
//     options.getChildren ??
//     ((node: T) =>
//       (node as T & { children?: T[] }).children)

//   const result: T[] = []
//   const stack = [...tree].reverse()

//   while (stack.length > 0) {
//     const node = stack.pop()!

//     result.push(node)

//     const children = getChildren(node)

//     if (children?.length) {
//       for (let i = children.length - 1; i >= 0; i--) {
//         stack.push(children[i]!)
//       }
//     }
//   }

//   return result
// }