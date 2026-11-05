"use client"

import { toast } from "@workspace/ui/components/toast"
import { Button } from "@workspace/ui/components/button"

export default function TestToast() {
  return (
    <Button
      onClick={() => {
        toast.add({
          type: "error",
          title: "测试错误",
          description: "测试 Toast 是否正常",
        })
      }}
    >
      测试 Toast
    </Button>
  )
}
