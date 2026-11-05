import { format, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { DateString } from "./date.types";

export function toDateString(date: Date): DateString {
  return format(date, "yyyy-MM-dd") as DateString;
}

export function parseDateString(value: string): DateString {
  return value as DateString;
}

const TIME_ZONE = "Asia/Shanghai";

export function getTbmWorkDate(timestamp: string | Date | null): DateString {
  const date = timestamp ? timestamp : new Date();
  // 转成上海时间
  const shanghaiTime = toZonedTime(date, TIME_ZONE);

  const hour = shanghaiTime.getHours();

  const workDate = hour >= 19 ? addDays(shanghaiTime, 1) : shanghaiTime;

  return toDateString(workDate);
}


export function toIsoDateTime(
  value: unknown
): string | null {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return null
    }

    const date = new Date(value)

    return Number.isNaN(date.getTime())
      ? null
      : date.toISOString()
  }

  if (typeof value === "string") {
    const date = new Date(value)

    if (
      Number.isNaN(date.getTime()) ||
      date.toISOString() !== value
    ) {
      return null
    }

    return value
  }

  return null
}

export function toTimestampOrNull(
  value: unknown
): number | null {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }


  const timestamp =
    new Date(String(value)).getTime();


  return Number.isNaN(timestamp)
    ? null
    : timestamp;
}


export function toISOStringOrNull(value: unknown): string | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}