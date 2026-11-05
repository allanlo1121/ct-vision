import type {
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
} from "./schemas"

export interface PermissionRepository {
  findById(id: string): Promise<Permission | null>

  findByCode?(code: string): Promise<Permission | null>

  findAll(): Promise<Permission[]>

  // paginate(query: PermissionQuery): Promise<PaginatedResult<Permission>>

  create(input: CreatePermissionInput): Promise<Permission>

  update(id: string, input: UpdatePermissionInput): Promise<Permission>

  delete(id: string): Promise<void>
}
