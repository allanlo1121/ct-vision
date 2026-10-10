export interface RolePermissionRepository {
  findPermissionIds(roleId: string): Promise<string[]>;

  add(
    roleId: string,
    permissionId: string
  ): Promise<void>;

  remove(
    roleId: string,
    permissionId: string
  ): Promise<void>;

  replace(
    roleId: string,
    permissionIds: string[]
  ): Promise<void>;
}