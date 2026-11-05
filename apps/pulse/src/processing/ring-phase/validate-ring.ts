import type { RingValidationResult } from "./types"


export function validateRingRange(
  ringNo: number | null,
  startRing: number | null,
  endRing: number | null
): RingValidationResult {
  if (ringNo == null) {
    return { valid: false, warning: "ring_missing", ringNo: null }
  }

  if (
    (startRing != null && ringNo < startRing) ||
    (endRing != null && ringNo > endRing)
  ) {
    return {
      valid: false,
      warning: "ring_out_of_range",
      ringNo: ringNo,
    }
  }

  return { valid: true, ringNo }
}
