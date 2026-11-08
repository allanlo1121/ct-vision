"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useQueryNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function navigate(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())

    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    // 筛选条件变化时重置分页
    params.delete("page")

    const query = params.toString()

    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return {
    navigate,
    searchParams,
  }
}
