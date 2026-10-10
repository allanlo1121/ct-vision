import type { Menu, CreateMenuInput, UpdateMenuInput } from "./schemas"

import type { MenuQuery } from "./schemas"

import type { PaginatedResult } from "@workspace/shared"
import { MenuOption } from "./types";

export interface MenuRepository {
  findById(id: string): Promise<Menu | null>

  findByScope(scope: string): Promise<Menu[]>

  findOptions(scope: string): Promise<MenuOption[]>

  findAll(): Promise<Menu[]>

  paginate(query: MenuQuery): Promise<PaginatedResult<Menu>>

  create(input: CreateMenuInput): Promise<Menu>

  update(id: string, input: UpdateMenuInput): Promise<Menu>

  delete(id: string): Promise<void>
}
