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