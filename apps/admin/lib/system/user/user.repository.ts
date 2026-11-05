import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { AppError, appErrors } from "@workspace/errors"
import { z } from "zod"

import type {
  UserRepository,
  UserQuery,
  UserListItem,
} from "@workspace/system/user"
import { userListItemSchema } from "@workspace/system/user"

export const userRepository: UserRepository = {
  async findPage(query) {
    const supabase = await createClient()


    const { data, error } = await supabase.schema("api").rpc("list_users", {
      p_page: query.page,
      p_page_size: query.pageSize,
      p_keyword: query.keyword,
      p_role_id: query.roleId,
    })

    assertNoError(error)

    const result = z
      .object({
        items: z.array(userListItemSchema),
        total: z.number().int().nonnegative(),
      })
      .parse(data)

    return {
      data: result.items,
      page: query.page,
      pageSize: query.pageSize,
      total: result.total,
      totalPages: Math.ceil(result.total / query.pageSize),
    }
  },
  
}
