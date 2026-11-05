"use client"

interface DataPreviewProps<T> {
  rows: T[]
  maxRows?: number
}

export default function DataPreview<T>({
  rows,
  maxRows = 10,
}: DataPreviewProps<T>) {
  return (
    <div className="max-h-[400px] overflow-auto rounded border p-4 text-xs">
      <pre>{JSON.stringify(rows.slice(0, maxRows), null, 2)}</pre>

      <div className="mt-2 text-muted-foreground">
        共 {rows.length} 条数据
        {rows.length > maxRows && `，仅预览前 ${maxRows} 条`}
      </div>
    </div>
  )
}
