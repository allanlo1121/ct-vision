import type {
  RingRecord,
  CreateRingRecordInput,
  UpdateRingRecordInput,
} from "./ring-record.schemas"

export interface RingRecordRepository {
  findById(id: number): Promise<RingRecord | null>

  findByTbmCode(tbmCode: string): Promise<RingRecord[]>

  findByRingNo(tunnelId: string, ringNo: number): Promise<RingRecord | null>

  findAll(): Promise<RingRecord[]>

  create(input: CreateRingRecordInput): Promise<void>

  update(id: number, input: UpdateRingRecordInput): Promise<void>

  delete(id: number): Promise<void>

  upsert(input: CreateRingRecordInput): Promise<void>
}

