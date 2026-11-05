import { TbmParameterValue } from "../types"

export function toNumberOrNull(value: unknown): number | null {
  if (value === undefined || value === null || value === "") {
    return null
  }

  const num = Number(value)

  return Number.isFinite(num) ? num : null
}

// 数值转换：支持 number 和数字字符串
export function toNumber(value: TbmParameterValue | undefined): number | null {
  if (value == null || value === "") return null
  if (typeof value === "boolean") return null

  const num = Number(value)
  return Number.isFinite(num) ? num : null
}

export function toBoolean(value: TbmParameterValue | undefined): boolean | null {
  if (value == null || value === "") return null
  if (typeof value === "boolean") return value

  if (value === 0 || value === "0") return false
  if (value === 1 || value === "1") return true
  return null
}

// 布尔转换：支持 boolean、0/1、"0"/"1"
export function toBooleanNumber(
  value: TbmParameterValue | undefined
): number | null {
  if (typeof value === "boolean") {
    return value ? 1 : 0
  }

  if (value === 0 || value === "0") return 0
  if (value === 1 || value === "1") return 1

  return null
}

export function toNumberFallback(
  ...values: (TbmParameterValue | undefined)[]
): number | null {
  for (const value of values) {
    const num = toNumber(value)
    if (num !== null) return num
  }

  return null
}
