import type {
  ApplyRingPhaseResult,
  RingPhaseRecord,
  ApplyRingPhaseInput,
} from "./phase.schemas"

export interface RingPhaseRecordRepository {
  findByTbmCode(tbmCode: string): Promise<RingPhaseRecord | null>

  findAll(): Promise<RingPhaseRecord[]>

  apply(input: ApplyRingPhaseInput): Promise<ApplyRingPhaseResult>
}
