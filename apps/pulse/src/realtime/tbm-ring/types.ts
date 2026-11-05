
export type RingRangeValidationResult =
  | {
      valid: true
      ringNo: number
    }
  | {
      valid: false
      anomaly: RingAlarmType
      alarmValue: number | null
    }


export type RingValidationResult =
  | {
      valid: true
      delta: number | null
    }
  | {
      valid: false
      anomaly: RingAlarmType
      delta: number | null
      alarmValue: number | null
    }
export type RingAlarmType =
  | "RING_NULL"
  | "RING_OUT_OF_RANGE"
  | "RING_TIME_ERROR"
  | "RING_DECREASED"
  | "RING_JUMPED"
  | "RING_SKIPPED"
