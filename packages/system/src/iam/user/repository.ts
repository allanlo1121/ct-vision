import type { UserListItem, UserQuery } from "./schema";
import type { PaginatedResult } from "@workspace/shared";



export interface UserRepository {
  findPage(
    query: UserQuery
  ): Promise<PaginatedResult<UserListItem>>
}