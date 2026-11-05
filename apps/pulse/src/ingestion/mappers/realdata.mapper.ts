// ingestion/mappers/realdata.mapper.ts

import type { TbmRealData } from "../../types"

export function mapRealdata(raw: unknown): TbmRealData {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error("Invalid Realdata payload")
  }

  const { sampledAtMs, ...rawValues } = raw as Record<string, unknown>

  if (
    typeof sampledAtMs !== "number" ||
    !Number.isFinite(sampledAtMs) ||
    !Number.isInteger(sampledAtMs) ||
    !Number.isFinite(new Date(sampledAtMs).getTime())
  ) {
    throw new Error("Invalid sampledAtMs")
  }

  const values: TbmRealData["values"] = {}

  for (const [key, value] of Object.entries(rawValues)) {
    if (value === "" || value === undefined) {
      values[key] = null
    } else if (
      typeof value === "number" ||
      typeof value === "string" ||
      typeof value === "boolean" ||
      value === null
    ) {
      values[key] = value
    }
  }

  return {
    sampledAtMs,
    values,
  }
}
