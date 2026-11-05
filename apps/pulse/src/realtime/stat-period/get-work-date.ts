import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { getStatSettings } from "./stat-settings-cache";

export function getTbmWorkDate(
  recordedAt: string,
): string {
  const settings = getStatSettings()

  const zonedDate = toZonedTime(
    recordedAt,
    settings.timezone,
  )

  const [cutoffHour, cutoffMinute] =
    settings.dayCutoffTime
      .split(":")
      .map(Number)

  const currentMinutes =
    zonedDate.getHours() * 60 +
    zonedDate.getMinutes()

  const cutoffMinutes =
    cutoffHour * 60 +
    cutoffMinute

  if (currentMinutes >= cutoffMinutes) {
    zonedDate.setDate(
      zonedDate.getDate() + 1,
    )
  }

  return format(
    zonedDate,
    "yyyy-MM-dd",
  )
}