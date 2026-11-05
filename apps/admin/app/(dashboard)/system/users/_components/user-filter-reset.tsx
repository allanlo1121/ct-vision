"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export function UserFilterReset() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isFiltered = searchParams.has("keyword") || searchParams.has("roleId")

  if (!isFiltered) return null

  function handleReset() {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("keyword")
    params.delete("roleId")
    params.delete("page")

    const query = params.toString()

    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleReset} className="h-8">
      重置
      <X className="h-4 w-4" />
    </Button>
  )
}
