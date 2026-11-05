// packages/system/src/menus/types.ts

export interface MenuNode {
  id: string
  code: string
  name: string
  parentId: string | null
  pathUrl: string | null
  icon: string | null
  children: MenuNode[]
}

export interface MenuOption {
  id: string
  name: string
  parentId: string | null
  sortOrder: number
}