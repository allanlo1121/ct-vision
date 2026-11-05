import type {
  Segment,
  CreateSegmentInput,
  UpdateSegmentInput,
  ImportSegmentInput,
} from "./segment.schema"

export interface SegmentRepository {
  findById(id: string): Promise<Segment | null>

  findAll(): Promise<Segment[]>

  findByTunnelId(tunnelId: string | null): Promise<Segment[]>

  create(input: CreateSegmentInput): Promise<void>

  update(id: string, input: UpdateSegmentInput): Promise<void>

  delete(id: string): Promise<void>
}
