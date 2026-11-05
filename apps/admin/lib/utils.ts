export function toNullableNumber(
  value: unknown
): number | null {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === "string") {
    const normalized = value.trim()

    if (
      normalized === "" ||
      normalized.toLowerCase() === "null" ||
      normalized.toLowerCase() === "undefined"
    ) {
      return null
    }

    value = normalized
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return null
  }

  const num = Number(value)

  return Number.isFinite(num) ? num : null
}

export function toNullableString(
  value: unknown
): string | null {
  if (value == null) return null

  const str = String(value).trim()

  if (
    str === "" ||
    str.toLowerCase() === "null" ||
    str.toLowerCase() === "undefined"
  ) {
    return null
  }

  return str
}

export function toNullableDate(
  value: string | null | undefined
): string | null {
  if (!value || value.trim().toLowerCase() === "null") {
    return null
  }

  return value.trim().split(/[ T]/)[0] || null
}