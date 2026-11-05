import { TbmPhaseType } from "@workspace/shared"

export function resolvePhaseType(
  excavationMode: boolean | null,
  segmentErectionMode: boolean | null
): TbmPhaseType {
  if (excavationMode === true && segmentErectionMode === true) {
    return "unknown"
  }

  if (excavationMode === true) return "excavation"

  if (segmentErectionMode === true) return "segment_erection"

  if (excavationMode === false && segmentErectionMode === false) {
    return "waiting"
  }

  return "unknown"
}
