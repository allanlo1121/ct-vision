import type {
  Risk,
  CreateRiskInput,
  UpdateRiskInput,
  ImportRiskInput,
} from "./risk.schema"

export interface RiskRepository {
  findById(id: string): Promise<Risk | null>

  findAll(): Promise<Risk[]>

  findByTunnelId(tunnelId: string | null): Promise<Risk[]>

  create(input: CreateRiskInput): Promise<void>

  update(id: string, input: UpdateRiskInput): Promise<void>

  delete(id: string): Promise<void>
}
