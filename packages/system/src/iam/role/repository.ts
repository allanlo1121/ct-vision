import type { Role, CreateRoleInput, UpdateRoleInput } from "./schemas"

import type { IdNameOption } from "@workspace/shared"

export interface RoleRepository {
  findById(id: string): Promise<Role | null>

  findByCode?(code: string): Promise<Role | null>

  findOptions(): Promise<IdNameOption[]>

  findAll(): Promise<Role[]>

  // paginate(query: RoleQuery): Promise<PaginatedResult<Role>>

  create(input: CreateRoleInput): Promise<Role>

  update(id: string, input: UpdateRoleInput): Promise<void>

  delete(id: string): Promise<void>
}
