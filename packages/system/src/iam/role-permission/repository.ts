import { type RoleWithPermissions } from "./schemas"

export interface RolePermissionRepository {
  findPermissionIds(roleId: string): Promise<string[]>

  sync(roleId: string, permissionIds: string[]): Promise<void>

  findWithPermissions(roleId: string): Promise<RoleWithPermissions>

  findAllWithPermissions(): Promise<RoleWithPermissions[]>

    sync(roleId: string, permissionIds: string[]): Promise<void>
}
