import type { Role, CreateRoleInput, UpdateRoleInput } from "./schemas"

import type { RoleQuery } from "./schemas"

import type { PaginatedResult } from "@workspace/shared"

export interface RoleRepository {
  findById(id: string): Promise<Role | null>

  findByCode?(code: string): Promise<Role | null>

  findAll(): Promise<Role[]>

  // paginate(query: RoleQuery): Promise<PaginatedResult<Role>>

  create(input: CreateRoleInput): Promise<Role>

  update(id: string, input: UpdateRoleInput): Promise<Role>

  delete(id: string): Promise<void>
}
