"use client"

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

interface RoleOption {
  id: string
  name: string
}

interface UserRoleFilterProps {
  roles: RoleOption[]
}

export function UserRoleFilter({
  roles,
}: UserRoleFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const roleId = searchParams.get("roleId") ?? "all"

  function handleChange(value: string | null) {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    if (value && value !== "all") {
      params.set("roleId", value)
    } else {
      params.delete("roleId")
    }

    // 筛选变化后返回第一页
    params.delete("page")

    const query = params.toString()

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      { scroll: false }
    )
  }

  const selectedRole = roles.find((role) => role.id === roleId)

return (
  <Select value={roleId} onValueChange={handleChange}>
    <SelectTrigger className="h-8 w-[160px]">
      <SelectValue>
        {selectedRole?.name ?? "全部角色"}
      </SelectValue>
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="all">全部角色</SelectItem>

      {roles.map((role) => (
        <SelectItem key={role.id} value={role.id}>
          {role.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
}