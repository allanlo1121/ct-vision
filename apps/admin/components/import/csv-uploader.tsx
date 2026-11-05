"use client"

import { parse } from "csv-parse/sync"
import { Input } from "@workspace/ui/components/input"

interface CsvUploaderProps<T> {
  onData: (rows: T[]) => void
}

export function CsvUploader<T>({ onData }: CsvUploaderProps<T>) {
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()

      const rows = parse(text.replace(/^\uFEFF/, ""), {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }) as T[]

      onData(rows)
    } catch (error) {
      console.error("CSV 解析失败:", error)
      onData([])
    } finally {
      event.target.value = ""
    }
  }

  return (
    <Input type="file" accept=".csv,text/csv" onChange={handleFileChange} />
  )
}
