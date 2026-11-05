import { format, isValid } from "date-fns"
import { TZDate } from "@date-fns/tz"

import {
  DEFAULT_TIME_ZONE,
  DATE_FORMATS,
} from "./constants"

type DateInput = string | number | Date | null | undefined

export function formatDateTime(
  value: DateInput,
  pattern: string = DATE_FORMATS.datetime,
  timeZone: string = DEFAULT_TIME_ZONE
): string {
  if (value === null || value === undefined || value === "") {
    return "-"
  }

  const date = new Date(value)

  if (!isValid(date)) {
    return "-"
  }

  return format(
    TZDate.tz(timeZone, date),
    pattern
  )
}