import type { Menu, CreateMenuInput, UpdateMenuInput } from "./schemas"


export interface MenuRepository {
  findById(id: string): Promise<Menu | null>

  findByAppCode(appCode: string): Promise<Menu[]>

  // findOptions(appCode: string): Promise<MenuOption[]>

  findAll(): Promise<Menu[]>

  create(input: CreateMenuInput): Promise<Menu>

  update(id: string, input: UpdateMenuInput): Promise<Menu>

  delete(id: string): Promise<void>
}
