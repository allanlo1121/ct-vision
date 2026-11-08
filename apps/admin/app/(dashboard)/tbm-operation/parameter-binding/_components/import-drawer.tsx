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

import { ENTITY } from "@/lib/tbm/tbm-parameter"

import type { ImportTbmParameterInput } from "@workspace/tbm/parameter"
import { mapTbmParameterImportRows } from "@/lib/tbm/tbm-parameter/mapper"
import { importTbmParameters } from "@/lib/tbm/tbm-parameter/action"
import { CsvUploader } from "@/components/import/csv-uploader"
import DataPreview from "@/components/import/data-preview"
import { TbmParameterImportRow } from "@/lib/tbm/tbm-parameter/types"

export function ImportDrawer({ tbmCode }: { tbmCode: string }) {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState<TbmParameterImportRow[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) return

    setOpen(nextOpen)

    if (!nextOpen) {
      setRows([])
    }
  }

  async function handleImport() {
    console.log("Starting import to tbmCode:", tbmCode, "with rows:", rows)
    if (rows.length === 0 || isSubmitting) return

    setIsSubmitting(true)

    try {
    
      const payload: ImportTbmParameterInput[] = mapTbmParameterImportRows(rows)
      console.log("Mapped payload:", payload)
      // 服务端完成 Zod 校验、权限检查及数据库写入
      const result = await importTbmParameters(tbmCode, payload)

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
        description: `成功导入 ${rows.length} 条 TBM 参数`,
      })

      setRows([])
      setOpen(false)

      router.refresh()
    } catch {
      toast.add({
        type: "error",
        description: "导入 TBM 参数失败",
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
              上传 CSV 文件，预览并校验 TBM 参数信息。
            </DrawerDescription>
          </DrawerHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-6">
            <CsvUploader onData={setRows} />

            {rows.length > 0 && (
              <DataPreview<TbmParameterImportRow> rows={rows} />
            )}
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
