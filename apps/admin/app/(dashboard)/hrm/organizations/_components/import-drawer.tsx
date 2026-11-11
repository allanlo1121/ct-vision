"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { useRouter } from "next/navigation"
import { toast } from "@workspace/ui/components/toast"

import JsonUploader from "@/components/import/json-uploader"
import JsonPreview from "@/components/import/json-preview"

import { ENTITY, type OrganizationImportRow } from "@/lib/hrm/organization"
import { imports } from "@/lib/hrm/organization/action"

export function ImportDrawer() {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<OrganizationImportRow[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) return

    setOpen(nextOpen)

    if (!nextOpen) {
      setRows([])
    }
  }

  async function handleImport() {
    if (rows.length === 0 || isSubmitting) return

    setIsSubmitting(true)

    try {
      // console.log("Importing organizations with rows:", rows)
      // 服务端完成 Zod 校验、权限检查及数据库写入
      const result = await imports(rows)

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.message,
          priority: "high",
        })
        return
      }

      toast.add({
        type: "success",
        description: `成功导入 ${rows.length} 条组织机构`,
      })

      setRows([])
      setOpen(false)

      router.refresh()
    } catch {
      toast.add({
        type: "error",
        description: "导入组织机构失败",
        priority: "high",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger
        render={
          <Button size="sm">
            <Plus className="size-4" />
            导入{ENTITY.label}
          </Button>
        }
      />

      <DrawerContent>
        <div className="mx-auto flex max-h-[85vh] w-full max-w-4xl flex-col">
          <DrawerHeader>
            <DrawerTitle>导入{ENTITY.label}</DrawerTitle>
            <DrawerDescription>
              上传 JSON 文件，预览并校验组织机构数据。
            </DrawerDescription>
          </DrawerHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-6">
            <JsonUploader onData={setRows} />

            {rows.length > 0 && <JsonPreview rows={rows} />}
          </div>

          <div className="flex shrink-0 justify-end gap-3 border-t px-4 py-4">
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}
            >
              取消
            </Button>

            <Button
              onClick={handleImport}
              disabled={isSubmitting || rows.length === 0}
            >
              {isSubmitting ? "导入中..." : `导入 ${rows.length} 条数据`}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
