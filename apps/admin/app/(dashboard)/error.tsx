"use client"

import { useEffect } from "react"
import { Button } from "@workspace/ui/components/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("页面发生异常:", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">
        页面加载失败
      </h2>

      <p className="text-sm text-muted-foreground">
        数据加载出现异常，请重试。
      </p>

      <Button onClick={() => reset()}>
        重新加载
      </Button>
    </div>
  )
}