import type {
  RingValidationResult,
  RingAlarmType,
  RingRangeValidationResult,
} from "./types"

export function validateRingRange(
  ringNo: number | null,
  startRing: number | null,
  endRing: number | null
): RingRangeValidationResult {
  if (ringNo == null) {
    return { valid: false, anomaly: "RING_NULL", alarmValue: null }
  }

  if (
    (startRing != null && ringNo < startRing) ||
    (endRing != null && ringNo > endRing)
  ) {
    return {
      valid: false,
      anomaly: "RING_OUT_OF_RANGE",
      alarmValue: ringNo,
    }
  }

  return { valid: true, ringNo }
}

export function validateRingChange(
  currentRing: number,
  prevRing: number | null
): RingValidationResult {
  if (prevRing == null) {
    return { valid: false, anomaly: "RING_NULL", alarmValue: null, delta: null }
  }

  const delta = currentRing - prevRing

  if (delta < 0) {
    return {
      valid: false,
      anomaly: "RING_DECREASED",
      alarmValue: delta,
      delta,
    }
  }

  if (delta > 3) {
    return {
      valid: false,
      anomaly: "RING_JUMPED",
      alarmValue: delta,
      delta,
    }
  }

  return { valid: true, delta }
}
