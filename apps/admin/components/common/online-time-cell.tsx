import { Badge } from "@workspace/ui/components/badge"
import { format } from "date-fns"

interface Props {
  value: string | null
  now: number
}

export function OnlineTimeCell({ value, now }: Props) {
  if (!value) {
    return <Badge variant="secondary">暂无数据</Badge>
  }

  const timestamp = new Date(value).getTime()

  if (!Number.isFinite(timestamp)) {
    return <Badge variant="secondary">时间无效</Badge>
  }

  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000))

  const color =
    seconds <= 60
      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
      : seconds <= 90
        ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
        : "bg-red-500/10 text-red-600 border-red-500/30"

  const elapsed =
    seconds < 60
      ? `${seconds}秒前`
      : seconds < 3600
        ? `${Math.floor(seconds / 60)}分钟前`
        : `${Math.floor(seconds / 3600)}小时前`

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-sm tabular-nums">
        {format(timestamp, "yyyy-MM-dd HH:mm:ss")}
      </span>

      <Badge variant="outline" className={color}>
        {elapsed}
      </Badge>
    </div>
  )
}
