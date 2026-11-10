/**
 * 获取指定时区的当前日期，格式 YYYY-MM-DD
 * 与 z.iso.date() 和 HTML input[type="date"] 兼容
 */
export function getToday(timeZone = "Asia/Shanghai"): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value

  return `${get("year")}-${get("month")}-${get("day")}`
}


export function getTodayRange() {
  const now = new Date()

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)

  const start = new Date(`${today}T00:00:00+08:00`)
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)

  return {
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  }
}