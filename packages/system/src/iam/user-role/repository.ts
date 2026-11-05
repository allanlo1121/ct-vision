import type { UserRoleQuery } from "./schema"
import type { UserRoleListItem } from "./schema"
import type { PaginatedResult } from "@workspace/shared"

export interface UserRoleRepository {

  findRoleIds(userId: string): Promise<string[]>

  assign(userId: string, roleId: string): Promise<void>

  revoke(userId: string, roleId: string): Promise<void>

  replace(userId: string, roleIds: string[]): Promise<void>

  sync(userId: string, roleIds: string[]): Promise<void>
}


