// packages/system/src/menus/tree.ts

import type { Menu } from "./schemas"
import type { MenuNode } from "./types"

export function buildMenuTree(menus: Menu[]): MenuNode[] {
  const nodeMap = new Map<string, MenuNode>()
  const roots: MenuNode[] = []

  // 过滤禁用、隐藏的菜单，并按照排序值排序
  const validMenus = menus
    .filter((menu) => !menu.is_disabled && menu.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order)

  // 构建节点
  for (const menu of validMenus) {
    nodeMap.set(menu.id, {
      id: menu.id,
      code: menu.code,
      name: menu.name,
      parentId: menu.parent_id,
      pathUrl: menu.path_url,
      icon: menu.icon,
      children: [],
    })
  }

  // 建立父子关系
  for (const node of nodeMap.values()) {
    if (node.parentId === null) {
      roots.push(node)
      continue
    }

    const parent = nodeMap.get(node.parentId)

    if (parent) {
      parent.children.push(node)
    }
  }

  return roots
}
