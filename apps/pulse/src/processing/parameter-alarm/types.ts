import { TbmRingWarningType } from "@workspace/shared/schemas"

export type RingValidationResult =
  | {
      valid: true
      ringNo: number
    }
  | {
      valid: false
      warning: TbmRingWarningType
      ringNo: number | null
    }
