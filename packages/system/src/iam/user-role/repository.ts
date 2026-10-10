export interface UserRoleRepository {
  findRoleIds(userId: string): Promise<string[]>;

  assign(
    userId: string,
    roleId: string
  ): Promise<void>;

  revoke(
    userId: string,
    roleId: string
  ): Promise<void>;
}