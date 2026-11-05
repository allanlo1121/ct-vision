"use client"

import { useState } from "react"

interface Props {
  onData: (rows: any[]) => void
}

export default function JsonUploader({ onData }: Props) {
  const [fileName, setFileName] = useState<string>()

  const handleFile = async (file: File) => {
    const text = await file.text()

    const json = JSON.parse(text)

    console.log("JSON data:", json)

    if (!Array.isArray(json)) {
      alert("JSON必须是数组")
      return
    }

    onData(json)
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    await handleFile(file)
  }

  return (
    <div className="space-y-2">
      <input type="file" accept=".json" onChange={onChange} />

      {fileName && (
        <div className="text-sm text-muted-foreground">已选择：{fileName}</div>
      )}
    </div>
  )
}
