"use client"


import { UserRoleFilter } from "./user-role-filter"
import { Search } from "@/components/query/search-input"
import { IdNameOption } from "@workspace/shared"
import { UserFilterReset } from "./user-filter-reset"

import { Can } from "@workspace/auth/components"
import { CreateDrawer } from "./create-drawer"

interface QueryToolbarProps {
  roles: IdNameOption[]
}

export function QueryToolbar({ roles }: QueryToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Search placeholder="搜索用户名或邮箱..." paramKey="keyword" />

        <UserRoleFilter roles={roles} />

        {/* 后续在这里添加角色筛选 Select */}

        <UserFilterReset />
      </div>

      <div className="flex items-center gap-2">
        {/* <DataTableViewOptions table={table} /> */}
        <Can permission={{module: "iam", action: "write"}}>
          <CreateDrawer />
        </Can>
      </div>
    </div>
  )
}
