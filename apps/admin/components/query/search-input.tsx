"use client"

import { useEffect, useState } from "react"
import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Search as SearchIcon } from "lucide-react"

import { Input } from "@workspace/ui/components/input"

interface SearchProps {
  placeholder?: string
  paramKey?: string
  resetPageKey?: string
  debounce?: number
}

export function Search({
  placeholder = "搜索...",
  paramKey = "keyword",
  resetPageKey = "page",
  debounce = 400,
}: SearchProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentValue = searchParams.get(paramKey) ?? ""

  const [value, setValue] = useState(currentValue)

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const keyword = term.trim()

      const params = new URLSearchParams(
        searchParams.toString()
      )

      // 查询条件没有变化，不更新 URL
      if (keyword === (params.get(paramKey) ?? "")) {
        return
      }

      if (keyword) {
        params.set(paramKey, keyword)
      } else {
        params.delete(paramKey)
      }

      // 查询条件变化，重置分页
      params.delete(resetPageKey)

      const query = params.toString()

      router.replace(
        query ? `${pathname}?${query}` : pathname,
        { scroll: false }
      )
    },
    debounce
  )

  // URL 变化时同步输入框
  useEffect(() => {
    handleSearch.cancel()
    setValue(currentValue)
  }, [currentValue, handleSearch])

  // 组件卸载时取消未执行的搜索
  useEffect(() => {
    return () => handleSearch.cancel()
  }, [handleSearch])

  return (
    <div className="relative flex flex-1">
      <SearchIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      />

      <Input
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value

          setValue(nextValue)
          handleSearch(nextValue)
        }}
        placeholder={placeholder}
        className="h-8 pl-9"
      />
    </div>
  )
}